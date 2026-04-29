import { Link } from "react-router-dom";

export default function Productos() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-green-500 px-8 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:opacity-90 transition-opacity">
            VirtualFriends
          </Link>
          <span className="text-white font-medium bg-blue-600 px-3 py-1 rounded-lg text-sm">
            Planes Premium
          </span>
        </div>
      </nav>

      <header className="py-16 px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Lleva tus conexiones al siguiente nivel 🚀</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tu ritmo. Conoce gente nueva sin límites y con funciones exclusivas.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-200 flex flex-col hover:scale-105 transition-transform">
          <div className="text-center mb-6">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">Básico</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Plan Bronce</h2>
            <div className="mt-4">
              <span className="text-4xl font-bold">$9.900</span>
              <span className="text-gray-500">/mes</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center text-gray-600">✅ <strong>Likes ilimitados</strong> (adiós al límite diario)</li>
            <li className="flex items-center text-gray-600">✅ 5 "Super Match" por semana</li>
            <li className="flex items-center text-gray-600">✅ Sin anuncios molestos</li>
            <li className="flex items-center text-gray-400 italic text-sm">❌ Sin cambio de ubicación</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-orange-100 text-orange-700 font-bold hover:bg-orange-200 transition-colors">
            Elegir Bronce
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-blue-400 flex flex-col relative scale-110 z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            MÁS POPULAR
          </div>
          <div className="text-center mb-6">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Intermedio</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Plan Plata</h2>
            <div className="mt-4">
              <span className="text-4xl font-bold">$24.900</span>
              <span className="text-gray-500">/mes</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center text-gray-600">✅ Todo lo del Plan Bronce</li>
            <li className="flex items-center text-gray-600">✅ <strong>Modo Viajero:</strong> Conoce gente de todo el país</li>
            <li className="flex items-center text-gray-600">✅ Ver quién te dio Like antes de decidir</li>
            <li className="flex items-center text-gray-600">✅ Rewind ilimitado (vuelve al perfil anterior)</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 shadow-md transition-colors">
            Elegir Plata
          </button>
        </div>

        <div className="bg-gray-900 p-8 rounded-3xl shadow-sm border border-yellow-500 flex flex-col hover:scale-105 transition-transform text-white">
          <div className="text-center mb-6">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-sm">Premium</span>
            <h2 className="text-3xl font-bold mt-2">Plan Oro</h2>
            <div className="mt-4">
              <span className="text-4xl font-bold text-yellow-400">$49.900</span>
              <span className="text-gray-400">/mes</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center text-gray-300">✨ Todo lo del Plan Plata</li>
            <li className="flex items-center text-gray-300">✨ <strong>Pasaporte Global:</strong> Haz amigos en cualquier país</li>
            <li className="flex items-center text-gray-300">✨ Perfil Prioritario (aparece primero a los demás)</li>
            <li className="flex items-center text-gray-300">✨ Modo Incógnito (solo te ven quienes te gustan)</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-yellow-500 text-gray-900 font-bold hover:bg-yellow-400 transition-colors">
            Elegir Oro
          </button>
        </div>

      </main>

      <footer className="mt-20 max-w-4xl mx-auto text-center px-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold mb-2">🔒 Pago 100% Seguro</h3>
          <p className="text-gray-500 text-sm italic">
            Puedes cancelar tu suscripción en cualquier momento desde los ajustes de tu cuenta. 
            Sin contratos, sin líos.
          </p>
        </div>
      </footer>
    </div>
  );
}