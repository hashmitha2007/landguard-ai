import pandas as pd
import requests
import time

INPUT_FILE = "data/northeast_landslides_clean.csv"
OUTPUT_FILE = "data/landslide_environmental_data.csv"

df = pd.read_csv(INPUT_FILE)

results = []

print("Total landslide records:", len(df))
print("Starting historical weather collection...\n")

for index, row in df.iterrows():

    latitude = row["latitude"]
    longitude = row["longitude"]
    date = row["date"]

    print(
        f"[{index + 1}/{len(df)}] "
        f"{row['admin_division_name']} - {date}"
    )

    url = "https://archive-api.open-meteo.com/v1/archive"

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": date,
        "end_date": date,
        "daily": "precipitation_sum,soil_moisture_0_to_7cm_mean",
        "timezone": "auto"
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=30
        )

        response.raise_for_status()

        weather = response.json()

        daily = weather.get("daily", {})

        rainfall = daily.get(
            "precipitation_sum",
            [None]
        )[0]

        soil_moisture = daily.get(
            "soil_moisture_0_to_7cm_mean",
            [None]
        )[0]

        results.append({
            "event_id": row["event_id"],
            "date": date,
            "state": row["admin_division_name"],
            "latitude": latitude,
            "longitude": longitude,
            "rainfall_24h": rainfall,
            "soil_moisture": soil_moisture,
            "landslide": 1
        })

    except Exception as error:

        print("Weather request failed:", error)

        results.append({
            "event_id": row["event_id"],
            "date": date,
            "state": row["admin_division_name"],
            "latitude": latitude,
            "longitude": longitude,
            "rainfall_24h": None,
            "soil_moisture": None,
            "landslide": 1
        })

    time.sleep(0.2)


result_df = pd.DataFrame(results)

result_df.to_csv(
    OUTPUT_FILE,
    index=False
)

print("\n--------------------------------")
print("DONE!")
print("--------------------------------")

print("Records collected:", len(result_df))

print(
    "Records with rainfall:",
    result_df["rainfall_24h"].notna().sum()
)

print(
    "Records with soil moisture:",
    result_df["soil_moisture"].notna().sum()
)

print("\nSaved to:")
print(OUTPUT_FILE)