import joblib
import numpy as np

# Load trained model
model = joblib.load("landslide_model.pkl")

print("LandGuard AI model loaded successfully!")


def predict_landslide(
    latitude,
    longitude,
    rainfall_24h,
    soil_moisture,
    elevation,
    slope
):
    features = np.array([[
        latitude,
        longitude,
        rainfall_24h,
        soil_moisture,
        elevation,
        slope
    ]])

    prediction = model.predict(features)[0]

    probability = model.predict_proba(features)[0][1]

    if probability >= 0.70:
        risk = "HIGH"
    elif probability >= 0.40:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "prediction": int(prediction),
        "probability": round(float(probability) * 100, 2),
        "risk": risk
    }


# Test prediction
result = predict_landslide(
    latitude=25.5,
    longitude=93.0,
    rainfall_24h=50,
    soil_moisture=0.48,
    elevation=800,
    slope=30
)

print("\nTest prediction:")
print(result)