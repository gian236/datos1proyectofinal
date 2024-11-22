import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const UsuarioDetalles = () => {
  const [codigoPrestamo, setCodigoPrestamo] = useState("");
  const [detallesPrestamo, setDetallesPrestamo] = useState(null);
  const [comprobante, setComprobante] = useState({ codigoTransaccion: "", montoPagado: "" });
  const [pagoID, setPagoID] = useState("");
  const [comprobanteCuota, setComprobanteCuota] = useState({ fechaPago: "", montoPagado: "", codigoTransaccion: "" });

  const navigate = useNavigate(); // Inicializar navigate

  // Manejar cambio de campos
  const handleInputChange = (e, setFunction) => {
    const { name, value } = e.target;
    setFunction(prev => ({ ...prev, [name]: value }));
  };

  // Obtener detalles del préstamo
  const obtenerDetallesPrestamo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/usuarios/prestamos/${codigoPrestamo}/detalle`);
      setDetallesPrestamo(response.data);
    } catch (error) {
      alert("Error al obtener detalles del préstamo.");
      console.error(error);
    }
  };

  // Registrar comprobante general
  const registrarComprobanteGeneral = async () => {
    try {
      await axios.post("http://localhost:8000/usuarios/pagos/comprobante-general", {
        codigo_prestamo: codigoPrestamo,
        codigo_transaccion: comprobante.codigoTransaccion,
        monto_pagado: parseFloat(comprobante.montoPagado),
      });
      alert("Comprobante general registrado con éxito.");
    } catch (error) {
      alert("Error al registrar el comprobante general.");
      console.error(error);
    }
  };

  // Registrar comprobante por cuota
  const registrarComprobanteCuota = async () => {
    try {
      await axios.post(`http://localhost:8000/usuarios/pagos/${pagoID}/registrar-cuota`, {
        fecha_pago: comprobanteCuota.fechaPago,
        monto_pagado: parseFloat(comprobanteCuota.montoPagado),
        codigo_transaccion: comprobanteCuota.codigoTransaccion,
      });
      alert("Comprobante de cuota registrado con éxito.");
    } catch (error) {
      alert("Error al registrar el comprobante de cuota.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Detalles del Préstamo</h1>
      <button onClick={() => navigate(-1)}>Volver atrás</button> {/* Botón para volver atrás */}

      {/* Buscar préstamo */}
      <div>
        <input
          type="text"
          placeholder="Ingrese código del préstamo"
          value={codigoPrestamo}
          onChange={(e) => setCodigoPrestamo(e.target.value)}
        />
        <button onClick={obtenerDetallesPrestamo}>Buscar Préstamo</button>
      </div>

      {/* Mostrar detalles del préstamo */}
      {detallesPrestamo && (
        <div>
          <h3>Información del Préstamo</h3>
          <p><strong>Monto Solicitado:</strong> {detallesPrestamo.monto_solicitado}</p>
          <p><strong>Cuotas Pactadas:</strong> {detallesPrestamo.cuotas_pactadas}</p>
          <p><strong>Pagos Realizados:</strong> {detallesPrestamo.pagos_realizados.length}</p>
          <p><strong>Pagos Futuros:</strong> {detallesPrestamo.pagos_futuros.length}</p>
          <p><strong>Total a Pagar:</strong> {detallesPrestamo.proximo_pago?.total_pago || "N/A"}</p>
          <p><strong>Fecha del Próximo Pago:</strong> {detallesPrestamo.proximo_pago?.fecha_pago || "N/A"}</p>
        </div>
      )}

      {/* Registrar comprobante general */}
      <div>
        <h3>Registrar Comprobante General</h3>
        <input
          type="text"
          name="codigoTransaccion"
          placeholder="Código de Transacción"
          value={comprobante.codigoTransaccion}
          onChange={(e) => handleInputChange(e, setComprobante)}
        />
        <input
          type="number"
          name="montoPagado"
          placeholder="Monto Pagado"
          value={comprobante.montoPagado}
          onChange={(e) => handleInputChange(e, setComprobante)}
        />
        <button onClick={registrarComprobanteGeneral}>Registrar Comprobante General</button>
      </div>

      {/* Registrar comprobante de cuota */}
      <div>
        <h3>Registrar Comprobante de Cuota</h3>
        <input
          type="text"
          placeholder="ID de Pago"
          value={pagoID}
          onChange={(e) => setPagoID(e.target.value)}
        />
        <input
          type="date"
          name="fechaPago"
          value={comprobanteCuota.fechaPago}
          onChange={(e) => handleInputChange(e, setComprobanteCuota)}
        />
        <input
          type="number"
          name="montoPagado"
          placeholder="Monto Pagado"
          value={comprobanteCuota.montoPagado}
          onChange={(e) => handleInputChange(e, setComprobanteCuota)}
        />
        <input
          type="text"
          name="codigoTransaccion"
          placeholder="Código de Transacción"
          value={comprobanteCuota.codigoTransaccion}
          onChange={(e) => handleInputChange(e, setComprobanteCuota)}
        />
        <button onClick={registrarComprobanteCuota}>Registrar Comprobante de Cuota</button>
      </div>
    </div>
  );
};

export default UsuarioDetalles;
