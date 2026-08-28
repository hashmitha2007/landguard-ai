
import { useEffect, useState } from "react";

const BACKEND_URL = "http://127.0.0.1:8000";

function PredictionHistory() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/predictions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load predictions");
        }

        return response.json();
      })
      .then((data) => {
        console.log("MongoDB Predictions:", data);

        setPredictions(data.predictions || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Could not load prediction history");
        setLoading(false);
      });
  }, []);

  function getRiskColor(level) {
    if (level === "HIGH") {
      return "#c62828";
    }

    if (level === "MEDIUM") {
      return "#ef8c00";
    }

    return "#2e7d32";
  }

  function getLocationName(latitude, longitude) {
    if (
      latitude === 26.1445 &&
      longitude === 91.7362
    ) {
      return "Guwahati, Assam";
    }

    if (
      latitude === 27.33 &&
      longitude === 88.61
    ) {
      return "East Sikkim, Sikkim";
    }

    if (
      latitude === 27.4728 &&
      longitude === 94.912
    ) {
      return "Dibrugarh, Assam";
    }

    if (
      latitude === 27.0844 &&
      longitude === 93.6053
    ) {
      return "Itanagar, Arunachal Pradesh";
    }

    if (
      latitude === 27.586 &&
      longitude === 91.859
    ) {
      return "Tawang, Arunachal Pradesh";
    }

    if (
      latitude === 24.817 &&
      longitude === 93.9368
    ) {
      return "Imphal, Manipur";
    }

    if (
      latitude === 25.5788 &&
      longitude === 91.8933
    ) {
      return "Shillong, Meghalaya";
    }

    if (
      latitude === 25.2844 &&
      longitude === 91.7219
    ) {
      return "Cherrapunji, Meghalaya";
    }

    if (
      latitude === 23.7271 &&
      longitude === 92.7176
    ) {
      return "Aizawl, Mizoram";
    }

    if (
      latitude === 25.6751 &&
      longitude === 94.1086
    ) {
      return "Kohima, Nagaland";
    }

    if (
      latitude === 25.8629 &&
      longitude === 93.7537
    ) {
      return "Dimapur, Nagaland";
    }

    if (
      latitude === 27.3389 &&
      longitude === 88.6065
    ) {
      return "Gangtok, Sikkim";
    }

    if (
      latitude === 23.8315 &&
      longitude === 91.2868
    ) {
      return "Agartala, Tripura";
    }

    return "Northeast India";
  }

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          marginTop: "20px",
        }}
      >
        <h2>📊 Prediction History</h2>
        <p>Loading saved predictions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#fff0f0",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
          color: "#a32626",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "15px",
        marginTop: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ color: "#20392c" }}>
        📊 Prediction History
      </h2>

      <p style={{ color: "#68766f" }}>
        Predictions saved in MongoDB Atlas.
      </p>

      {predictions.length === 0 ? (
        <p>No saved predictions yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          {predictions.map((prediction, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e1e8e4",
                borderRadius: "12px",
                padding: "18px",
              }}
            >
              <h3>
                📍{" "}
                {getLocationName(
                  prediction.latitude,
                  prediction.longitude
                )}
              </h3>

              <p>
                Rainfall:{" "}
                <strong>
                  {prediction.rainfall_24h} mm
                </strong>
              </p>

              <p>
                Soil Moisture:{" "}
                <strong>
                  {prediction.soil_moisture}
                </strong>
              </p>

              <p>
                Slope:{" "}
                <strong>
                  {prediction.slope}°
                </strong>
              </p>

              <p>
                Risk Score:{" "}
                <strong>
                  {prediction.risk_score}/100
                </strong>
              </p>

              <p>
                Risk Level:{" "}
                <strong
                  style={{
                    color: getRiskColor(
                      prediction.risk_level
                    ),
                  }}
                >
                  {prediction.risk_level}
                </strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PredictionHistory;

