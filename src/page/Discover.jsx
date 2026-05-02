import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Discover() {
  const [usuarios, setUsuarios] = useState([]);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
 const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

  useEffect(() => {
  // 1. Verificación de seguridad
  if (!usuario || !usuario.id) {
    console.error("No hay ID de usuario. Redirigiendo...");
    navigate("/login");
    return;
  }

  // 2. Solo hacemos el fetch si el ID es válido
  fetch(`https://backend-production-578d.up.railway.app/feed/${usuario.id}`)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        setUsuarios([]);
      }
    })
    .catch(err => console.log("Error en feed:", err));
}, [usuario.id]); // Agrega el ID como dependencia

  const like = async () => {
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
      alert("🔥 IT'S A MATCH ❤️");
    }

    setIndex(index + 1);
  };

  const nope = async () => {
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

    setIndex(index + 1);
  };

  const salir = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  if (usuarios.length === 0 || index >= usuarios.length) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>

          <div className="flex gap-2">
            <button className="bg-gray-100 px-4 py-2 rounded-xl">💬</button>
            <button className="bg-gray-100 px-4 py-2 rounded-xl">👤</button>
            <button
              onClick={salir}
              className="bg-rose-500 text-white px-4 py-2 rounded-xl"
            >
              Salir
            </button>
          </div>
        </nav>

        <div className="min-h-screen flex justify-center items-center text-3xl pt-20">
          No hay perfiles
        </div>
      </div>
    );
  }

  const perfil = usuarios[index];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-4 py-4 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold text-rose-500">VirtualFriends</h1>

        <div className="flex gap-2">
          <button className="bg-gray-100 px-4 py-2 rounded-xl">💬</button>
          <Link to="/profile"  className="bg-gray-100 px-4 py-2 rounded-xl">👤</Link>
          <button
            onClick={salir}
            className="bg-rose-500 text-white px-4 py-2 rounded-xl"
          >
            Salir
          </button>
        </div>
      </nav>

      <div className="min-h-screen flex justify-center items-center pt-24 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-[350px] text-center">
          <h1 className="text-3xl font-bold mb-4">{perfil.nombre}</h1>

          <p className="text-gray-500 mb-6">{perfil.correo}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={nope}
              className="bg-red-500 text-white px-6 py-3 rounded-full"
            >
              Nope
            </button>

            <button
              onClick={like}
              className="bg-green-500 text-white px-6 py-3 rounded-full"
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}