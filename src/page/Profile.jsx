import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editando, setEditando] = useState(false);

  const [bio, setBio] = useState("");
  const [foto, setFoto] = useState("");

  const [fotos, setFotos] = useState([]);
  const [nuevaFoto, setNuevaFoto] = useState("");

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

    await fetch(`https://backend-production-578d.up.railway.app/user/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, foto })
    });

    const updatedUser = { ...user, bio, foto };
    setUser(updatedUser);
    localStorage.setItem("usuario", JSON.stringify(updatedUser));
    setEditando(false);
  };

  return (
    <>
      {/* 🔥 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold text-rose-500">VirtualFriends</h1>

        <div className="flex gap-2">
          <Link
            to="/discover"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Feed
          </Link>

        </div>
      </nav>

      <div className="min-h-screen bg-gray-100 p-6 pt-24 flex flex-col items-center">

        {/* PERFIL */}
        <img
          src={user.foto || "https://i.imgur.com/6VBx3io.png"}
          className="w-40 h-40 rounded-full object-cover mb-4"
        />

        <h1 className="text-2xl font-bold mb-2">
          {user.nombre} {user.apellido}
        </h1>

        <p className="text-gray-600 mb-4 text-center">
          {user.bio || "Sin biografía"}
        </p>

        <button
          onClick={() => setEditando(!editando)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {editando ? "Cancelar" : "Editar perfil"}
        </button>

        {/* EDITAR PERFIL */}
        {editando && (
          <form onSubmit={handleUpdate} className="flex flex-col gap-3 w-full max-w-md">

            <input
              type="text"
              placeholder="URL de foto de perfil"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="p-2 border rounded"
            />

            <textarea
              placeholder="Escribe tu bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="p-2 border rounded"
            />

            <button className="bg-green-500 text-white p-2 rounded">
              Guardar cambios
            </button>
          </form>
        )}

        {/* AGREGAR FOTO */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!nuevaFoto) {
              alert("Pon una URL");
              return;
            }

            if (fotos.length >= 4) {
              alert("Solo puedes subir 4 fotos");
              return;
            }

            await fetch("https://backend-production-578d.up.railway.app/fotos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: usuario.id,
                url: nuevaFoto
              })
            });

            setNuevaFoto("");

            const res = await fetch(
              `https://backend-production-578d.up.railway.app/fotos/${usuario.id}`
            );
            const data = await res.json();
            setFotos(data);
          }}
          className="flex flex-col gap-3 mt-4"
        >
          <input
            type="text"
            placeholder="URL de la foto"
            value={nuevaFoto}
            onChange={(e) => setNuevaFoto(e.target.value)}
            className="p-2 border rounded"
          />

          <button className="bg-purple-500 text-white p-2 rounded">
            Agregar foto
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
                  const data = await res.json();
                  setFotos(data);
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