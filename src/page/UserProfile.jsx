import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    // ?? traer usuario
    fetch(`https://backend-production-578d.up.railway.app/user/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log("Error user:", err));

    // ?? traer fotos
    fetch(`https://backend-production-578d.up.railway.app/fotos/${id}`)
      .then(res => res.json())
      .then(data => setFotos(data))
      .catch(err => console.log("Error fotos:", err));

  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-lg text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center z-50 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>
        <div className="flex gap-2">
          <Link
            to="/discover"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            Volver
          </Link>
        </div>
      </nav>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pt-24 flex flex-col items-center">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mb-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <img
                src={user.foto || "https://i.imgur.com/6VBx3io.png"}
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              {user.nombre} {user.apellido}
            </h1>

            <p className="text-gray-500 mb-2 font-medium text-center">
              {user.ocupacion || "Sin ocupacimn"}
            </p>

            <p className="text-gray-600 text-center mb-6 max-w-sm leading-relaxed">
              {user.bio || "Aun no ha agregado una biografia"}
            </p>
          </div>
        </div>

        {/* Photos Gallery */}
        <div className="w-full max-w-4xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Fotos</h3>
          {fotos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
              <p className="text-gray-500">Este usuario no ha subido fotos aun</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {fotos.map((f) => (
                <div key={f.id} className="relative group">
                  <img
                    src={f.url}
                    className="w-full h-48 object-cover rounded-xl shadow-md transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
