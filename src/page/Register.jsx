import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { authGoogle } from "../firebase/authGoogle";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "", apellido: "", correo: "", cedula: "", contrasena: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://backend-production-578d.up.railway.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      alert(data);
      navigate("/login");

    } catch (error) {
      alert("Error al registrar");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent py-24 px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 max-w-xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Crea tu cuenta</h1>
          <p className="text-gray-600">Empieza a conocer gente nueva hoy mismo</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Juan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="Pérez" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="juan@ejemplo.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
            <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="12345678" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required minLength={6} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-rose-500 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-rose-600 shadow-lg active:scale-95 mt-4 transition-all">
            Registrarse
          </button>
        </form>
        <button onClick={authGoogle} className="w-full border border-white/20 rounded-xl py-3.5 font-bold text-lg bg-transparent backdrop-blur-md text-black hover:bg-white/10 shadow-lg active:scale-95 mt-4 transition-all duration-300 flex items-center justify-center gap-3">
          <FcGoogle className="text-2xl" />

          <span>Regístrate con Google</span>
        </button>

        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">
            ¿Ya tienes cuenta? <Link to="/login" className="text-rose-500 font-bold hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}