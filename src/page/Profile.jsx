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

    fetch(`https://backend-production-578d.up.railway.app/user/${usuario.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setBio(data.bio || "");
        setFoto(data.foto || "");
      });

    fetch(`https://backend-production-578d.up.railway.app/fotos/${usuario.id}`)
      .then(res => res.json())
      .then(data => setFotos(data));

  }, [usuario?.id, navigate]);

  if (!user) {
    return <p className="text-center mt-10">Cargando perfil...</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    let profileUrl = foto;

    if (selectedProfileFile) {

      if (!selectedProfileFile.type.startsWith("image/")) {
        alert("Solo puedes subir imágenes");
        return;
      }

      if (selectedProfileFile.size > 5 * 1024 * 1024) {
        alert("Máximo 5MB");
        return;
      }

      setUploading(true);

      const storageRef = ref(storage, `profiles/${usuario.id}/${Date.now()}_${selectedProfileFile.name}`);
      await uploadBytes(storageRef, selectedProfileFile);
      profileUrl = await getDownloadURL(storageRef);

      setUploading(false);
    }

    await fetch(`https://backend-production-578d.up.railway.app/user/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, foto: profileUrl })
    });

    const updatedUser = { ...user, bio, foto: profileUrl };
    setUser(updatedUser);
    localStorage.setItem("usuario", JSON.stringify(updatedUser));
    setEditando(false);
    setSelectedProfileFile(null);
  };

  return (
    <>
      {/* 🔥 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center z-50 border-b">
        <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>

        <div className="flex gap-2">
          <Link
            to="/discover"
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
          >
            🔥 Feed
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("usuario");
              navigate("/login");
            }}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-100 p-6 pt-24 flex flex-col items-center">

        {/* PERFIL */}
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-md text-center">
          <img
            src={user.foto || "https://i.imgur.com/6VBx3io.png"}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
          />

          <h1 className="text-xl font-bold">
            {user.nombre} {user.apellido}
          </h1>

          <p className="text-gray-600 mb-4">
            {user.bio || "Sin bio"}
          </p>

          <button
            onClick={() => setEditando(!editando)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editando ? "Cancelar" : "Editar"}
          </button>
        </div>

        {/* EDITAR */}
        {editando && (
          <form onSubmit={handleUpdate} className="bg-white p-4 mt-4 rounded w-full max-w-md">

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedProfileFile(e.target.files[0])}
            />

            {/* 🔥 PREVIEW PERFIL */}
            {selectedProfileFile && (
              <img
                src={URL.createObjectURL(selectedProfileFile)}
                className="w-24 h-24 rounded-full mt-2"
              />
            )}

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border p-2 mt-2"
            />

            <button className="bg-green-500 text-white p-2 mt-2 w-full">
              {uploading ? "Subiendo..." : "Guardar"}
            </button>
          </form>
        )}

        {/* AGREGAR FOTO */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!selectedFile) return alert("Selecciona una imagen");

            if (!selectedFile.type.startsWith("image/")) {
              return alert("Solo imágenes");
            }

            if (selectedFile.size > 5 * 1024 * 1024) {
              return alert("Máximo 5MB");
            }

            if (fotos.length >= 4) {
              return alert("Máximo 4 fotos");
            }

            setUploading(true);

            const storageRef = ref(storage, `photos/${usuario.id}/${Date.now()}_${selectedFile.name}`);
            await uploadBytes(storageRef, selectedFile);
            const url = await getDownloadURL(storageRef);

            await fetch("https://backend-production-578d.up.railway.app/fotos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: usuario.id,
                url
              })
            });

            setSelectedFile(null);

            const res = await fetch(`https://backend-production-578d.up.railway.app/fotos/${usuario.id}`);
            setFotos(await res.json());

            setUploading(false);
          }}
          className="bg-white p-4 mt-4 rounded w-full max-w-md"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          {/* 🔥 PREVIEW FOTO */}
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full h-40 object-cover mt-2 rounded"
            />
          )}

          <button className="bg-purple-500 text-white p-2 mt-2 w-full">
            {uploading ? "Subiendo..." : "Agregar foto"}
          </button>
        </form>

        {/* GALERÍA */}
        <div className="grid grid-cols-2 gap-2 mt-4 w-full max-w-md">
          {fotos.map((f) => (
            <div key={f.id} className="relative">
              <img
                src={f.url}
                className="w-full h-32 object-cover rounded"
              />

              <button
                onClick={async () => {
                  await fetch(
                    `https://backend-production-578d.up.railway.app/fotos/${f.id}/${usuario.id}`,
                    { method: "DELETE" }
                  );

                  const res = await fetch(
                    `https://backend-production-578d.up.railway.app/fotos/${usuario.id}`
                  );
                  setFotos(await res.json());
                }}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
              >
                ❌
              </button>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}