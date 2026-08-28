import pandas as pd

# Load NASA Global Landslide Catalog
df = pd.read_csv("data/landslide.csv")

# Northeast India states
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

# Get India records
india = df[
    df["country_name"].astype(str).str.lower() == "india"
]

print("Total India landslides:", len(india))

# Show the state/division names actually present in NASA data
print("\nIndian state/division names found:")

print(
    sorted(
        india["admin_division_name"]
        .dropna()
        .astype(str)
        .unique()
        .tolist()
    )
)

# Filter Northeast India
ne = india[
    india["admin_division_name"]
    .astype(str)
    .str.strip()
    .isin(northeast_states)
].copy()

# Keep useful columns
ne = ne[
    [
        "event_id",
        "event_date",
        "event_title",
        "country_name",
        "admin_division_name",
        "latitude",
        "longitude",
        "landslide_category",
        "landslide_trigger",
        "landslide_size",
        "fatality_count",
        "injury_count"
    ]
]

# Save filtered dataset
ne.to_csv(
    "data/northeast_landslides.csv",
    index=False
)

print("\nNortheast India landslides:", len(ne))

print("\nRecords by state:")

print(
    ne["admin_division_name"]
    .value_counts()
)

print("\nSaved successfully:")
print("data/northeast_landslides.csv")