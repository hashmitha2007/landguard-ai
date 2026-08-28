import pandas as pd
import numpy as np

LANDSLIDE_FILE = "data/northeast_landslides_clean.csv"
OUTPUT_FILE = "data/background_locations.csv"

# We will create more points than needed,
# then keep only points inside our state regions.
NUMBER_OF_SAMPLES = 1000

np.random.seed(42)

# Approximate bounding boxes for the 8 Northeast states
STATE_BOXES = {
    "Assam": {
        "lat_min": 24.0, "lat_max": 28.3,
        "lon_min": 89.5, "lon_max": 96.0
    },

    "Arunachal Pradesh": {
        "lat_min": 26.0, "lat_max": 29.5,
        "lon_min": 91.5, "lon_max": 97.0
    },

    "Meghalaya": {
        "lat_min": 25.0, "lat_max": 26.2,
        "lon_min": 89.5, "lon_max": 92.0
    },

    "Manipur": {
        "lat_min": 23.8, "lat_max": 25.8,
        "lon_min": 93.0, "lon_max": 94.8
    },

    "Mizoram": {
        "lat_min": 21.9, "lat_max": 24.5,
        "lon_min": 92.2, "lon_max": 93.5
    },

    "Nagaland": {
        "lat_min": 25.2, "lat_max": 27.1,
        "lon_min": 93.3, "lon_max": 95.3
    },

    "Tripura": {
        "lat_min": 22.9, "lat_max": 24.5,
        "lon_min": 91.0, "lon_max": 92.4
    },

    "Sikkim": {
        "lat_min": 27.0, "lat_max": 28.2,
        "lon_min": 88.0, "lon_max": 89.0
    }
}


# ==========================================
# LOAD LANDSLIDE LOCATIONS
# ==========================================

landslides = pd.read_csv(LANDSLIDE_FILE)

landslide_coordinates = set(
    zip(
        landslides["latitude"].round(3),
        landslides["longitude"].round(3)
    )
)

print("Real landslide records:", len(landslides))


# ==========================================
# CREATE BACKGROUND POINTS
# ==========================================

background = []

for state, box in STATE_BOXES.items():

    # Create roughly equal number for each state
    target = NUMBER_OF_SAMPLES // len(STATE_BOXES)

    attempts = 0

    while len([
        x for x in background
        if x["state"] == state
    ]) < target:

        attempts += 1

        if attempts > 100000:
            break

        latitude = np.random.uniform(
            box["lat_min"],
            box["lat_max"]
        )

        longitude = np.random.uniform(
            box["lon_min"],
            box["lon_max"]
        )

        coordinate = (
            round(latitude, 3),
            round(longitude, 3)
        )

        # Don't duplicate known landslide coordinates
        if coordinate in landslide_coordinates:
            continue

        background.append({
            "event_id": f"BACKGROUND_{len(background) + 1}",
            "state": state,
            "latitude": latitude,
            "longitude": longitude,
            "landslide": 0
        })


# ==========================================
# KEEP ONLY 251
# ==========================================

background_df = pd.DataFrame(background)

background_df = background_df.sample(
    n=251,
    random_state=42
).reset_index(drop=True)


# ==========================================
# SAVE
# ==========================================

background_df.to_csv(
    OUTPUT_FILE,
    index=False
)


print("\n--------------------------------")
print("BACKGROUND DATASET CREATED")
print("--------------------------------")

print("Background records:", len(background_df))

print("\nRecords by state:")
print(
    background_df["state"].value_counts()
)

print("\nFirst 10 records:")
print(
    background_df.head(10).to_string(index=False)
)

print("\nSaved to:")
print(OUTPUT_FILE)