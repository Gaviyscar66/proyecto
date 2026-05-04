import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../firebase/sdkFirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editando, setEditando] = useState(false);

  const [bio, setBio] = useState("");
  const [foto, setFoto] = useState("");
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);

  const [fotos, setFotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario || !usuario.id) {
      navigate("/login");
      return;
    }

    // ?? traer usuario
    fetch(`https://backend-production-578d.up.railway.app/user/${usuario.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setBio(data.bio || "");
        setFoto(data.foto || "");
      })
      .catch(err => console.log("Error profile:", err));

    // ?? traer fotos (AQU� va, no en otro useEffect)
    fetch(`https://backend-production-578d.up.railway.app/fotos/${usuario.id}`)
      .then(res => res.json())
      .then(data => setFotos(data))
      .catch(err => console.log("Error fotos:", err));

  }, [usuario?.id, navigate]);

  if (!user) {
    return <p className="text-center mt-10">Cargando perfil...</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    let profileUrl = foto;

    if (selectedProfileFile) {
      setUploading(true);
      const storageRef = ref(storage, `profiles/${usuario.id}/${Date.now()}_${selectedProfileFile.name}`);
      await uploadBytes(storageRef, selectedProfileFile);
      profileUrl = await getDownloadURL(storageRef);
      setUploading(false);
    }

    try {
      await fetch(`https://backend-production-578d.up.railway.app/user/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ bio, foto: profileUrl })
      });

      const updatedUser = { ...user, bio, foto: profileUrl };

      setUser(updatedUser);
      localStorage.setItem("usuario", JSON.stringify(updatedUser));
      setEditando(false);
      setSelectedProfileFile(null);

    } catch (error) {
      console.log("Error actualizando:", error);
      setUploading(false);
    }
  };

  return (<>
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center z-50 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>

      <div className="flex gap-2">
        <Link to="/discover"
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          Salir
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
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            {user.nombre} {user.apellido}
          </h1>

          <p className="text-gray-600 text-center mb-6 max-w-sm leading-relaxed">
            {user.bio || "Sin biografia"}
          </p>

          <button
            onClick={() => setEditando(!editando)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            {editando ? "Cancelar edicion" : "Editar perfil"}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {editando && (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Editar informacion</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto de perfil</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedProfileFile(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {selectedProfileFile && <p className="text-sm text-gray-600 mt-1">{selectedProfileFile.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
              <textarea
                placeholder="Cuentanos sobre ti..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md disabled:cursor-not-allowed"
            >
              {uploading ? "Subiendo..." : "Guardar cambios"}
            </button>
          </form>
        </div>
      )}

      {/* Add Photo Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar foto</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!selectedFile) {
              alert("Selecciona una foto primero");
              return;
            }

            if (fotos.length >= 4) {
              alert("Solo puedes subir hasta 4 fotos");
              return;
            }

            setUploading(true);

            try {
              const storageRef = ref(storage, `photos/${usuario.id}/${Date.now()}_${selectedFile.name}`);
              await uploadBytes(storageRef, selectedFile);
              const downloadURL = await getDownloadURL(storageRef);

              await fetch("https://backend-production-578d.up.railway.app/fotos", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  user_id: usuario.id,
                  url: downloadURL
                })
              });

              setSelectedFile(null);

              const res = await fetch(`https://backend-production-578d.up.railway.app/fotos/${usuario.id}`);
              const data = await res.json();
              setFotos(data);
            } catch (error) {
              console.log("Error subiendo foto:", error);
            } finally {
              setUploading(false);
            }
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
          {selectedFile && <p className="text-sm text-gray-600">{selectedFile.name}</p>}

          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md whitespace-nowrap disabled:cursor-not-allowed"
          >
            {uploading ? "Subiendo..." : "Agregar"}
          </button>
        </form>
      </div>

      {/* Photos Gallery */}
      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Mis fotos</h3>
        {fotos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-500">Aun no has agregado fotos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fotos.map((f) => (
              <div key={f.id} className="relative group">
                <img
                  src={f.url}
                  className="w-full h-48 object-cover rounded-xl shadow-md transition-transform duration-200 group-hover:scale-105"
                />

                <button
                  onClick={async () => {
                    await fetch(
                      `https://backend-production-578d.up.railway.app/fotos/${f.id}/${usuario.id}`,
                      { method: "DELETE" }
                    );

                    // actualizar lista
                    const res = await fetch(
                      `https://backend-production-578d.up.railway.app/fotos/${usuario.id}`
                    );
                    const data = await res.json();
                    setFotos(data);
                  }}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                >
                  <span className="text-sm">?</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </>
  );
}
