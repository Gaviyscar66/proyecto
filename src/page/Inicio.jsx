import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import imagenPC from "../assets/fondopc.webp"; 
import imagenMovil from "../assets/fondotl.webp"; 

export default function Home() {
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col justify-end items-center md:justify-center relative bg-gray-900 transition-all duration-500"
      style={{
        backgroundImage: `url(${esMovil ? imagenMovil : imagenPC})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-black/50 z-0"></div>
      
      <div className="relative z-10 px-8 pb-16 md:pb-0 text-center flex flex-col items-center justify-center min-h-screen md:min-h-0 translate-y-10 md:translate-y-0">
        
        <h1 className="text-5xl md:text-7xl font-black md:font-extrabold text-white mb-4 tracking-tight md:drop-shadow-2xl">
          VirtualFriends
        </h1>
        
        <p className="text-lg text-white md:text-2xl mb-12 max-w-sm md:max-w-lg mx-auto leading-relaxed md:block hidden">
          Conecta auténticamente. Conoce gente nueva hoy mismo.
        </p>
        
        <p className="text-[10px] text-gray-300 mb-8 max-w-xs md:hidden">
          Empieza a conocer gente nueva con gustos, hobbies y formas de ver la vida similares a las tuyas
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm md:max-w-none justify-center">
          <Link 
            to="/Register" 
            className="bg-white md:bg-rose-500 text-black md:text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all active:scale-95 shadow-xl"
          >
            Crear cuenta
          </Link>

          <Link 
            to="/login" 
            className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 md:hidden transition-all"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}