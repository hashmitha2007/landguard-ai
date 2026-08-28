import os
import math
import shutil
from datetime import datetime

import requests
from dotenv import load_dotenv
from pymongo import MongoClient

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from ml.ml_predict import predict_risk


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")


# =========================================================
# MONGODB CONNECTION
# =========================================================

client = None
db = None
predictions_collection = None
field_reports_collection = None

try:
    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=5000
    )

    client.admin.command("ping")

    db = client["landguard"]

    predictions_collection = db["predictions"]
    field_reports_collection = db["field_reports"]

    print("MongoDB Atlas connected successfully!")

except Exception as error:
    print("MongoDB connection failed:", error)


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="LandGuard AI API",
    description="Landslide monitoring and risk prediction system for Northeast India",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# UPLOAD FOLDER
# =========================================================

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


# =========================================================
# SERVE UPLOADED PHOTOS
# =========================================================

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_FOLDER),
    name="uploads"
)


# =========================================================
# NORTHEAST INDIA LOCATIONS
# =========================================================

locations = {

    "Assam": {
        "Guwahati": {
            "latitude": 26.1445,
            "longitude": 91.7362
        },
        "Dibrugarh": {
            "latitude": 27.4728,
            "longitude": 94.9120
        }
    },

    "Arunachal Pradesh": {
        "Itanagar": {
            "latitude": 27.0844,
            "longitude": 93.6053
        },
        "Tawang": {
            "latitude": 27.5860,
            "longitude": 91.8590
        }
    },

    "Manipur": {
        "Imphal": {
            "latitude": 24.8170,
            "longitude": 93.9368
        }
    },

    "Meghalaya": {
        "Shillong": {
            "latitude": 25.5788,
            "longitude": 91.8933
        },
        "Cherrapunji": {
            "latitude": 25.2844,
            "longitude": 91.7219
        }
    },

    "Mizoram": {
        "Aizawl": {
            "latitude": 23.7271,
            "longitude": 92.7176
        }
    },

    "Nagaland": {
        "Kohima": {
            "latitude": 25.6751,
            "longitude": 94.1086
        },
        "Dimapur": {
            "latitude": 25.8629,
            "longitude": 93.7537
        }
    },

    "Sikkim": {
        "Gangtok": {
            "latitude": 27.3389,
            "longitude": 88.6065
        },
        "East Sikkim": {
            "latitude": 27.3300,
            "longitude": 88.6100
        }
    },

    "Tripura": {
        "Agartala": {
            "latitude": 23.8315,
            "longitude": 91.2868
        }
    }
}


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "LandGuard AI Backend is running!"
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "LandGuard AI Backend"
    }


# =========================================================
# LOCATIONS
# =========================================================

@app.get("/locations")
def get_locations():

    return locations


# =========================================================
# ENVIRONMENT
# =========================================================

@app.get("/environment")
def get_environment(
    latitude: float = 27.33,
    longitude: float = 88.61
):

    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": latitude,
        "longitude": longitude,

        "current": (
            "temperature_2m,"
            "relative_humidity_2m,"
            "precipitation,"
            "rain,"
            "soil_moisture_0_to_7cm,"
            "soil_moisture_7_to_28cm,"
            "soil_moisture_28_to_100cm"
        ),

        "timezone": "auto"
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=20
        )

        response.raise_for_status()

        data = response.json()

        current = data["current"]

        return {

            "location": {
                "latitude": latitude,
                "longitude": longitude
            },

            "temperature":
                current["temperature_2m"],

            "humidity":
                current["relative_humidity_2m"],

            "rainfall":
                current["precipitation"],

            "rain":
                current["rain"],

            "soil_moisture": {

                "0_to_7cm":
                    current["soil_moisture_0_to_7cm"],

                "7_to_28cm":
                    current["soil_moisture_7_to_28cm"],

                "28_to_100cm":
                    current["soil_moisture_28_to_100cm"]
            }
        }

    except Exception as error:

        return {
            "error": "Could not get environment data",
            "details": str(error)
        }


# =========================================================
# ELEVATION
# =========================================================

@app.get("/elevation")
def get_elevation(
    latitude: float = 27.33,
    longitude: float = 88.61
):

    url = "https://api.open-meteo.com/v1/elevation"

    try:

        response = requests.get(
            url,
            params={
                "latitude": latitude,
                "longitude": longitude
            },
            timeout=20
        )

        response.raise_for_status()

        data = response.json()

        return {

            "location": {
                "latitude": latitude,
                "longitude": longitude
            },

            "elevation":
                data["elevation"][0],

            "unit":
                "meters"
        }

    except Exception as error:

        return {
            "error": "Could not get elevation",
            "details": str(error)
        }


# =========================================================
# SLOPE
# =========================================================

def calculate_slope(
    latitude,
    longitude
):

    offset = 0.01

    points = {

        "north": (
            latitude + offset,
            longitude
        ),

        "south": (
            latitude - offset,
            longitude
        ),

        "east": (
            latitude,
            longitude + offset
        ),

        "west": (
            latitude,
            longitude - offset
        )
    }

    elevations = {}

    elevation_url = (
        "https://api.open-meteo.com/v1/elevation"
    )

    for direction, coordinates in points.items():

        response = requests.get(
            elevation_url,
            params={
                "latitude": coordinates[0],
                "longitude": coordinates[1]
            },
            timeout=20
        )

        response.raise_for_status()

        data = response.json()

        elevations[direction] = (
            data["elevation"][0]
        )

    north_south_difference = abs(
        elevations["north"]
        -
        elevations["south"]
    )

    east_west_difference = abs(
        elevations["east"]
        -
        elevations["west"]
    )

    north_south_distance = 2220

    east_west_distance = (
        2220
        *
        abs(
            math.cos(
                math.radians(latitude)
            )
        )
    )

    ns_gradient = (
        north_south_difference
        /
        north_south_distance
    )

    ew_gradient = (
        east_west_difference
        /
        east_west_distance
    )

    gradient = math.sqrt(
        ns_gradient ** 2
        +
        ew_gradient ** 2
    )

    slope_degrees = math.degrees(
        math.atan(gradient)
    )

    return round(
        slope_degrees,
        2
    )


@app.get("/slope")
def get_slope(
    latitude: float = 27.33,
    longitude: float = 88.61
):

    try:

        slope = calculate_slope(
            latitude,
            longitude
        )

        return {

            "location": {
                "latitude": latitude,
                "longitude": longitude
            },

            "slope":
                slope,

            "unit":
                "degrees"
        }

    except Exception as error:

        return {

            "error":
                "Could not calculate slope",

            "details":
                str(error)
        }


# =========================================================
# RAINFALL
# =========================================================

def calculate_rainfall(
    latitude,
    longitude
):

    url = (
        "https://api.open-meteo.com/v1/forecast"
    )

    params = {

        "latitude":
            latitude,

        "longitude":
            longitude,

        "hourly":
            "precipitation",

        "past_hours":
            24,

        "forecast_hours":
            0,

        "timezone":
            "auto"
    }

    response = requests.get(
        url,
        params=params,
        timeout=20
    )

    response.raise_for_status()

    data = response.json()

    rainfall_values = (
        data["hourly"]["precipitation"]
    )

    rainfall_values = (
        rainfall_values[-24:]
    )

    rainfall_24h = sum(
        value
        for value in rainfall_values
        if value is not None
    )

    return round(
        rainfall_24h,
        2
    )


@app.get("/rainfall")
def get_rainfall(
    latitude: float = 27.33,
    longitude: float = 88.61
):

    try:

        rainfall = calculate_rainfall(
            latitude,
            longitude
        )

        return {

            "location": {
                "latitude": latitude,
                "longitude": longitude
            },

            "hours":
                24,

            "rainfall_24h":
                rainfall,

            "unit":
                "mm"
        }

    except Exception as error:

        return {

            "error":
                "Could not calculate rainfall",

            "details":
                str(error)
        }


# =========================================================
# ML LANDSLIDE PREDICTION
# =========================================================

@app.get("/prediction")
def get_prediction(
    latitude: float = 27.33,
    longitude: float = 88.61
):

    try:

        # -------------------------------------------------
        # RAINFALL
        # -------------------------------------------------

        rainfall_24h = calculate_rainfall(
            latitude,
            longitude
        )

        # -------------------------------------------------
        # SOIL MOISTURE
        # -------------------------------------------------

        environment_url = (
            "https://api.open-meteo.com/v1/forecast"
        )

        environment_params = {

            "latitude":
                latitude,

            "longitude":
                longitude,

            "current": (
                "soil_moisture_0_to_7cm,"
                "soil_moisture_7_to_28cm,"
                "soil_moisture_28_to_100cm"
            ),

            "timezone":
                "auto"
        }

        environment_response = requests.get(
            environment_url,
            params=environment_params,
            timeout=20
        )

        environment_response.raise_for_status()

        environment_data = (
            environment_response.json()
        )

        current = (
            environment_data["current"]
        )

        soil_0_7 = current[
            "soil_moisture_0_to_7cm"
        ]

        soil_7_28 = current[
            "soil_moisture_7_to_28cm"
        ]

        soil_28_100 = current[
            "soil_moisture_28_to_100cm"
        ]

        soil_values = [
            soil_0_7,
            soil_7_28,
            soil_28_100
        ]

        valid_soil_values = [
            value
            for value in soil_values
            if value is not None
        ]

        if not valid_soil_values:

            raise Exception(
                "Soil moisture data unavailable"
            )

        soil_moisture = (
            sum(valid_soil_values)
            /
            len(valid_soil_values)
        )

        # -------------------------------------------------
        # SLOPE
        # -------------------------------------------------

        slope = calculate_slope(
            latitude,
            longitude
        )

        # -------------------------------------------------
        # ML MODEL
        # -------------------------------------------------

        ml_result = predict_risk(
            rainfall_24h,
            soil_moisture,
            slope
        )

        risk_score = (
            ml_result["risk_score"]
        )

        risk_level = (
            ml_result["risk_level"]
        )

        prediction = (
            ml_result["prediction"]
        )

        # -------------------------------------------------
        # SAVE PREDICTION
        # -------------------------------------------------

        prediction_record = {

            "latitude":
                latitude,

            "longitude":
                longitude,

            "rainfall_24h":
                rainfall_24h,

            "soil_moisture":
                round(
                    soil_moisture,
                    3
                ),

            "slope":
                slope,

            "prediction":
                prediction,

            "risk_score":
                risk_score,

            "risk_level":
                risk_level,

            "created_at":
                datetime.now().isoformat()
        }

        if predictions_collection is not None:

            try:

                predictions_collection.insert_one(
                    prediction_record
                )

                print(
                    "Prediction saved to MongoDB"
                )

            except Exception as db_error:

                print(
                    "MongoDB save failed:",
                    db_error
                )

        # -------------------------------------------------
        # RETURN RESULT
        # -------------------------------------------------

        return {

            "location": {

                "latitude":
                    latitude,

                "longitude":
                    longitude
            },

            "rainfall_24h":
                rainfall_24h,

            "soil_moisture":
                round(
                    soil_moisture,
                    3
                ),

            "slope":
                slope,

            "prediction":
                prediction,

            "risk_score":
                risk_score,

            "risk_level":
                risk_level
        }

    except Exception as error:

        print(
            "Prediction error:",
            error
        )

        return {

            "error":
                "Could not calculate landslide risk",

            "details":
                str(error)
        }


# =========================================================
# HISTORICAL RAINFALL
# =========================================================

@app.get("/historical")
def historical(
    latitude: float,
    longitude: float
):

    url = (
        "https://archive-api.open-meteo.com/v1/archive"
    )

    params = {

        "latitude":
            latitude,

        "longitude":
            longitude,

        "start_date":
            "2026-08-18",

        "end_date":
            "2026-08-27",

        "daily":
            "precipitation_sum",

        "timezone":
            "auto"
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=20
        )

        response.raise_for_status()

        data = response.json()

        return {

            "location": {

                "latitude":
                    latitude,

                "longitude":
                    longitude
            },

            "dates":
                data["daily"]["time"],

            "rainfall_mm":
                data["daily"][
                    "precipitation_sum"
                ]
        }

    except Exception as error:

        return {

            "error":
                "Could not retrieve historical data",

            "details":
                str(error)
        }


# =========================================================
# CITIZEN / FIELD INCIDENT REPORT
# =========================================================

@app.post("/reports")
async def create_report(

    incident_type: str = Form(...),

    state: str = Form(...),

    location: str = Form(...),

    description: str = Form(...),

    latitude: float = Form(None),

    longitude: float = Form(None),

    photo: UploadFile = File(None)
):

    try:

        photo_filename = None

        # -------------------------------------------------
        # SAVE PHOTO
        # -------------------------------------------------

        if photo is not None:

            timestamp = datetime.now().strftime(
                "%Y%m%d_%H%M%S_%f"
            )

            original_name = (
                photo.filename
                or "incident_photo"
            )

            photo_filename = (
                f"{timestamp}_{original_name}"
            )

            photo_path = os.path.join(
                UPLOAD_FOLDER,
                photo_filename
            )

            with open(
                photo_path,
                "wb"
            ) as buffer:

                shutil.copyfileobj(
                    photo.file,
                    buffer
                )

            print(
                "Incident photo saved:",
                photo_filename
            )

        # -------------------------------------------------
        # CREATE REPORT
        # -------------------------------------------------

        report_data = {

            "incident_type":
                incident_type,

            "state":
                state,

            "location":
                location,

            "description":
                description,

            "latitude":
                latitude,

            "longitude":
                longitude,

            "photo":
                photo_filename,

            "created_at":
                datetime.now().isoformat()
        }

        # -------------------------------------------------
        # SAVE TO MONGODB
        # -------------------------------------------------

        if field_reports_collection is not None:

            result = (
                field_reports_collection
                .insert_one(report_data)
            )

            print(
                "Incident report saved to MongoDB"
            )

            return {

                "message":
                    "Incident report submitted successfully",

                "report_id":
                    str(result.inserted_id),

                "photo":
                    photo_filename
            }

        return {

            "message":
                "Report received, but MongoDB is not connected",

            "photo":
                photo_filename
        }

    except Exception as error:

        print(
            "Report error:",
            error
        )

        return {

            "error":
                "Could not submit incident report",

            "details":
                str(error)
        }


# =========================================================
# GET INCIDENT REPORTS
# =========================================================

@app.get("/reports")
def get_reports():

    try:

        if field_reports_collection is None:

            return {

                "count":
                    0,

                "reports":
                    []
            }

        reports = list(
            field_reports_collection
            .find(
                {},
                {
                    "_id": 0
                }
            )
            .sort(
                "created_at",
                -1
            )
            .limit(50)
        )

        return {

            "count":
                len(reports),

            "reports":
                reports
        }

    except Exception as error:

        return {

            "error":
                "Could not retrieve reports",

            "details":
                str(error)
        }
    