import pandas as pd
import random

INPUT_FILE = "data/landslide_environmental_data.csv"
OUTPUT_FILE = "data/ml_dataset.csv"

# Load our real landslide records
df = pd.read_csv(INPUT_FILE)

print("Real landslide records:", len(df))

# Create non-landslide samples
# We use the same locations but slightly different dates.
# These represent background/non-event conditions.
random.seed(42)

non_landslides = []

for _, row in df.iterrows():

    original_date = pd.to_datetime(row["date"])

    # Choose a nearby date that is different from the landslide date
    offset = random.choice([-30, -20, -15, -10, 10, 15, 20, 30])

    new_date = original_date + pd.Timedelta(days=offset)

    non_landslides.append({
        "event_id": f"non_{row['event_id']}",
        "date": new_date.strftime("%Y-%m-%d"),
        "state": row["state"],
        "latitude": row["latitude"],
        "longitude": row["longitude"],
        "rainfall_24h": row["rainfall_24h"],
        "soil_moisture": row["soil_moisture"],
        "landslide": 0
    })

# Convert to dataframe
negative_df = pd.DataFrame(non_landslides)

# Combine positive and negative records
ml_df = pd.concat(
    [df, negative_df],
    ignore_index=True
)

# Shuffle the dataset
ml_df = ml_df.sample(
    frac=1,
    random_state=42
).reset_index(drop=True)

# Save final ML dataset
ml_df.to_csv(
    OUTPUT_FILE,
    index=False
)

print("\n--------------------------------")
print("ML DATASET CREATED")
print("--------------------------------")

print("Total records:", len(ml_df))

print("\nClass distribution:")
print(
    ml_df["landslide"].value_counts()
)

print("\nSaved to:")
print(OUTPUT_FILE)