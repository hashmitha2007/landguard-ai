import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import RainfallChart from "./components/RainfallChart";

const BACKEND_URL = "http://127.0.0.1:8000";

function App() {
  // =====================================================
  // LOGIN
  // =====================================================

  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // =====================================================
  // LOCATIONS
  // =====================================================

  const [locations, setLocations] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // =====================================================
  // PREDICTION
  // =====================================================

  const [prediction, setPrediction] = useState(null);

  const [historical, setHistorical] = useState(null);
  const [historicalLoading, setHistoricalLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // INCIDENT REPORT
  // =====================================================

  const [incidentType, setIncidentType] =
    useState("Landslide");

  const [reportState, setReportState] =
    useState("");

  const [reportLocation, setReportLocation] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [reportLatitude, setReportLatitude] =
    useState("");

  const [reportLongitude, setReportLongitude] =
    useState("");

  const [photo, setPhoto] =
    useState(null);

  const [reportLoading, setReportLoading] =
    useState(false);

  const [reportMessage, setReportMessage] =
    useState("");

  // =====================================================
  // OFFICER REPORTS
  // =====================================================

  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] =
    useState(false);

  // =====================================================
  // 1. LOGIN
  // =====================================================

  function handleLogin(event) {
    event.preventDefault();

    setLoginError("");

    if (userRole === "citizen") {
      if (username === "citizen" && password === "citizen123") {
        setLoggedIn(true);
        setLoginError("");
      } else {
        setLoginError(
          "Invalid citizen username or password."
        );
      }
    } else if (userRole === "officer") {
       if (username === "officer" && password === "officer123") {
        setLoggedIn(true);
        setLoginError("");
      } else {
        setLoginError(
          "Invalid officer username or password."
        );
      }
    } else {
      setLoginError("Please select a login type.");
    }
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  function handleLogout() {
    setLoggedIn(false);
    setUserRole("");
    setUsername("");
    setPassword("");
    setLoginError("");
  }

  // =====================================================
  // 2. GET LOCATIONS FROM BACKEND
  // =====================================================

  useEffect(() => {
    fetch(`${BACKEND_URL}/locations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load locations");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Locations:", data);

        setLocations(data);

        const states = Object.keys(data);

        if (states.length > 0) {
          setSelectedState(states[0]);
          setReportState(states[0]);
        }
      })
      .catch((error) => {
        console.error("Location error:", error);
        setError("Could not connect to backend");
      });
  }, []);

  // =====================================================
  // 3. SET FIRST LOCATION WHEN STATE CHANGES
  // =====================================================

  useEffect(() => {
    if (!selectedState || !locations[selectedState]) {
      return;
    }

    const stateLocations = Object.keys(
      locations[selectedState]
    );

    if (stateLocations.length > 0) {
      setSelectedLocation(stateLocations[0]);
    }
  }, [selectedState, locations]);

  // =====================================================
  // 4. REPORT LOCATION WHEN REPORT STATE CHANGES
  // =====================================================

  useEffect(() => {
    if (!reportState || !locations[reportState]) {
      return;
    }

    const stateLocations = Object.keys(
      locations[reportState]
    );

    if (stateLocations.length > 0) {
      setReportLocation(stateLocations[0]);
    }
  }, [reportState, locations]);

  // =====================================================
  // 5. GET CURRENT PREDICTION
  // =====================================================

  useEffect(() => {
    if (!selectedState || !selectedLocation) {
      return;
    }

    const locationData =
      locations[selectedState]?.[selectedLocation];

    if (!locationData) {
      return;
    }

    setLoading(true);
    setPrediction(null);
    setError("");

    const url =
      `${BACKEND_URL}/prediction` +
      `?latitude=${locationData.latitude}` +
      `&longitude=${locationData.longitude}`;

    console.log("Prediction URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Prediction request failed");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Prediction:", data);

        if (data.error) {
          throw new Error(data.error);
        }

        setPrediction(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Prediction error:", error);

        setError("Could not get prediction");
        setLoading(false);
      });
  }, [
    selectedState,
    selectedLocation,
    locations,
  ]);

  // =====================================================
  // 6. GET HISTORICAL RAINFALL
  // =====================================================

  useEffect(() => {
    if (!selectedState || !selectedLocation) {
      return;
    }

    const locationData =
      locations[selectedState]?.[selectedLocation];

    if (!locationData) {
      return;
    }

    setHistoricalLoading(true);
    setHistorical(null);

    const url =
      `${BACKEND_URL}/historical` +
      `?latitude=${locationData.latitude}` +
      `&longitude=${locationData.longitude}`;

    console.log("Historical URL:", url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Historical request failed"
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log("Historical:", data);

        if (data.error) {
          throw new Error(data.error);
        }

        setHistorical(data);
        setHistoricalLoading(false);
      })
      .catch((error) => {
        console.error(
          "Historical error:",
          error
        );

        setHistoricalLoading(false);
      });
  }, [
    selectedState,
    selectedLocation,
    locations,
  ]);

  // =====================================================
  // 7. STATE CHANGE
  // =====================================================

  function handleStateChange(event) {
    setSelectedState(event.target.value);
    setPrediction(null);
    setHistorical(null);
    setError("");
  }

  // =====================================================
  // 8. LOCATION CHANGE
  // =====================================================

  function handleLocationChange(event) {
    setSelectedLocation(event.target.value);
    setPrediction(null);
    setHistorical(null);
    setError("");
  }

  // =====================================================
  // 9. REPORT STATE CHANGE
  // =====================================================

  function handleReportStateChange(event) {
    const state = event.target.value;

    setReportState(state);
    setReportLocation("");
    setReportMessage("");
  }

  // =====================================================
  // 10. REPORT LOCATION CHANGE
  // =====================================================

  function handleReportLocationChange(event) {
    setReportLocation(event.target.value);
  }

  // =====================================================
  // 11. USE CURRENT LOCATION
  // =====================================================

  function useCurrentLocation() {
    setReportMessage("");

    if (!navigator.geolocation) {
      setReportMessage(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        setReportLatitude(latitude.toFixed(6));
        setReportLongitude(longitude.toFixed(6));

        setReportMessage(
          "Current location detected successfully."
        );
      },
      (error) => {
        console.error(
          "Location error:",
          error
        );

        setReportMessage(
          "Could not get your current location. Please enter latitude and longitude manually."
        );
      }
    );
  }

  // =====================================================
  // 12. SUBMIT INCIDENT REPORT
  // =====================================================

  async function handleReportSubmit(event) {
    event.preventDefault();

    setReportMessage("");

    if (!incidentType) {
      setReportMessage(
        "Please select an incident type."
      );
      return;
    }

    if (!reportState) {
      setReportMessage(
        "Please select a state."
      );
      return;
    }

    if (!reportLocation) {
      setReportMessage(
        "Please select a location."
      );
      return;
    }

    if (!description.trim()) {
      setReportMessage(
        "Please enter a description."
      );
      return;
    }

    setReportLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "incident_type",
        incidentType
      );

      formData.append(
        "state",
        reportState
      );

      formData.append(
        "location",
        reportLocation
      );

      formData.append(
        "description",
        description
      );

      if (reportLatitude !== "") {
        formData.append(
          "latitude",
          reportLatitude
        );
      }

      if (reportLongitude !== "") {
        formData.append(
          "longitude",
          reportLongitude
        );
      }

      if (photo) {
        formData.append(
          "photo",
          photo
        );
      }

      const response = await fetch(
        `${BACKEND_URL}/reports`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(
        "Report response:",
        data
      );

      if (!response.ok || data.error) {
        throw new Error(
          data.error ||
            "Could not submit incident report"
        );
      }

      setReportMessage(
        "Incident report submitted successfully!"
      );

      // Clear form
      setIncidentType("Landslide");
      setDescription("");
      setReportLatitude("");
      setReportLongitude("");
      setPhoto(null);

      const fileInput =
        document.getElementById(
          "incident-photo"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      // Refresh officer reports if needed
      if (userRole === "officer") {
        loadReports();
      }
    } catch (error) {
      console.error(
        "Report submission error:",
        error
      );

      setReportMessage(
        "Could not submit incident report. Please make sure the backend is running."
      );
    } finally {
      setReportLoading(false);
    }
  }

  // =====================================================
  // 13. LOAD OFFICER REPORTS
  // =====================================================

  async function loadReports() {
    setReportsLoading(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/reports`
      );

      if (!response.ok) {
        throw new Error(
          "Could not retrieve reports"
        );
      }

      const data = await response.json();

      console.log(
        "Officer reports:",
        data
      );

      setReports(
        data.reports || []
      );
    } catch (error) {
      console.error(
        "Reports error:",
        error
      );

      setReports([]);
    } finally {
      setReportsLoading(false);
    }
  }

  // =====================================================
  // 14. LOAD REPORTS WHEN OFFICER LOGS IN
  // =====================================================

  useEffect(() => {
    if (
      loggedIn &&
      userRole === "officer"
    ) {
      loadReports();
    }
  }, [loggedIn, userRole]);

  // =====================================================
  // 15. RISK COLOR
  // =====================================================

  function getRiskColor(level) {
    if (level === "HIGH") {
      return "#c62828";
    }

    if (level === "MEDIUM") {
      return "#ef8c00";
    }

    return "#2e7d32";
  }

  // =====================================================
  // 16. RISK DESCRIPTION
  // =====================================================

  function getRiskDescription(level) {
    if (level === "HIGH") {
      return "High landslide susceptibility. Immediate monitoring and precautionary action are recommended.";
    }

    if (level === "MEDIUM") {
      return "Moderate landslide susceptibility. Continued monitoring is recommended.";
    }

    return "Low landslide susceptibility under the current environmental conditions.";
  }

  // =====================================================
  // 17. RAINFALL ANALYSIS
  // =====================================================

  function getRainfallAnalysis(rainfall) {
    if (rainfall >= 50) {
      return "High";
    }

    if (rainfall >= 20) {
      return "Moderate";
    }

    return "Low";
  }

  // =====================================================
  // 18. SOIL MOISTURE ANALYSIS
  // =====================================================

  function getSoilAnalysis(soil) {
    if (soil >= 0.6) {
      return "High";
    }

    if (soil >= 0.3) {
      return "Moderate";
    }

    return "Low";
  }

  // =====================================================
  // 19. SLOPE ANALYSIS
  // =====================================================

  function getSlopeAnalysis(slope) {
    if (slope >= 30) {
      return "High";
    }

    if (slope >= 15) {
      return "Moderate";
    }

    return "Low";
  }

  // =====================================================
  // 20. LOGIN PAGE
  // =====================================================

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f4f7f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "430px",
            backgroundColor: "white",
            padding: "35px",
            borderRadius: "18px",
            boxShadow:
              "0 5px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#174d35",
              marginBottom: "8px",
            }}
          >
            LandGuard AI
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#68766f",
              marginBottom: "30px",
            }}
          >
            AI-powered landslide monitoring
          </p>

          <form onSubmit={handleLogin}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#34483e",
              }}
            >
              Login As
            </label>

            <select
              value={userRole}
              onChange={(event) =>
                setUserRole(
                  event.target.value
                )
              }
              style={{
                width: "100%",
                padding: "13px",
                marginBottom: "18px",
                borderRadius: "9px",
                border:
                  "1px solid #c9d4ce",
                fontSize: "15px",
              }}
            >
              <option value="">
                Select user type
              </option>

              <option value="citizen">
                Citizen
              </option>

              <option value="officer">
                Authorized Officer
              </option>
            </select>

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#34483e",
              }}
            >
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }
              placeholder="Enter username"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                marginBottom: "18px",
                borderRadius: "9px",
                border:
                  "1px solid #c9d4ce",
                fontSize: "15px",
              }}
            />

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#34483e",
              }}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter password"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                marginBottom: "20px",
                borderRadius: "9px",
                border:
                  "1px solid #c9d4ce",
                fontSize: "15px",
              }}
            />

            {loginError && (
              <div
                style={{
                  backgroundColor: "#fff0f0",
                  color: "#a32626",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              >
                {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "9px",
                backgroundColor: "#174d35",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>

          <div
            style={{
              marginTop: "25px",
              padding: "15px",
              backgroundColor: "#f5f8f6",
              borderRadius: "10px",
              fontSize: "13px",
              color: "#68766f",
            }}
          >
            <strong>Demo Login</strong>

            <br />

            Citizen: citizen /
            citizen123

            <br />

            Officer: officer /
            officer123
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // 21. UI
  // =====================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f7f6",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0",
                color: "#174d35",
                fontSize: "36px",
              }}
            >
              LandGuard AI
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#56645d",
              }}
            >
              AI-powered landslide monitoring for
              Northeast India
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: prediction
                  ? "#e6f5eb"
                  : "#fff8e6",
                color: prediction
                  ? "#287a43"
                  : "#a66a00",
                padding: "10px 15px",
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              ●{" "}
              {prediction
                ? "LIVE DATA"
                : "CONNECTING..."}
            </div>

            <button
              onClick={handleLogout}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "#174d35",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            style={{
              backgroundColor: "#fff0f0",
              border: "1px solid #e0aaaa",
              color: "#a32626",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* =================================================
            OFFICER DASHBOARD
        ================================================= */}

        {userRole === "officer" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2
                  style={{
                    marginTop: "0",
                    color: "#20392c",
                  }}
                >
                  👮 Officer Dashboard
                </h2>

                <p
                  style={{
                    color: "#68766f",
                  }}
                >
                  View citizen incident reports and
                  uploaded images.
                </p>
              </div>

              <button
                onClick={loadReports}
                style={{
                  padding: "12px 18px",
                  border: "none",
                  borderRadius: "9px",
                  backgroundColor: "#174d35",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                🔄 Refresh Reports
              </button>
            </div>

            {reportsLoading && (
              <div
                style={{
                  padding: "25px",
                  textAlign: "center",
                  color: "#68766f",
                }}
              >
                Loading incident reports...
              </div>
            )}

            {!reportsLoading &&
              reports.length === 0 && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "25px",
                    backgroundColor: "#f5f8f6",
                    borderRadius: "12px",
                    textAlign: "center",
                    color: "#68766f",
                  }}
                >
                  No incident reports have been
                  submitted yet.
                </div>
              )}

            {!reportsLoading &&
              reports.length > 0 && (
                <div
                  style={{
                    marginTop: "20px",
                    display: "grid",
                    gap: "20px",
                  }}
                >
                  {reports.map(
                    (report, index) => (
                      <div
                        key={index}
                        style={{
                          border:
                            "1px solid #e1e8e4",
                          borderRadius: "12px",
                          padding: "20px",
                          backgroundColor:
                            "#fafcfb",
                        }}
                      >
                        <h3
                          style={{
                            color: "#20392c",
                            marginTop: "0",
                          }}
                        >
                          📢{" "}
                          {report.incident_type}
                        </h3>

                        <p>
                          <strong>
                            State:
                          </strong>{" "}
                          {report.state}
                        </p>

                        <p>
                          <strong>
                            Location:
                          </strong>{" "}
                          {report.location}
                        </p>

                        <p>
                          <strong>
                            Description:
                          </strong>{" "}
                          {report.description}
                        </p>

                        {report.latitude !==
                          null &&
                          report.latitude !==
                            undefined && (
                            <p>
                              <strong>
                                Latitude:
                              </strong>{" "}
                              {report.latitude}
                            </p>
                          )}

                        {report.longitude !==
                          null &&
                          report.longitude !==
                            undefined && (
                            <p>
                              <strong>
                                Longitude:
                              </strong>{" "}
                              {report.longitude}
                            </p>
                          )}

                        {report.created_at && (
                          <p
                            style={{
                              color:
                                "#68766f",
                              fontSize:
                                "13px",
                            }}
                          >
                            Reported:{" "}
                            {new Date(
                              report.created_at
                            ).toLocaleString()}
                          </p>
                        )}

                        {report.photo ? (
                          <div
                            style={{
                              marginTop:
                                "15px",
                            }}
                          >
                            <p>
                              <strong>
                                📸 Incident
                                Photo
                              </strong>
                            </p>

                            <img
                              src={`${BACKEND_URL}/uploads/${encodeURIComponent(
                                report.photo
                              )}`}
                              alt="Incident"
                              style={{
                                width: "100%",
                                maxWidth:
                                  "500px",
                                maxHeight:
                                  "350px",
                                objectFit:
                                  "cover",
                                borderRadius:
                                  "10px",
                                border:
                                  "1px solid #dce5df",
                              }}
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          </div>
                        ) : (
                          <p
                            style={{
                              color:
                                "#68766f",
                            }}
                          >
                            📷 No image was
                            uploaded for this
                            report.
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        )}

        {/* =================================================
            LOCATION SELECTION
        ================================================= */}

        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              color: "#20392c",
              marginTop: "0",
            }}
          >
            📍 Select Location
          </h2>

          <p
            style={{
              color: "#68766f",
            }}
          >
            Choose a state and monitoring location
            from Northeast India.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >

            {/* STATE */}

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#34483e",
                }}
              >
                State
              </label>

              <select
                value={selectedState}
                onChange={handleStateChange}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "9px",
                  border:
                    "1px solid #c9d4ce",
                  backgroundColor: "white",
                  fontSize: "15px",
                }}
              >
                <option value="">
                  Select a state
                </option>

                {Object.keys(locations).map(
                  (state) => (
                    <option
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* LOCATION */}

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#34483e",
                }}
              >
                Location
              </label>

              <select
                value={selectedLocation}
                onChange={
                  handleLocationChange
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "9px",
                  border:
                    "1px solid #c9d4ce",
                  backgroundColor: "white",
                  fontSize: "15px",
                }}
              >
                <option value="">
                  Select a location
                </option>

                {selectedState &&
                  locations[selectedState] &&
                  Object.keys(
                    locations[selectedState]
                  ).map((location) => (
                    <option
                      key={location}
                      value={location}
                    >
                      {location}
                    </option>
                  ))}
              </select>
            </div>

          </div>
        </div>

        {/* =================================================
            MAP
        ================================================= */}

        {Object.keys(locations).length > 0 && (
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h2
              style={{
                marginTop: "0",
                color: "#20392c",
              }}
            >
              🗺️ Northeast India Monitoring Map
            </h2>

            <p
              style={{
                color: "#68766f",
              }}
            >
              Monitoring locations across the
              Northeast region.
            </p>

            <MapView
              locations={locations}
              selectedState={selectedState}
              selectedLocation={
                selectedLocation
              }
            />
          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "15px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <h2>
              Getting Environmental Data...
            </h2>

            <p
              style={{
                color: "#68766f",
              }}
            >
              LandGuard AI is collecting rainfall,
              soil moisture and terrain data.
            </p>
          </div>
        )}

        {/* =================================================
            PREDICTION
        ================================================= */}

        {prediction && !loading && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >

            <h2
              style={{
                color: "#20392c",
              }}
            >
              ⚠️ LandGuard Prediction
            </h2>

            <h3>
              {selectedLocation},{" "}
              {selectedState}
            </h3>

            {/* RISK */}

            <div
              style={{
                padding: "25px",
                marginTop: "20px",
                borderRadius: "14px",
                backgroundColor: "#f5f8f6",
              }}
            >
              <p
                style={{
                  color: "#718078",
                  fontWeight: "bold",
                }}
              >
                RISK LEVEL
              </p>

              <h1
                style={{
                  color: getRiskColor(
                    prediction.risk_level
                  ),
                  fontSize: "42px",
                  margin: "5px 0",
                }}
              >
                {prediction.risk_level}
              </h1>

              <p>
                Risk Score:{" "}
                <strong>
                  {prediction.risk_score} / 100
                </strong>
              </p>
            </div>

            {/* ENVIRONMENTAL FACTORS */}

            <h2
              style={{
                marginTop: "30px",
                color: "#20392c",
              }}
            >
              🌍 Environmental Factors
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
              }}
            >

              {/* RAINFALL */}

              <div
                style={{
                  padding: "20px",
                  border:
                    "1px solid #e1e8e4",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                  }}
                >
                  🌧️
                </div>

                <p>
                  24-hour Rainfall
                </p>

                <h3>
                  {prediction.rainfall_24h} mm
                </h3>
              </div>

              {/* SOIL */}

              <div
                style={{
                  padding: "20px",
                  border:
                    "1px solid #e1e8e4",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                  }}
                >
                  💧
                </div>

                <p>
                  Soil Moisture
                </p>

                <h3>
                  {prediction.soil_moisture}
                </h3>
              </div>

              {/* SLOPE */}

              <div
                style={{
                  padding: "20px",
                  border:
                    "1px solid #e1e8e4",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                  }}
                >
                  ⛰️
                </div>

                <p>
                  Terrain Slope
                </p>

                <h3>
                  {prediction.slope}°
                </h3>
              </div>

            </div>

            {/* RISK ANALYSIS */}

            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                border:
                  "1px solid #e1e8e4",
                borderRadius: "12px",
                backgroundColor: "#fafcfb",
              }}
            >
              <h2
                style={{
                  color: "#20392c",
                  marginTop: "0",
                }}
              >
                🔍 Risk Analysis
              </h2>

              <p
                style={{
                  color: "#68766f",
                }}
              >
                Factors contributing to the
                current landslide risk.
              </p>

              <p>
                🌧️{" "}
                <strong>
                  Rainfall:
                </strong>{" "}
                {getRainfallAnalysis(
                  prediction.rainfall_24h
                )}
              </p>

              <p>
                💧{" "}
                <strong>
                  Soil Moisture:
                </strong>{" "}
                {getSoilAnalysis(
                  prediction.soil_moisture
                )}
              </p>

              <p>
                ⛰️{" "}
                <strong>
                  Terrain Slope:
                </strong>{" "}
                {getSlopeAnalysis(
                  prediction.slope
                )}
              </p>

              <p>
                ⚠️{" "}
                <strong>
                  Overall Risk:
                </strong>{" "}
                <span
                  style={{
                    color: getRiskColor(
                      prediction.risk_level
                    ),
                    fontWeight: "bold",
                  }}
                >
                  {prediction.risk_level}{" "}
                  ({prediction.risk_score}/100)
                </span>
              </p>

              <p
                style={{
                  color: "#56645d",
                  marginBottom: "0",
                }}
              >
                {getRiskDescription(
                  prediction.risk_level
                )}
              </p>
            </div>

            {/* HISTORICAL RAINFALL LOADING */}

            {historicalLoading && (
              <div
                style={{
                  marginTop: "30px",
                  padding: "20px",
                  backgroundColor: "#f5f8f6",
                  borderRadius: "12px",
                }}
              >
                <h3>
                  Loading historical rainfall...
                </h3>

                <p>
                  Getting rainfall history for{" "}
                  {selectedLocation}.
                </p>
              </div>
            )}

            {/* HISTORICAL RAINFALL */}

            {historical && (
              <div
                style={{
                  marginTop: "30px",
                  padding: "25px",
                  border:
                    "1px solid #e1e8e4",
                  borderRadius: "12px",
                }}
              >
                <h2
                  style={{
                    color: "#20392c",
                  }}
                >
                  📊 Historical Rainfall
                </h2>

                <p
                  style={{
                    color: "#68766f",
                  }}
                >
                  Rainfall history for{" "}
                  {selectedLocation}.
                </p>

                <RainfallChart
                  dates={historical.dates}
                  rainfall={
                    historical.rainfall_mm
                  }
                />
              </div>
            )}

            {/* COORDINATES */}

            <div
              style={{
                display: "flex",
                gap: "50px",
                flexWrap: "wrap",
                marginTop: "25px",
                paddingTop: "20px",
                borderTop:
                  "1px solid #e3e9e6",
              }}
            >
              <div>
                <p>
                  Latitude
                </p>

                <strong>
                  {prediction.location.latitude}
                </strong>
              </div>

              <div>
                <p>
                  Longitude
                </p>

                <strong>
                  {prediction.location.longitude}
                </strong>
              </div>
            </div>

          </div>
        )}

        {/* =================================================
            CITIZEN INCIDENT REPORT
        ================================================= */}

        {userRole === "citizen" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h2
              style={{
                color: "#20392c",
                marginTop: "0",
              }}
            >
              📢 Report an Incident
            </h2>

            <p
              style={{
                color: "#68766f",
              }}
            >
              Report a landslide, road blockage,
              or slope failure in your area.
            </p>

            <form
              onSubmit={
                handleReportSubmit
              }
            >

              {/* INCIDENT TYPE */}

              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#34483e",
                  }}
                >
                  Incident Type
                </label>

                <select
                  value={incidentType}
                  onChange={(event) =>
                    setIncidentType(
                      event.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: "9px",
                    border:
                      "1px solid #c9d4ce",
                    backgroundColor:
                      "white",
                    fontSize: "15px",
                  }}
                >
                  <option value="Landslide">
                    Landslide
                  </option>

                  <option value="Road Blockage">
                    Road Blockage
                  </option>

                  <option value="Slope Failure">
                    Slope Failure
                  </option>
                </select>
              </div>

              {/* STATE + LOCATION */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: "#34483e",
                    }}
                  >
                    State
                  </label>

                  <select
                    value={reportState}
                    onChange={
                      handleReportStateChange
                    }
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: "9px",
                      border:
                        "1px solid #c9d4ce",
                      backgroundColor:
                        "white",
                      fontSize: "15px",
                    }}
                  >
                    <option value="">
                      Select state
                    </option>

                    {Object.keys(
                      locations
                    ).map((state) => (
                      <option
                        key={state}
                        value={state}
                      >
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: "#34483e",
                    }}
                  >
                    Location
                  </label>

                  <select
                    value={reportLocation}
                    onChange={
                      handleReportLocationChange
                    }
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: "9px",
                      border:
                        "1px solid #c9d4ce",
                      backgroundColor:
                        "white",
                      fontSize: "15px",
                    }}
                  >
                    <option value="">
                      Select a location
                    </option>

                    {reportState &&
                      locations[
                        reportState
                      ] &&
                      Object.keys(
                        locations[
                          reportState
                        ]
                      ).map(
                        (location) => (
                          <option
                            key={location}
                            value={location}
                          >
                            {location}
                          </option>
                        )
                      )}
                  </select>
                </div>

              </div>

              {/* DESCRIPTION */}

              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#34483e",
                  }}
                >
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Describe the incident..."
                  rows="5"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px",
                    borderRadius: "9px",
                    border:
                      "1px solid #c9d4ce",
                    fontSize: "15px",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* CURRENT LOCATION */}

              <button
                type="button"
                onClick={
                  useCurrentLocation
                }
                style={{
                  marginTop: "20px",
                  padding: "12px 18px",
                  borderRadius: "9px",
                  border:
                    "1px solid #174d35",
                  backgroundColor: "white",
                  color: "#174d35",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                📍 Use My Current Location
              </button>

              {/* PHOTO */}

              <div
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  backgroundColor: "#f5f8f6",
                  borderRadius: "12px",
                }}
              >
                <label
                  htmlFor="incident-photo"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#34483e",
                  }}
                >
                  📸 Incident Photo (Optional)
                </label>

                <p
                  style={{
                    color: "#68766f",
                    fontSize: "14px",
                  }}
                >
                  Upload a photo showing the
                  reported incident.
                </p>

                <input
                  id="incident-photo"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const selectedFile =
                      event.target.files?.[0] ||
                      null;

                    setPhoto(
                      selectedFile
                    );
                  }}
                  style={{
                    marginTop: "5px",
                  }}
                />

                {photo && (
                  <p
                    style={{
                      color: "#287a43",
                      fontSize: "14px",
                      marginBottom: "0",
                    }}
                  >
                    Selected:{" "}
                    {photo.name}
                  </p>
                )}
              </div>

              {/* LATITUDE + LONGITUDE */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: "#34483e",
                    }}
                  >
                    Latitude (Optional)
                  </label>

                  <input
                    type="number"
                    step="any"
                    value={
                      reportLatitude
                    }
                    onChange={(event) =>
                      setReportLatitude(
                        event.target.value
                      )
                    }
                    placeholder="Enter latitude"
                    style={{
                      width: "100%",
                      boxSizing:
                        "border-box",
                      padding: "13px",
                      borderRadius: "9px",
                      border:
                        "1px solid #c9d4ce",
                      fontSize: "15px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: "#34483e",
                    }}
                  >
                    Longitude (Optional)
                  </label>

                  <input
                    type="number"
                    step="any"
                    value={
                      reportLongitude
                    }
                    onChange={(event) =>
                      setReportLongitude(
                        event.target.value
                      )
                    }
                    placeholder="Enter longitude"
                    style={{
                      width: "100%",
                      boxSizing:
                        "border-box",
                      padding: "13px",
                      borderRadius: "9px",
                      border:
                        "1px solid #c9d4ce",
                      fontSize: "15px",
                    }}
                  />
                </div>

              </div>

              {/* MESSAGE */}

              {reportMessage && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "14px",
                    borderRadius: "9px",
                    backgroundColor:
                      reportMessage.includes(
                        "successfully"
                      )
                        ? "#e6f5eb"
                        : "#fff0f0",
                    color:
                      reportMessage.includes(
                        "successfully"
                      )
                        ? "#287a43"
                        : "#a32626",
                    fontWeight: "bold",
                  }}
                >
                  {reportMessage}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={reportLoading}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "15px",
                  border: "none",
                  borderRadius: "9px",
                  backgroundColor:
                    reportLoading
                      ? "#8da99a"
                      : "#174d35",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: reportLoading
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {reportLoading
                  ? "Submitting..."
                  : "📢 Submit Incident Report"}
              </button>

            </form>
          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer
          style={{
            textAlign: "center",
            color: "#7a8580",
            fontSize: "13px",
            padding: "15px",
          }}
        >
          <p>
            LandGuard AI • Northeast India
            Landslide Monitoring Prototype
          </p>

          <p>
            Environmental data powered by
            Open-Meteo
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;