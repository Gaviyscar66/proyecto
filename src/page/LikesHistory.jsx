import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHeart } from "react-icons/fi";

export default function LikesHistory() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [enviados, setEnviados] = useState([]);
  const [recibidos, setRecibidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pestañaActiva, setPestañaActiva] = useState("recibidos"); // "recibidos" o "enviados"

  useEffect(() => {
    if (!usuario || !usuario.id) {
      navigate("/login");
      return;
    }

    fetch(`https://backend-production-578d.up.railway.app/likes-historial/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => {
        setEnviados(data.enviados || []);
        setRecibidos(data.recibidos || []);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al traer historial de likes:", err);
        setCargando(false);
      });
  }, [usuario?.id, navigate]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-500"></div>
      </div>
    );
  }

  // Decidir qué lista mostrar según la pestaña activa
  const listaMostrar = pestañaActiva === "recibidos" ? recibidos : enviados;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center z-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link to="/discover" className="text-gray-500 hover:text-rose-500 transition-colors">
            <FiArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            Historial de Likes
          </h1>
        </div>
      </nav>

      <div className="max-w-md mx-auto pt-24 px-4">
        {/* INTERRUPTOR DE PESTAÑAS (TABS) */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-6 shadow-inner">
          <button
            onClick={() => setPestañaActiva("recibidos")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
              pestañaActiva === "recibidos"
                ? "bg-white text-rose-500 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Les gustas ({recibidos.length})
          </button>
          <button
            onClick={() => setPestañaActiva("enviados")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
              pestañaActiva === "enviados"
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Tus Likes ({enviados.length})
          </button>
        </div>

        {/* LISTADO */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          {listaMostrar.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-4 animate-pulse">
                <FiHeart size={28} />
              </div>
              <p className="text-gray-500 font-medium">
                {pestañaActiva === "recibidos"
                  ? "Nadie te ha dado like todavía"
                  : "No has dado ningún Like aún"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                ¡Sigue explorando perfiles en el feed!
              </p>
              <Link
                to="/discover"
                className="mt-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold px-6 py-2.5 rounded-full shadow-md"
              >
                Volver al Feed
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {listaMostrar.map((item) => (
                <Link
                  key={item.id}
                  to={`/user/${item.id}`} // Te manda a ver su perfil para que puedas darle Like de vuelta
                  className="flex items-center gap-4 py-4 hover:bg-gray-50 px-2 rounded-2xl transition-colors group"
                >
                  <img
                    src={item.foto || "https://i.imgur.com/6VBx3io.png"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://i.imgur.com/6VBx3io.png";
                    }}
                    className="w-14 h-14 rounded-full object-cover border border-gray-100 shadow-sm bg-gray-100"
                    alt={item.nombre}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-rose-500 transition-colors">
                      {item.nombre}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {item.ocupacion || "Explorador"}
                    </p>
                  </div>
                  {/* Iconito decorativo */}
                  <div className={`p-2.5 rounded-full ${
                    pestañaActiva === "recibidos" ? "bg-rose-50 text-rose-500" : "bg-purple-50 text-purple-500"
                  }`}>
                    <FiHeart size={18} fill="currentColor" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}