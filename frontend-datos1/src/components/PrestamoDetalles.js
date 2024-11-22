import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PrestamoDetalles = () => {
  const { prestamo_id } = useParams(); // Obtener el ID del préstamo desde la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [prestamo, setPrestamo] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    monto_solicitado: "",
    porcentaje_interes: "",
    prestamo_iva: "",
    prestamo_cargos_administrativos: "",
  });

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/usuarios/prestamos/${prestamo_id}`);
        setPrestamo(response.data);
        setFormData({
          monto_solicitado: response.data.monto_solicitado,
          porcentaje_interes: response.data.porcentaje_interes,
          prestamo_iva: 0, // Asigna valores iniciales si no están en la respuesta
          prestamo_cargos_administrativos: 0,
        });
      } catch (err) {
        setError("No se pudieron cargar los detalles del préstamo.");
        console.error(err);
      }
    };
    fetchDetalles();
  }, [prestamo_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/usuarios/prestamos/${prestamo_id}`, formData);
      alert("Préstamo actualizado correctamente.");
    } catch (err) {
      alert("Error al actualizar el préstamo.");
      console.error(err);
    }
  };

  const handleApprove = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/usuarios/prestamos/${prestamo_id}/aprobar`);
      alert("Préstamo aprobado correctamente.");
    } catch (err) {
      alert("Error al aprobar el préstamo.");
      console.error(err);
    }
  };

  const handleDeny = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/usuarios/prestamos/${prestamo_id}/denegar`);
      alert("Préstamo denegado correctamente.");
    } catch (err) {
      alert("Error al denegar el préstamo.");
      console.error(err);
    }
  };

  // Función para volver atrás
  const goBack = () => {
    navigate(-1); // Vuelve a la página anterior en el historial de navegación
  };

  if (error) return <p>{error}</p>;
  if (!prestamo) return <p>Cargando detalles...</p>;

  return (
    <div>
      {/* Botón para volver atrás */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={goBack} style={styles.backButton}>Volver Atrás</button>
      </div>

      <h2>Detalles del Préstamo</h2>
      <p><strong>ID del Préstamo:</strong> {prestamo.prestamo_id}</p>
      <p><strong>Usuario ID:</strong> {prestamo.usuario_id}</p>
      <p><strong>Código del Préstamo:</strong> {prestamo.codigo_prestamo}</p>
      <p><strong>Monto Solicitado:</strong> {prestamo.monto_solicitado}</p>
      <p><strong>Cuotas Pactadas:</strong> {prestamo.cuotas_pactadas}</p>
      <p><strong>Porcentaje de Interés:</strong> {prestamo.porcentaje_interes}</p>
      
      <h3>Actualizar Préstamo</h3>
      <form>
        <label>
          Monto Solicitado:
          <input
            type="number"
            name="monto_solicitado"
            value={formData.monto_solicitado}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Porcentaje de Interés:
          <input
            type="number"
            name="porcentaje_interes"
            value={formData.porcentaje_interes}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Préstamo IVA:
          <input
            type="number"
            name="prestamo_iva"
            value={formData.prestamo_iva}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Préstamo Cargos Administrativos:
          <input
            type="number"
            name="prestamo_cargos_administrativos"
            value={formData.prestamo_cargos_administrativos}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdate}>Actualizar</button>
      </form>

      <h3>Acciones</h3>
      <button onClick={handleApprove}>Aprobar</button>
      <button onClick={handleDeny}>Denegar</button>
    </div>
  );
};

// Estilos para el botón de volver atrás (ahora igual a los demás botones)
const styles = {
  backButton: {
    backgroundColor: "#4CAF50", // Igual que los otros botones
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default PrestamoDetalles;
