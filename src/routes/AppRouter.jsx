import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Register from "../page/Register";
import Login from "../page/Login";
import Navbar from "../components/Navbar";
import Chats from "../page/Chats";
import Discover from "../page/Discover";
import Profile from "../page/Profile";
import Nosotros from "../components/Nosotros";
import Productos from "../components/Productos";
import Seguridad from "../components/Seguridad";
import Home from "../page/Inicio";
import UserProfile from "../page/UserProfile";
import imagenPC from "../assets/fondopc.webp";
import imagenMovil from "../assets/fondotl.webp";
import LikesHistory from "../page/LikesHistory"; // Verifica que la ruta coincida con tus carpetas

// Subcomponente que maneja la lógica de fondos y rutas
function AppContent() {
  const location = useLocation();
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 Definimos qué páginas SÍ deben llevar la fogata de fondo
  const rutasConFondo = ["/", "/login", "/register"];
  const mostrarFondo = rutasConFondo.includes(location.pathname.toLowerCase());

  return (
    <div
      className="min-h-screen w-full relative transition-all duration-300"
      style={
        mostrarFondo
          ? {
              backgroundImage: `url(${esMovil ? imagenMovil : imagenPC})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              backgroundColor: "#111827", // bg-gray-900 de respaldo
            }
          : {
              backgroundColor: "#f9fafb", // bg-gray-50 limpio para el resto de la app
            }
      }
    >
      {/* Solo muestra la capa oscura si el fondo de la fogata está activo */}
      {mostrarFondo && (
        <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
      )}

      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* 🔥 LAS DOS RUTAS CLAVE PARA LOS CHATS */}
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id" element={<Chats />} /> {/* Chat individual */}

          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/seguridad" element={<Seguridad />} />
          <Route path="/user/:id" element={<UserProfile />} />
<Route path="/historial" element={<LikesHistory />} />        </Routes>
      </div>
    </div>
  );
}

// Componente principal que envuelve todo en el BrowserRouter
export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}