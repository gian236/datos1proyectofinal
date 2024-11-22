import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const GestionPagos = () => {
  const [comprobanteId, setComprobanteId] = useState("");
  const [validarEstado, setValidarEstado] = useState(null); // true para aprobado, false para rechazado
  const [mensajeValidacion, setMensajeValidacion] = useState("");

  const [pagoId, setPagoId] = useState("");
  const [accionPago, setAccionPago] = useState(""); // "aprobar" o "denegar"
  const [mensajePago, setMensajePago] = useState("");

  const navigate = useNavigate(); // Hook para la navegación

  // Función para validar comprobante
  const validarComprobante = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/usuarios/pagos/${comprobanteId}/validar`,
        { aprobado: validarEstado } // El cuerpo debe ser JSON con "aprobado"
      );
      setMensajeValidacion(response.data.message);
    } catch (error) {
      console.error(error);
      setMensajeValidacion("Error al validar comprobante.");
    }
  };

  // Función para aprobar o denegar pago
  const gestionarPago = async () => {
    try {
      const endpoint =
        accionPago === "aprobar"
          ? `http://localhost:8000/usuarios/pagos/${pagoId}/aprobar`
          : `http://localhost:8000/usuarios/pagos/${pagoId}/denegar`;

      const response = await axios.put(endpoint); // PUT para ambos casos
      setMensajePago(response.data.message);
    } catch (error) {
      console.error(error);
      setMensajePago("Error al gestionar el pago.");
    }
  };

  // Función para volver atrás
  const goBack = () => {
    navigate(-1); // Vuelve a la página anterior en el historial de navegación
  };

  return (
    <div>
      {/* Botón para volver atrás */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={goBack} style={styles.backButton}>Volver Atrás</button>
      </div>

      {/* Botón para navegar a la página de préstamos pendientes */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/prestamos-pendientes">
          <button style={styles.button}>Ir a Préstamos Pendientes</button>
        </Link>
      </div>

      <h2>Gestión de Comprobantes y Pagos</h2>

      {/* Validar Comprobante */}
      <div>
        <h3>Validar Comprobante</h3>
        <input
          type="text"
          placeholder="ID del Comprobante"
          value={comprobanteId}
          onChange={(e) => setComprobanteId(e.target.value)}
        />
        <select
          value={validarEstado}
          onChange={(e) => setValidarEstado(e.target.value === "true")}
        >
          <option value="">Seleccionar Estado</option>
          <option value="true">Aprobar</option>
          <option value="false">Rechazar</option>
        </select>
        <button onClick={validarComprobante}>Validar</button>
        {mensajeValidacion && <p>{mensajeValidacion}</p>}
      </div>

      {/* Gestionar Pagos */}
      <div>
        <h3>Gestionar Pagos</h3>
        <input
          type="text"
          placeholder="ID del Pago"
          value={pagoId}
          onChange={(e) => setPagoId(e.target.value)}
        />
        <select
          value={accionPago}
          onChange={(e) => setAccionPago(e.target.value)}
        >
          <option value="">Seleccionar Acción</option>
          <option value="aprobar">Aprobar Pago</option>
          <option value="denegar">Denegar Pago</option>
        </select>
        <button onClick={gestionarPago}>Ejecutar Acción</button>
        {mensajePago && <p>{mensajePago}</p>}
      </div>
    </div>
  );
};

// Estilos para los botones
const styles = {
  button: {
    backgroundColor: "#4a90e2",
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
  },
  backButton: {
    backgroundColor: "#4CAF50", // Igual que los otros botones
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default GestionPagos;
