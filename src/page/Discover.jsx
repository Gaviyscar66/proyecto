import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMessageCircle, FiUser, FiArrowLeft } from "react-icons/fi";

export default function Discover() {
  const [usuarios, setUsuarios] = useState([]);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

  const [datosMatch, setDatosMatch] = useState(null); 

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
        setDatosMatch({
          nombre: usuarios[index].nombre,
          foto: usuarios[index].foto
        });
      } else {
        avanzar();
      }

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

  const handleLike = async (para_usuario_id, foto_otra_persona, nombre_otra_persona) => {
    const res = await fetch("https://backend-production-578d.up.railway.app/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        de_usuario: usuario.id,
        para_usuario: para_usuario_id
      })
    });

    const data = await res.json();

    if (data.match) {
      setDatosMatch({
        nombre: nombre_otra_persona,
        foto: foto_otra_persona
      });
    }
  };

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
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center z-50 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>

        <div className="flex gap-2 items-center">
          <Link to="/chats"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center"
            title="Chats" 
          >
            <FiMessageCircle size={22} />
          </Link>

          <Link
            to="/profile"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center"
            title="Perfil" 
          >
            <FiUser size={22} />
          </Link>

          <button
            onClick={salir}
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium ml-2"
          >
            Salir
          </button>
        </div>
      </nav>

      <div className="min-h-screen flex justify-center items-center pt-24 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center transform transition-all duration-300 hover:scale-105">
          <div className="relative mb-6">
            <img
              src={perfil.foto || `https://picsum.photos/300?random=${perfil.id}`}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {perfil.nombre}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed max-w-sm mx-auto">
            {perfil.bio || "Sin biografia"}
          </p>

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

          <Link
            to={`/user/${perfil.id}`}
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Ver perfil
          </Link>
        </div>
      </div>
      {datosMatch && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-[40px] p-8 max-w-sm w-full shadow-2xl border border-rose-100 flex flex-col items-center text-center relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-rose-400 to-purple-500 opacity-20"></div>

            <h2 className="text-4xl font-black text-rose-500 mb-2 mt-8 tracking-tighter">
              ¡IT'S A MATCH!
            </h2>

            <p className="text-gray-600 mb-8 font-medium">
              Tú y <span className="text-purple-600 font-bold">{datosMatch.nombre}</span> se han gustado.
            </p>

            <div className="flex items-center justify-center -space-x-6 mb-10">
              <img
                src={usuario.foto || "https://i.imgur.com/6VBx3io.png"}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover rotate-[-5deg]"
                alt="Tu foto"
              />
              <img
                src={datosMatch.foto || "https://i.imgur.com/6VBx3io.png"}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover rotate-[5deg]"
                alt="Foto match"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => {
                  setDatosMatch(null);
                  navigate("/chats")
                }}
                className="bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform active:scale-95"
              >
                Enviar Mensaje
              </button>

              <button
                onClick={() => {
                  setDatosMatch(null);
                  avanzar();
                }}
                className="text-gray-400 font-semibold hover:text-gray-600 transition-colors py-2"
              >
                Seguir deslizando
              </button>
            </div>

            <div className="absolute top-10 left-10 text-2xl animate-bounce">❤️</div>
            <div className="absolute bottom-24 right-10 text-2xl animate-pulse">🔥</div>
          </div>
        </div>
      )}
    </div>
  );
}
