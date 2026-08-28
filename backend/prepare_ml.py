import pandas as pd

INPUT_FILE = "data/ml_dataset_with_terrain.csv"
OUTPUT_FILE = "data/final_ml_dataset.csv"

# Load dataset
df = pd.read_csv(INPUT_FILE)

print("Original records:", len(df))

# Show missing values
print("\nMissing values:")
print(df.isnull().sum())

# Remove rows where terrain information is missing
df = df.dropna(
    subset=["elevation", "slope"]
).copy()

# Convert numerical columns to numbers
numeric_columns = [
    "latitude",
    "longitude",
    "rainfall_24h",
    "soil_moisture",
    "elevation",
    "slope",
    "landslide"
]

for column in numeric_columns:
    df[column] = pd.to_numeric(
        df[column],
        errors="coerce"
    )

# Remove any rows that became invalid
df = df.dropna(
    subset=numeric_columns
).copy()

# Keep only the columns needed for ML
final_columns = [
    "latitude",
    "longitude",
    "rainfall_24h",
    "soil_moisture",
    "elevation",
    "slope",
    "landslide"
]

df = df[final_columns]

# Shuffle dataset
df = df.sample(
    frac=1,
    random_state=42
).reset_index(drop=True)

# Save
df.to_csv(
    OUTPUT_FILE,
    index=False
)

print("\n--------------------------------")
print("FINAL ML DATASET CREATED")
print("--------------------------------")

print("Total records:", len(df))

print("\nColumns:")
print(df.columns.tolist())

print("\nMissing values:")
print(df.isnull().sum())

print("\nClass distribution:")
print(df["landslide"].value_counts())

print("\nFirst 10 records:")
print(df.head(10).to_string(index=False))

print("\nSaved to:")
print(OUTPUT_FILE)