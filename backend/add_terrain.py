import pandas as pd
import requests
import time

INPUT_FILE = "data/ml_dataset.csv"
OUTPUT_FILE = "data/ml_dataset_with_terrain.csv"

df = pd.read_csv(INPUT_FILE)

results = []

print("Total records:", len(df))
print("Getting elevation and slope data...\n")

for index, row in df.iterrows():

    latitude = row["latitude"]
    longitude = row["longitude"]

    print(
        f"[{index + 1}/{len(df)}] "
        f"{row['state']} - "
        f"{latitude}, {longitude}"
    )

    try:
        # Elevation API
        elevation_url = "https://api.open-meteo.com/v1/forecast"

        elevation_params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": "temperature_2m"
        }

        elevation_response = requests.get(
            elevation_url,
            params=elevation_params,
            timeout=30
        )

        elevation_response.raise_for_status()

        elevation_data = elevation_response.json()

        elevation = elevation_data.get("elevation")

        # Open-Meteo elevation is not enough for slope.
        # We calculate slope using surrounding elevations.

        offsets = {
            "north": (latitude + 0.01, longitude),
            "south": (latitude - 0.01, longitude),
            "east": (latitude, longitude + 0.01),
            "west": (latitude, longitude - 0.01)
        }

        surrounding = {}

        for direction, (lat, lon) in offsets.items():

            params = {
                "latitude": lat,
                "longitude": lon,
                "current": "temperature_2m"
            }

            response = requests.get(
                elevation_url,
                params=params,
                timeout=30
            )

            response.raise_for_status()

            data = response.json()

            surrounding[direction] = data.get("elevation")

            time.sleep(0.1)

        north = surrounding["north"]
        south = surrounding["south"]
        east = surrounding["east"]
        west = surrounding["west"]

        # Calculate approximate terrain gradients
        north_south_difference = abs(north - south)
        east_west_difference = abs(east - west)

        # Approximate slope
        slope = (
            (north_south_difference + east_west_difference)
            / 2
        )

        results.append({
            "event_id": row["event_id"],
            "date": row["date"],
            "state": row["state"],
            "latitude": latitude,
            "longitude": longitude,
            "rainfall_24h": row["rainfall_24h"],
            "soil_moisture": row["soil_moisture"],
            "elevation": elevation,
            "slope": slope,
            "landslide": row["landslide"]
        })

    except Exception as error:

        print("Terrain request failed:", error)

        results.append({
            "event_id": row["event_id"],
            "date": row["date"],
            "state": row["state"],
            "latitude": latitude,
            "longitude": longitude,
            "rainfall_24h": row["rainfall_24h"],
            "soil_moisture": row["soil_moisture"],
            "elevation": None,
            "slope": None,
            "landslide": row["landslide"]
        })

    time.sleep(0.2)


result_df = pd.DataFrame(results)

result_df.to_csv(
    OUTPUT_FILE,
    index=False
)

print("\n--------------------------------")
print("TERRAIN DATA CREATED")
print("--------------------------------")

print("Records:", len(result_df))

print(
    "Elevation available:",
    result_df["elevation"].notna().sum()
)

print(
    "Slope available:",
    result_df["slope"].notna().sum()
)

print("\nSaved to:")
print(OUTPUT_FILE)