import { useState } from "react";

function Login({ onLogin }) {
  const [role, setRole] = useState("citizen");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    setError("");

    // --------------------------------------------------
    // DEMO LOGIN
    // --------------------------------------------------

    if (role === "citizen") {
      if (
        username === "citizen" &&
        password === "1234"
      ) {
        onLogin("citizen");
        return;
      }

      setError(
        "Invalid citizen login. Use citizen / 1234"
      );

      return;
    }

    if (role === "officer") {
      if (
        username === "officer" &&
        password === "admin123"
      ) {
        onLogin("officer");
        return;
      }

      setError(
        "Invalid officer login. Use officer / admin123"
      );

      return;
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f5ee, #f5f8f6)",
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
          borderRadius: "20px",
          boxShadow:
            "0 10px 35px rgba(0,0,0,0.1)",
        }}
      >

        {/* LOGO / TITLE */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >

          <div
            style={{
              fontSize: "50px",
              marginBottom: "10px",
            }}
          >
            ⛰️
          </div>

          <h1
            style={{
              margin: 0,
              color: "#174d35",
              fontSize: "34px",
            }}
          >
            LandGuard AI
          </h1>

          <p
            style={{
              color: "#68766f",
              marginTop: "8px",
            }}
          >
            AI-powered landslide monitoring
          </p>

          <p
            style={{
              color: "#68766f",
              fontSize: "14px",
            }}
          >
            Northeast India
          </p>

        </div>


        {/* ROLE SELECTION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "10px",
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
                  ? "2px solid #174d35"
                  : "1px solid #ccd8d1",
              backgroundColor:
                role === "citizen"
                  ? "#e6f5eb"
                  : "white",
              color: "#174d35",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            👤
            <br />
            Citizen
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
                  : "1px solid #ccd8d1",
              backgroundColor:
                role === "officer"
                  ? "#e6f5eb"
                  : "white",
              color: "#174d35",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🛡️
            <br />
            Authorized Officer
          </button>

        </div>


        {/* LOGIN TITLE */}

        <h2
          style={{
            color: "#20392c",
            marginBottom: "20px",
          }}
        >
          {role === "citizen"
            ? "Citizen Login"
            : "Officer Login"}
        </h2>


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
            placeholder={
              role === "citizen"
                ? "Enter citizen username"
                : "Enter officer username"
            }
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              borderRadius: "9px",
              border:
                "1px solid #c9d4ce",
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
              padding: "14px",
              borderRadius: "9px",
              border:
                "1px solid #c9d4ce",
              fontSize: "15px",
              marginBottom: "18px",
            }}
          />


          {/* ERROR */}

          {error && (
            <div
              style={{
                backgroundColor: "#fff0f0",
                color: "#a32626",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "18px",
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
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#174d35",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {role === "citizen"
              ? "👤 Login as Citizen"
              : "🛡️ Login as Officer"}
          </button>

        </form>


        {/* DEMO DETAILS */}

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

          <strong>Prototype Login</strong>

          <br />
          <br />

          Citizen:
          <br />
          Username: <strong>citizen</strong>
          <br />
          Password: <strong>1234</strong>

          <br />
          <br />

          Officer:
          <br />
          Username: <strong>officer</strong>
          <br />
          Password: <strong>admin123</strong>

        </div>

      </div>

    </div>
  );
}

export default Login;