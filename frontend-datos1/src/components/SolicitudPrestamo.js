import './SolicitudPrestamo.css';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SolicitudPrestamo = () => {
  const [formData, setFormData] = useState({
    genero: "",
    cui: "",
    fecha_nacimiento: "",
    estado_civil: "",
    nacionalidad: "",
    primer_nombre: "",
    segundo_nombre: "",
    tercer_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    apellido_casada: "",
    ocupacion: "",
    direccion: {
      depto_nacimiento: "",
      muni_nacimiento: "",
      vecindad: "",
    },
    referencias: {
      referencia1: {
        primer_nombre: "",
        segundo_nombre: "",
        tercer_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
      },
      referencia2: {
        primer_nombre: "",
        segundo_nombre: "",
        tercer_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
      },
      referencia3: {
        primer_nombre: "",
        segundo_nombre: "",
        tercer_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
      },
      referencia4: {
        primer_nombre: "",
        segundo_nombre: "",
        tercer_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        telefono: "",
      },
    },
    monto_prestamo: "",
    motivo_prestamo: "",
    cuotas_pactadas: "",
  });

  const navigate = useNavigate(); // Hook para la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith("direccion.")) {
      const direccionKey = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        direccion: {
          ...prevState.direccion,
          [direccionKey]: value,
        },
      }));
    } else if (name.includes(".")) {
      const [ref, key] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        referencias: {
          ...prevState.referencias,
          [ref]: {
            ...prevState.referencias[ref],
            [key]: value,
          },
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/usuarios/prestamos/solicitud", formData);
      alert("Solicitud enviada exitosamente!");
      console.log(response.data);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Hubo un error al enviar la solicitud.");
    }
  };

  const goHome = () => {
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div>
      {/* Botón para regresar a la página principal */}
      <div style={styles.backButtonContainer}>
        <button onClick={goHome} style={styles.backButton}>Volver a la Página Principal</button>
      </div>

      <h2>Solicitud de Préstamo</h2>
      <form onSubmit={handleSubmit}>
        {/* Datos del cliente */}
        <label>Género:</label>
        <input name="genero" value={formData.genero} onChange={handleChange} required />
        <label>CUI:</label>
        <input name="cui" value={formData.cui} onChange={handleChange} required />
        <label>Fecha de nacimiento:</label>
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
        <label>Estado civil:</label>
        <input name="estado_civil" value={formData.estado_civil} onChange={handleChange} required />
        <label>Nacionalidad:</label>
        <input name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required />
        <label>Primer nombre:</label>
        <input name="primer_nombre" value={formData.primer_nombre} onChange={handleChange} required />
        <label>Segundo nombre:</label>
        <input name="segundo_nombre" value={formData.segundo_nombre} onChange={handleChange} />
        <label>Tercer nombre:</label>
        <input name="tercer_nombre" value={formData.tercer_nombre} onChange={handleChange} />
        <label>Primer apellido:</label>
        <input name="primer_apellido" value={formData.primer_apellido} onChange={handleChange} required />
        <label>Segundo apellido:</label>
        <input name="segundo_apellido" value={formData.segundo_apellido} onChange={handleChange} />
        <label>Apellido de casada:</label>
        <input name="apellido_casada" value={formData.apellido_casada} onChange={handleChange} />
        <label>Ocupación:</label>
        <input name="ocupacion" value={formData.ocupacion} onChange={handleChange} required />

        {/* Dirección */}
        <h3>Dirección</h3>
        <label>Departamento de nacimiento:</label>
        <input name="direccion.depto_nacimiento" value={formData.direccion.depto_nacimiento} onChange={handleChange} required />
        <label>Municipio de nacimiento:</label>
        <input name="direccion.muni_nacimiento" value={formData.direccion.muni_nacimiento} onChange={handleChange} required />
        <label>Vecindad:</label>
        <input name="direccion.vecindad" value={formData.direccion.vecindad} onChange={handleChange} required />

        {/* Referencias */}
        <h3>Referencias</h3>
{["referencia1", "referencia2", "referencia3", "referencia4"].map((ref) => (
  <div key={ref}>
    <h4>{ref}</h4>
    <label>Primer nombre:</label>
    <input 
      name={`${ref}.primer_nombre`} 
      value={formData.referencias[ref].primer_nombre} 
      onChange={handleChange} 
      required={ref === "referencia1" || ref === "referencia2"} 
    />
    <label>Segundo nombre:</label>
    <input 
      name={`${ref}.segundo_nombre`} 
      value={formData.referencias[ref].segundo_nombre} 
      onChange={handleChange} 
    />
    <label>Tercer nombre:</label>
    <input 
      name={`${ref}.tercer_nombre`} 
      value={formData.referencias[ref].tercer_nombre} 
      onChange={handleChange} 
    />
    <label>Primer apellido:</label>
    <input 
      name={`${ref}.primer_apellido`} 
      value={formData.referencias[ref].primer_apellido} 
      onChange={handleChange} 
      required={ref === "referencia1" || ref === "referencia2"} 
    />
    <label>Segundo apellido:</label>
    <input 
      name={`${ref}.segundo_apellido`} 
      value={formData.referencias[ref].segundo_apellido} 
      onChange={handleChange} 
    />
    <label>Teléfono:</label>
    <input 
      name={`${ref}.telefono`} 
      value={formData.referencias[ref].telefono} 
      onChange={handleChange} 
      required={ref === "referencia1" || ref === "referencia2"} 
    />
  </div>
))}


        {/* Datos del préstamo */}
        <h3>Datos del Préstamo</h3>
        <label>Monto solicitado:</label>
        <input type="number" name="monto_prestamo" value={formData.monto_prestamo} onChange={handleChange} required />
        <label>Motivo del préstamo:</label>
        <input name="motivo_prestamo" value={formData.motivo_prestamo} onChange={handleChange} required />
        <label>Cuotas pactadas:</label>
        <input type="number" name="cuotas_pactadas" value={formData.cuotas_pactadas} onChange={handleChange} required />

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

// Estilos para el botón de regreso
const styles = {
  backButtonContainer: {
    marginBottom: "20px",
    marginLeft: "10px", // Lo coloca hacia la izquierda
  },
  backButton: {
    backgroundColor: "#4CAF50", // Color verde como los otros botones
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SolicitudPrestamo;
