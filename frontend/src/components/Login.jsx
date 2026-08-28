
import { useState } from "react";

function Login({ onLogin }) {
  const [role, setRole] = useState("citizen");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    // Demo login
    // Citizen: any username/password
    // Officer: username = officer, password = officer123

    if (role === "officer") {
      if (
        username.trim().toLowerCase() !== "officer" ||
        password !== "officer123"
      ) {
        setError(
          "Invalid officer credentials. Use officer / officer123 for the prototype."
        );
        return;
      }
    }

    onLogin(role);
  }

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
          maxWidth: "450px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "18px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "10px",
            }}
          >
            ⛰️
          </div>

          <h1
            style={{
              margin: "0",
              color: "#174d35",
              fontSize: "34px",
            }}
          >
            LandGuard AI
          </h1>

          <p
            style={{
              color: "#68766f",
              marginTop: "10px",
            }}
          >
            AI-powered landslide monitoring
          </p>
        </div>

        <h2
          style={{
            color: "#20392c",
            marginBottom: "20px",
          }}
        >
          Login
        </h2>

        {/* ROLE SELECTION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "25px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setRole("citizen");
              setError("");
            }}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border:
                role === "citizen"
                  ? "2px solid #287a43"
                  : "1px solid #d5ded9",
              backgroundColor:
                role === "citizen"
                  ? "#e6f5eb"
                  : "white",
              color:
                role === "citizen"
                  ? "#287a43"
                  : "#56645d",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            👤 Citizen
          </button>

          <button
            type="button"
            onClick={() => {
              setRole("officer");
              setError("");
            }}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border:
                role === "officer"
                  ? "2px solid #174d35"
                  : "1px solid #d5ded9",
              backgroundColor:
                role === "officer"
                  ? "#e6f5eb"
                  : "white",
              color:
                role === "officer"
                  ? "#174d35"
                  : "#56645d",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            👮 Officer
          </button>
        </div>

        <p
          style={{
            color: "#68766f",
            marginBottom: "20px",
          }}
        >
          Login as{" "}
          <strong>
            {role === "citizen"
              ? "Citizen"
              : "Authorized Officer"}
          </strong>
        </p>

        <form onSubmit={handleLogin}>
          {/* USERNAME */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#34483e",
            }}
          >
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter username"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              borderRadius: "9px",
              border: "1px solid #c9d4ce",
              fontSize: "15px",
              marginBottom: "18px",
            }}
          />

          {/* PASSWORD */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#34483e",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px",
              borderRadius: "9px",
              border: "1px solid #c9d4ce",
              fontSize: "15px",
              marginBottom: "20px",
            }}
          />

          {/* ERROR */}

          {error && (
            <div
              style={{
                backgroundColor: "#fff0f0",
                border: "1px solid #e0aaaa",
                color: "#a32626",
                padding: "12px",
                borderRadius: "9px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#174d35",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🔐 Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#8a958f",
            fontSize: "12px",
            marginTop: "25px",
            marginBottom: "0",
          }}
        >
          LandGuard AI • Northeast India
        </p>
      </div>
    </div>
  );
}

export default Login;

