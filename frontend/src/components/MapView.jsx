import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


// =====================================================
// Move map to selected location
// =====================================================

function MapUpdater({
  locations,
  selectedState,
  selectedLocation,
}) {
  const map = useMap();

  if (
    selectedState &&
    selectedLocation &&
    locations[selectedState]?.[selectedLocation]
  ) {
    const location =
      locations[selectedState][selectedLocation];

    map.setView(
      [location.latitude, location.longitude],
      9
    );
  }

  return null;
}


// =====================================================
// MAP COMPONENT
// =====================================================

function MapView({
  locations,
  selectedState,
  selectedLocation,
}) {

  // -----------------------------------------------------
  // Convert locations to array
  // -----------------------------------------------------

  const mapLocations = [];

  Object.keys(locations || {}).forEach((state) => {

    Object.keys(locations[state] || {}).forEach(
      (name) => {

        const location =
          locations[state][name];

        mapLocations.push({
          state: state,
          name: name,
          latitude: location.latitude,
          longitude: location.longitude,
        });

      }
    );

  });


  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        border: "1px solid #d9e2dc",
      }}
    >

      {/* =================================================
          MAP
      ================================================= */}

      <MapContainer
        center={[25.8, 92.8]}
        zoom={6}
        scrollWheelZoom={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >

        {/* OpenStreetMap */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* Move to selected location */}

        <MapUpdater
          locations={locations}
          selectedState={selectedState}
          selectedLocation={selectedLocation}
        />


        {/* =================================================
            MONITORING LOCATIONS
        ================================================= */}

        {mapLocations.map((location) => {

          const isSelected =
            location.state === selectedState &&
            location.name === selectedLocation;


          return (
            <CircleMarker
              key={`${location.state}-${location.name}`}
              center={[
                location.latitude,
                location.longitude,
              ]}
              radius={
                isSelected ? 14 : 8
              }
              pathOptions={{
                color: isSelected
                  ? "#d32f2f"
                  : "#1976d2",

                fillColor: isSelected
                  ? "#d32f2f"
                  : "#1976d2",

                fillOpacity: isSelected
                  ? 0.9
                  : 0.7,

                weight: isSelected
                  ? 4
                  : 2,
              }}
            >

              <Popup>

                <div
                  style={{
                    minWidth: "180px",
                  }}
                >

                  <h3
                    style={{
                      marginTop: 0,
                      color: "#174d35",
                    }}
                  >
                    📍 {location.name}
                  </h3>

                  <p>
                    <strong>
                      State:
                    </strong>{" "}
                    {location.state}
                  </p>

                  <p>
                    <strong>
                      Latitude:
                    </strong>{" "}
                    {location.latitude}
                  </p>

                  <p>
                    <strong>
                      Longitude:
                    </strong>{" "}
                    {location.longitude}
                  </p>

                  {isSelected && (
                    <p
                      style={{
                        color: "#d32f2f",
                        fontWeight: "bold",
                      }}
                    >
                      🔴 Selected Monitoring Area
                    </p>
                  )}

                </div>

              </Popup>

            </CircleMarker>
          );

        })}

      </MapContainer>


      {/* =================================================
          LEGEND
      ================================================= */}

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
          backgroundColor: "white",
          padding: "14px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.2)",
          minWidth: "190px",
        }}
      >

        <strong
          style={{
            display: "block",
            marginBottom: "10px",
            color: "#20392c",
          }}
        >
          🗺️ Map Legend
        </strong>


        {/* BLUE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "7px",
          }}
        >

          <span
            style={{
              width: "13px",
              height: "13px",
              borderRadius: "50%",
              backgroundColor: "#1976d2",
              display: "inline-block",
            }}
          />

          <span style={{ fontSize: "13px" }}>
            Monitoring Area
          </span>

        </div>


        {/* RED */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >

          <span
            style={{
              width: "13px",
              height: "13px",
              borderRadius: "50%",
              backgroundColor: "#d32f2f",
              display: "inline-block",
            }}
          />

          <span style={{ fontSize: "13px" }}>
            Selected Area
          </span>

        </div>

      </div>

    </div>
  );
}


export default MapView;