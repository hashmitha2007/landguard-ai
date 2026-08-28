import pandas as pd

INPUT_FILE = "data/northeast_landslides.csv"
OUTPUT_FILE = "data/northeast_landslides_clean.csv"

# Northeast states
northeast_states = [
    "Assam",
    "Arunachal Pradesh",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Tripura",
    "Sikkim"
]

# Load NASA data
df = pd.read_csv(INPUT_FILE)

# --------------------------------------------------
# 1. Convert NASA event date
# --------------------------------------------------

df["event_date"] = pd.to_datetime(
    df["event_date"],
    errors="coerce"
)

df["date"] = df["event_date"].dt.strftime("%Y-%m-%d")

# --------------------------------------------------
# 2. Normalize state names
# --------------------------------------------------

state_map = {
    "Arunāchal Pradesh": "Arunachal Pradesh",
    "Meghālaya": "Meghalaya",
    "Nāgāland": "Nagaland"
}

df["admin_division_name"] = (
    df["admin_division_name"]
    .astype(str)
    .str.strip()
    .replace(state_map)
)

# --------------------------------------------------
# 3. Keep only Northeast states
# --------------------------------------------------

df = df[
    df["admin_division_name"].isin(northeast_states)
].copy()

# --------------------------------------------------
# 4. Remove records without coordinates/date
# --------------------------------------------------

df = df.dropna(
    subset=[
        "date",
        "latitude",
        "longitude"
    ]
)

# --------------------------------------------------
# 5. Keep useful columns
# --------------------------------------------------

df = df[
    [
        "event_id",
        "date",
        "admin_division_name",
        "latitude",
        "longitude",
        "landslide_category",
        "landslide_trigger",
        "landslide_size"
    ]
]

# --------------------------------------------------
# 6. Save clean dataset
# --------------------------------------------------

df.to_csv(
    OUTPUT_FILE,
    index=False
)

# --------------------------------------------------
# 7. Display information
# --------------------------------------------------

print("Clean dataset created successfully!")

print("Total records:", len(df))

print("\nRecords by state:")
print(
    df["admin_division_name"]
    .value_counts()
)

print("\nFirst 10 records:")
print(
    df.head(10).to_string(index=False)
)

print("\nSaved to:")
print(OUTPUT_FILE)