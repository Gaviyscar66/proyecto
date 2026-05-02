import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authGoogle } from "../firebase/authGoogle";


export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: "",
    contrasena: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("https://backend-production-578d.up.railway.app/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("usuario", JSON.stringify(data));
    navigate("/discover");
  } else {
    alert(data);
  }
};

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-20">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 max-w-md w-full mx-4">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Bienvenido de vuelta
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Inicia sesión en tu cuenta
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>

            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              placeholder="tunombre@ejemplo.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>

            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-rose-500"
              />
              <span className="text-gray-600">Recordarme</span>
            </label>

            <Link
              to="#"
              className="text-rose-500 font-semibold hover:underline text-center sm:text-right"
            >
              ¿Olvidaste tu contraseña?
            </Link>

          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-rose-600 shadow-lg active:scale-95 transition-all mt-6"
          >
            Iniciar Sesión
          </button>
        </form>


        <button onClick={authGoogle} className="w-full border border-white/20 rounded-xl py-3.5 font-bold text-lg bg-transparent backdrop-blur-md text-black hover:bg-white/10 shadow-lg active:scale-95 mt-4 transition-all duration-300 flex items-center justify-center gap-3">
          <FcGoogle className="text-2xl" />

          <span>Inicia sesion con Google</span>
        </button>

        <p className="text-center text-gray-600 mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/Register"
            className="text-rose-500 font-semibold hover:underline"
          >
            Regístrate gratis
          </Link>
        </p>

      </div>
    </div>
  );
}