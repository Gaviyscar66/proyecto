import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMessageCircle, FiUser, FiArrowLeft } from "react-icons/fi";

// ... el resto de tu código
export default function Discover() {
  const [usuarios, setUsuarios] = useState([]);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

  useEffect(() => {
    if (!usuario || !usuario.id) {
      navigate("/login");
      return;
    }

    fetch(`https://backend-production-578d.up.railway.app/feed/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          setUsuarios([]);
        }
      })
      .catch((err) => console.log("Error en feed:", err));
  }, [usuario.id, navigate]);

  const avanzar = () => {
    setIndex((prev) => prev + 1);
  };

  const like = async () => {
    if (!usuarios[index]) return;

    try {
      const res = await fetch("https://backend-production-578d.up.railway.app/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          de_usuario: usuario.id,
          para_usuario: usuarios[index].id
        })
      });

      const data = await res.json();

      if (data.match) {
        alert("?? IT'S A MATCH ??");
      }

      avanzar();

    } catch (error) {
      console.log("Error en like:", error);
    }
  };

  const nope = async () => {
    if (!usuarios[index]) return;

    try {
      await fetch("https://backend-production-578d.up.railway.app/nope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          de_usuario: usuario.id,
          para_usuario: usuarios[index].id
        })
      });

      avanzar();

    } catch (error) {
      console.log("Error en nope:", error);
    }
  };

  const back = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const salir = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // ?? CASO: no hay usuarios en absoluto
  if (usuarios.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <nav className="fixed top-0 left-0 w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center z-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>
          <div className="flex gap-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">??</button>
            <Link to="/profile" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">??</Link>
            <button
              onClick={salir}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              Salir
            </button>
          </div>
        </nav>
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full mt-24">
          <p className="text-xl text-gray-600 mb-6">No hay perfiles disponibles en este momento</p>
          <p className="text-gray-500">Intentalo mas tarde o invita a tus amigos a unirse.</p>
        </div>
      </div>
    );
  }

  // ?? CASO: llegaste al final
  if (index >= usuarios.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
        <nav className="fixed top-0 left-0 w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center z-50 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>
          <div className="flex gap-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">??</button>
            <Link to="/profile" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">??</Link>
            <button
              onClick={salir}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              Salir
            </button>
          </div>
        </nav>
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full mt-24">
          <p className="text-2xl font-semibold text-gray-700 mb-6">No hay mas perfiles ??</p>
          <button
            onClick={() => setIndex(0)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const perfil = usuarios[index];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center z-50 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>

        <div className="flex gap-2 items-center">
          {/* Botón de Chats con icono */}
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center"
            title="Chats" // Añadido title para accesibilidad
          >
            <FiMessageCircle size={22} />
          </button>

          {/* Enlace de Perfil con icono */}
          <Link
            to="/profile"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center"
            title="Perfil" // Añadido title para accesibilidad
          >
            <FiUser size={22} />
          </Link>

          {/* Botón de Salir (se le agregó ml-2 para darle un poco de separación visual) */}
          <button
            onClick={salir}
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium ml-2"
          >
            Salir
          </button>
        </div>
      </nav>

      {/* CARD */}
      <div className="min-h-screen flex justify-center items-center pt-24 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform transition-all duration-300 hover:scale-105">
          <div className="relative mb-6">
            <img
              src={perfil.foto || `https://picsum.photos/300?random=${perfil.id}`}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {perfil.nombre}
          </h1>

          <p className="text-gray-500 mb-2 font-medium">
            {perfil.ocupacion || "Sin ocupacion"}
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed max-w-sm mx-auto">
            {perfil.bio || "Sin biografia"}
          </p>

          {/* BOTONES */}
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={back}
              disabled={index === 0}
              className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-full font-medium transition-all duration-200 transform hover:scale-110 shadow-md"
            >
              <FiArrowLeft size={22} />
            </button>

            <button
              onClick={nope}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-200 transform hover:scale-110 shadow-md"
            >
              Nope
            </button>

            <button
              onClick={like}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-200 transform hover:scale-110 shadow-md"
            >
              Like
            </button>
          </div>

          {/* VER PERFIL */}
          <Link
            to={`/user/${perfil.id}`}
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
