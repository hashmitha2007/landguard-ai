
import React, { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function AIPrediction() {
  const [latitude, setLatitude] = useState("27.33");
  const [longitude, setLongitude] = useState("88.61");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runPrediction = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `${API_URL}/prediction?latitude=${latitude}&longitude=${longitude}`
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Prediction failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm text-cyan-400 font-semibold">
            LANDGUARD AI
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Landslide Risk Prediction
          </h1>

          <p className="text-slate-400 mt-2">
            AI-powered environmental risk assessment
          </p>
        </div>

        {/* INPUT PANEL */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-5">
            Select Location
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Latitude
              </label>

              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Longitude
              </label>

              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

          </div>

          <button
            onClick={runPrediction}
            disabled={loading}
            className="mt-6 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-950 font-semibold px-6 py-3 rounded-lg"
          >
            {loading ? "Analyzing..." : "Run AI Prediction"}
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-6 bg-red-950 border border-red-800 text-red-300 rounded-xl p-5">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-6">

            <h2 className="text-xl font-semibold mb-4">
              Prediction Result
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              {/* RISK */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                <p className="text-slate-400 text-sm">
                  Risk Level
                </p>

                <p className="text-3xl font-bold mt-3">
                  {result.risk_level}
                </p>

                <p className="text-slate-400 mt-2">
                  Risk Score: {result.risk_score}/100
                </p>

              </div>

              {/* RAINFALL */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                <p className="text-slate-400 text-sm">
                  Rainfall - Last 24 Hours
                </p>

                <p className="text-3xl font-bold mt-3">
                  {result.rainfall_24h} mm
                </p>

              </div>

              {/* SOIL */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                <p className="text-slate-400 text-sm">
                  Soil Moisture
                </p>

                <p className="text-3xl font-bold mt-3">
                  {result.soil_moisture}
                </p>

              </div>

            </div>

            {/* DETAILS */}
            <div className="mt-5 bg-slate-900 border border-slate-800 rounded-xl p-6">

              <h3 className="text-lg font-semibold mb-5">
                Environmental Factors
              </h3>

              <div className="grid md:grid-cols-3 gap-5">

                <div>
                  <p className="text-slate-400 text-sm">
                    Latitude
                  </p>
                  <p className="font-semibold mt-1">
                    {result.location.latitude}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Longitude
                  </p>
                  <p className="font-semibold mt-1">
                    {result.location.longitude}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Slope
                  </p>
                  <p className="font-semibold mt-1">
                    {result.slope}°
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
