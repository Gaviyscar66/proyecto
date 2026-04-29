import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const rutasConNavbar = ["/", "/login", "/Register"];
  const isNavbarVisible = rutasConNavbar.includes(location.pathname);

  if (!isNavbarVisible) return null;
  return (
    <nav className="bg-transparent px-8 py-4 w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
          VirtualFriends
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/productos" className="text-white font-medium hover:text-rose-200 transition-colors drop-shadow-md">
            Nuestros Productos
          </Link>
          <Link to="/nosotros" className="text-white font-medium hover:text-rose-200 transition-colors drop-shadow-md">
            Sobre Nosotros
          </Link>
          <Link to="/seguridad" className="text-white font-medium hover:text-rose-200 transition-colors drop-shadow-md">
            Seguridad
          </Link>
        </div>

        <Link
          to="/login"
          className="bg-white text-rose-500 px-6 py-2 rounded-full font-semibold hover:bg-rose-50 transition-all shadow-lg"
        >
          Iniciar Sesion
        </Link>
      </div>
    </nav>
  );
}