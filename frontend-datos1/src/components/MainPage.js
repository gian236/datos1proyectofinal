import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if (username === "admin" && password === "admin123") {
      navigate("/prestamos-pendientes");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <div className="admin-option" onClick={() => setShowAdminLogin(!showAdminLogin)}>
          Ingresar como administrador
        </div>
      </header>

      {showAdminLogin && (
        <div className="admin-login">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleAdminLogin}>Ingresar</button>
        </div>
      )}

      <main className="main-content">
        <h1>Bienvenido</h1>
        <div className="button-container">
          <button onClick={() => navigate("/solicitud-prestamo")}>
            Solicitud de Préstamo
          </button>
          <button onClick={() => navigate("/usuario-detalles")}>Detalles de Préstamo</button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
