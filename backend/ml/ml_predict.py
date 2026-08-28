import os
import joblib
import pandas as pd

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "landslide_model.pkl"
)

model = joblib.load(MODEL_PATH)


def predict_risk(
    rainfall_24h,
    soil_moisture,
    slope
):
    input_data = pd.DataFrame([
        {
            "rainfall_24h": rainfall_24h,
            "soil_moisture": soil_moisture,
            "slope": slope
        }
    ])

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(
        input_data
    )[0][1]

    risk_score = round(
        probability * 100,
        2
    )

    if risk_score >= 70:
        risk_level = "HIGH"

    elif risk_score >= 40:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"

    return {
        "prediction": int(prediction),
        "risk_score": risk_score,
        "risk_level": risk_level
    }