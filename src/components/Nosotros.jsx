import { Link } from "react-router-dom";

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-rose-500 px-8 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:opacity-90 transition-opacity">
            VirtualFriends
          </Link>
          <span className="text-white font-medium bg-yellow-500 px-3 py-1 rounded-lg text-sm">
            Nuestra Historia
          </span>
        </div>
      </nav>

      <section className="py-20 px-8 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Conectando corazones en un mundo digital 🌐
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            VirtualFriends nació en 2026 con una idea simple: nadie debería sentirse solo en la era de la hiperconectividad. 
            Somos un equipo apasionado por crear lazos reales a través de pantallas.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-rose-50 p-10 rounded-3xl border border-rose-100">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold text-rose-600 mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Facilitar un espacio seguro y divertido donde las personas puedan encontrar apoyo, 
            amistad y comunidad, sin importar las fronteras geográficas o las zonas horarias.
          </p>
        </div>

        <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100">
          <div className="text-4xl mb-4">🔮</div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Nuestra Visión</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Ser la plataforma líder mundial en relaciones humanas digitales, reconocida por nuestra 
            ética en el manejo de datos y por generar un impacto positivo en la salud mental de nuestros usuarios.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Valores que nos mueven</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="font-bold text-xl mb-2">Empatía</h3>
            <p className="text-gray-500">Entendemos que detrás de cada usuario hay una historia única.</p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-bold text-xl mb-2">Autenticidad</h3>
            <p className="text-gray-500">Fomentamos que cada persona sea su yo real, sin máscaras.</p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="font-bold text-xl mb-2">Transparencia</h3>
            <p className="text-gray-500">Claridad total en cómo cuidamos de ti y de tu información.</p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌈</div>
            <h3 className="font-bold text-xl mb-2">Inclusión</h3>
            <p className="text-gray-500">Un espacio para todos, sin distinción de ningún tipo.</p>
          </div>

        </div>
      </section>

      <section className="bg-gray-900 py-16 px-8 text-center text-white mt-10">
        <h2 className="text-3xl font-bold mb-6">¿Listo para empezar esta aventura?</h2>
        <Link 
          to="/Register" 
          className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all inline-block"
        >
          Únete a la familia
        </Link>
      </section>

      <footer className="py-10 text-center text-gray-400">
        VirtualFriends Team • Hecho con ❤️ en Colombia
      </footer>
    </div>
  );
}