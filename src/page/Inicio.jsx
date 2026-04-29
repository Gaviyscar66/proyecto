import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import imagenPC from "../assets/fondo.jpg"; 
import imagenMovil from "../assets/telefono.jpg"; 

export default function Home() {
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setEsMovil(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative bg-gray-900 transition-all duration-500"
      style={{
        backgroundImage: `url(${esMovil ? imagenMovil : imagenPC})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="text-center text-white relative z-10 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter drop-shadow-2xl">
          VirtualFriends
        </h1>
        <p className="text-lg md:text-2xl mb-12 max-w-sm md:max-w-lg mx-auto leading-relaxed">
          Conecta auténticamente. Conoce gente nueva hoy mismo.
        </p>
        <Link 
          to="/Register" 
          className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-rose-600 transition-all hover:scale-105 active:scale-95 shadow-2xl inline-block"
        >
          Crear Cuenta Gratis
        </Link>
      </div>
    </div>
  );
}