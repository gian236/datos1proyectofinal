import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SolicitudPrestamo from "./components/SolicitudPrestamo";
import PrestamosPendientes from "./components/PrestamosPendientes";
import PrestamoDetalles from "./components/PrestamoDetalles";
import UsuarioDetalles from "./components/UsuarioDetalles";
import GestionPagos from "./components/GestionPagos";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Mi Préstamo S.A.</h1>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/solicitud-prestamo" element={<SolicitudPrestamo />} />
          <Route path="/prestamos-pendientes" element={<PrestamosPendientes />} />
          <Route path="/prestamos/:prestamo_id" element={<PrestamoDetalles />} />
          <Route path="/usuario-detalles" element={<UsuarioDetalles />} />
          <Route path="/gestion-pagos" element={<GestionPagos />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
