import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [fotos, setFotos] = useState([]);
  

  const [fotoAmpliada, setFotoAmpliada] = useState(null);

  useEffect(() => {

    fetch(`https://backend-production-578d.up.railway.app/user/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log("Error user:", err));

    fetch(`https://backend-production-578d.up.railway.app/fotos/${id}`)
      .then(res => res.json())
      .then(data => setFotos(data))
      .catch(err => console.log("Error fotos:", err));

  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-500 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12 relative">
      
      {fotoAmpliada && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all"
          onClick={() => setFotoAmpliada(null)}
        >
          <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center text-2xl backdrop-blur-md">
            ✕
          </button>
          <img 
            src={fotoAmpliada} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-zoom-in"
            alt="Foto completa"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center z-50 border-b border-gray-100">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
          VirtualFriends
        </h1>
        <Link
          to="/discover"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2 rounded-full transition-colors duration-200"
        >
          Volver
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto pt-28 px-4">
       
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8 text-center">
          <div className="h-32 bg-gradient-to-r from-rose-400 to-purple-500"></div>
          
          <div className="px-6 pb-8 flex flex-col items-center -mt-16">
            <div className="relative">
              <img
                src={user.foto || "https://i.imgur.com/6VBx3io.png"}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-white cursor-pointer"
                alt="Perfil"
                onClick={() => setFotoAmpliada(user.foto)} 
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              {user.nombre} {user.apellido}
            </h1>

         

            <p className="text-gray-500 mt-4 max-w-sm leading-relaxed italic">
              "{user.bio || "Aun no ha agregado una biografia"}"
            </p>
          </div>
        </div>

        <div className="w-full">
          <h3 className="text-xl font-bold text-gray-800 mb-6 px-2">Fotos</h3>
          
          {fotos.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
              <p className="text-gray-400">Este usuario no ha subido fotos aún</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {fotos.map((f) => (
                <div key={f.id} className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                  <img
                    src={f.url}
                    onClick={() => setFotoAmpliada(f.url)} 
                    className="w-full h-48 sm:h-64 object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-300"
                    alt="Galería"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}