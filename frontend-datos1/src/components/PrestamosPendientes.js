import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Barra de navegación
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/gestion-pagos" style={styles.navLink}>Gestión de Pagos</Link>
        </li>
        {/* Puedes agregar más enlaces aquí */}
      </ul>
    </nav>
  );
};

const PrestamosPendientes = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const fetchPrestamosPendientes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/usuarios/prestamos/pendientes");
        setPrestamos(response.data);
      } catch (err) {
        setError("No se pudieron cargar los préstamos pendientes.");
        console.error(err);
      }
    };
    fetchPrestamosPendientes();
  }, []);

  const goHome = () => {
    navigate("/"); // Redirige a la página principal
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Botón para regresar a la página principal */}
      <div style={styles.backButtonContainer}>
        <button onClick={goHome} style={styles.backButton}>Volver a la Página Principal</button>
      </div>

      {/* Barra de navegación arriba */}
      <Navbar />

      <h2>Préstamos Pendientes</h2>
      {prestamos.length === 0 ? (
        <p>No hay préstamos pendientes.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario ID</th>
              <th>Monto Solicitado</th>
              <th>Cuotas Pactadas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((prestamo) => (
              <tr key={prestamo.prestamo_id}>
                <td>{prestamo.prestamo_id}</td>
                <td>{prestamo.usuario_id}</td>
                <td>{prestamo.monto_solicitado}</td>
                <td>{prestamo.cuotas_pactadas}</td>
                <td>
                  <button>
                    <Link to={`/prestamos/${prestamo.prestamo_id}`}>Ver Detalles</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Estilos para los elementos
const styles = {
  navbar: {
    backgroundColor: "#4a90e2",
    padding: "10px 0",
    textAlign: "center",
  },
  navList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
  },
  navItem: {
    margin: "0 15px",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.2em",
    fontWeight: "bold",
  },
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

export default PrestamosPendientes;
