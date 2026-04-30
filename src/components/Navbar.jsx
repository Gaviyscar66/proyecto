import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const rutasConNavbar = ["/", "/login", "/Register"];
  const isNavbarVisible = rutasConNavbar.includes(location.pathname);

  if (!isNavbarVisible) return null;

  return (
    <nav className="bg-transparent px-6 md:px-8 py-4 w-full relative z-[100]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-tight drop-shadow-md z-[110]">
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
          className="hidden md:block bg-white text-rose-500 px-6 py-2 rounded-full font-semibold hover:bg-rose-50 transition-all shadow-lg"
        >
          Iniciar Sesion
        </Link>

        <button 
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-white focus:outline-none z-[110]"
        >
          {menuAbierto ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (

            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      <div className={`
        fixed inset-0 bg-black/95 backdrop-blur-md transition-transform duration-300 md:hidden
        flex flex-col items-center justify-center gap-8
        ${menuAbierto ? "translate-x-0" : "translate-x-full"}
      `}>
        <Link 
          to="/productos" 
          onClick={() => setMenuAbierto(false)}
          className="text-white text-xl font-medium hover:text-rose-400"
        >
          Nuestros Productos
        </Link>
        <Link 
          to="/nosotros" 
          onClick={() => setMenuAbierto(false)}
          className="text-white text-xl font-medium hover:text-rose-400"
        >
          Sobre Nosotros
        </Link>
        <Link 
          to="/seguridad" 
          onClick={() => setMenuAbierto(false)}
          className="text-white text-xl font-medium hover:text-rose-400"
        >
          Seguridad
        </Link>
        <Link 
          to="/login" 
          onClick={() => setMenuAbierto(false)}
          className="mt-4 bg-rose-500 text-white px-8 py-3 rounded-full font-bold text-lg hidden md:block"
        >
          Iniciar Sesion
        </Link>
      </div>
    </nav>
  );
}