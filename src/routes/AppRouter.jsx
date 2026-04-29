import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import imagenPC from "../assets/fondo.jpg";
import imagenMovil from "../assets/telefono.jpg";

export default function AppRouter() {
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div
        className="min-h-screen w-full relative bg-gray-900"
        style={{
          backgroundImage: `url(${esMovil ? imagenMovil : imagenPC})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/seguridad" element={<Seguridad />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}