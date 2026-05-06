import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiSend, FiArrowLeft, FiMessageSquare } from "react-icons/fi";

export default function Chats() {
  const { id: receptorId } = useParams();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [matches, setMatches] = useState([]);
  const [cargandoLista, setCargandoLista] = useState(true);

  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [otroUsuario, setOtroUsuario] = useState(null);
  
  const scrollRef = useRef();

  useEffect(() => {
    if (!usuario || !usuario.id) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  useEffect(() => {
    if (receptorId) return; 

    fetch(`https://backend-production-578d.up.railway.app/matches/${usuario?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setCargandoLista(false);
      })
      .catch((err) => {
        console.error("Error al traer matches:", err);
        setCargandoLista(false);
      });
  }, [receptorId, usuario?.id]);

  useEffect(() => {
    if (!receptorId) return; 

    fetch(`https://backend-production-578d.up.railway.app/user/${receptorId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al traer usuario");
        return res.json();
      })
      .then((data) => setOtroUsuario(data))
      .catch((err) => console.error("Error:", err));

    const cargarMensajes = () => {
      fetch(`https://backend-production-578d.up.railway.app/mensajes/${usuario?.id}/${receptorId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al traer mensajes");
          return res.json();
        })
        .then((data) => setMensajes(data))
        .catch((err) => console.error("Error:", err));
    };

    cargarMensajes();
    const intervalo = setInterval(cargarMensajes, 3000);
    
    return () => clearInterval(intervalo);
  }, [receptorId, usuario?.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviarMsg = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    const msgData = {
      de_id: usuario.id,
      para_id: receptorId,
      contenido: nuevoMensaje
    };

    await fetch("https://backend-production-578d.up.railway.app/mensajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msgData)
    });

    setNuevoMensaje("");
    setMensajes([...mensajes, { ...msgData, id: Date.now(), fecha: new Date() }]);
  };

  
  if (!receptorId) {
    if (cargandoLista) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-500"></div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12">
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center z-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Link to="/discover" className="text-gray-500 hover:text-rose-500 transition-colors">
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Mis Chats
            </h1>
          </div>
        </nav>

        <div className="max-w-md mx-auto pt-24 px-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Conversaciones Activas</h2>

            {matches.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-4">
                  <FiMessageSquare size={28} />
                </div>
                <p className="text-gray-500 font-medium">Aún no tienes chats activos</p>
                <p className="text-sm text-gray-400 mt-1">¡Sigue deslizando para conseguir matches!</p>
                <Link to="/discover" className="mt-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold px-6 py-2.5 rounded-full shadow-md">
                  Ir a buscar matches
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {matches.map((m) => (
                  <Link
                    key={m.id}
                    to={`/chats/${m.id}`}
                    className="flex items-center gap-4 py-4 hover:bg-gray-50 px-2 rounded-2xl transition-colors group"
                  >
                    <img
                      src={m.foto || "https://i.imgur.com/6VBx3io.png"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.imgur.com/6VBx3io.png";
                      }}
                      className="w-14 h-14 rounded-full object-cover border border-gray-100 shadow-sm bg-gray-100"
                      alt={m.nombre}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-rose-500 transition-colors">
                        {m.nombre}
                      </h3>
                      <p className="text-xs text-gray-400">Haz clic para chatear</p>
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

  if (!otroUsuario) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-white shadow-sm px-6 py-4 flex items-center gap-4 z-10 border-b border-gray-100">
        <Link to="/chats" className="text-gray-500 hover:text-rose-500 transition-colors">
          <FiArrowLeft size={24} />
        </Link>
        <img 
          src={otroUsuario.foto || "https://i.imgur.com/6VBx3io.png"} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://i.imgur.com/6VBx3io.png";
          }}
          className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-gray-100" 
          alt="Avatar"
        />
        <div>
          <h2 className="font-bold text-gray-800 leading-tight">{otroUsuario.nombre}</h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pt-24 pb-24 px-4 space-y-4">
        {mensajes.map((m) => {
          const soyYo = m.de_id === usuario.id;
          return (
            <div key={m.id} className={`flex ${soyYo ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                soyYo 
                ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-br-none" 
                : "bg-white text-gray-700 border border-gray-100 rounded-bl-none"
              }`}>
                {m.contenido}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <footer className="fixed bottom-0 w-full bg-white p-4 border-t border-gray-100">
        <form onSubmit={enviarMsg} className="max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 focus:ring-2 focus:ring-rose-400 outline-none transition-all text-sm"
          />
          <button 
            type="submit"
            className="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full shadow-md transform active:scale-90 transition-all"
          >
            <FiSend size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
}