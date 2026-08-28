import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# ==========================================
# 1. LOAD DATASET
# ==========================================

DATA_FILE = "data/final_ml_dataset.csv"
MODEL_FILE = "landslide_model.pkl"

df = pd.read_csv(DATA_FILE)

print("Dataset loaded successfully!")
print("Total records:", len(df))


# ==========================================
# 2. SELECT FEATURES
# ==========================================

features = [
    "latitude",
    "longitude",
    "rainfall_24h",
    "soil_moisture",
    "elevation",
    "slope"
]

X = df[features]
y = df["landslide"]


# ==========================================
# 3. SPLIT DATA
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining records:", len(X_train))
print("Testing records:", len(X_test))


# ==========================================
# 4. CREATE AI MODEL
# ==========================================

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)


# ==========================================
# 5. TRAIN MODEL
# ==========================================

print("\nTraining LandGuard AI model...")

model.fit(X_train, y_train)

print("Training completed!")


# ==========================================
# 6. TEST MODEL
# ==========================================

predictions = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print("\n--------------------------------")
print("MODEL RESULTS")
print("--------------------------------")

print(
    f"Accuracy: {accuracy * 100:.2f}%"
)

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        predictions
    )
)

print("\nConfusion Matrix:")
print(
    confusion_matrix(
        y_test,
        predictions
    )
)


# ==========================================
# 7. FEATURE IMPORTANCE
# ==========================================

print("\nFeature Importance:")

importance = pd.DataFrame({
    "feature": features,
    "importance": model.feature_importances_
})

importance = importance.sort_values(
    by="importance",
    ascending=False
)

print(importance.to_string(index=False))


# ==========================================
# 8. SAVE MODEL
# ==========================================

joblib.dump(
    model,
    MODEL_FILE
)

print("\n--------------------------------")
print("MODEL SAVED SUCCESSFULLY")
print("--------------------------------")

print("Saved to:")
print(MODEL_FILE)