import { Link } from "react-router-dom";

export default function Seguridad() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 px-8 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:opacity-90 transition-opacity">
            VirtualFriends
          </Link>
          <span className="text-white font-medium bg-blue-700 px-3 py-1 rounded-lg text-sm">
            Centro de Seguridad
          </span>
        </div>
      </nav>

      <header className="bg-white border-b py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Tu seguridad es nuestra prioridad</h1>
          <p className="text-lg text-gray-600">
            En VirtualFriends trabajamos 24/7 para que tu experiencia conectando con otros sea segura, privada y auténtica.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl">
             🔒
          </div>
          <h2 className="text-xl font-bold mb-2">Protección de Datos</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tus datos personales están cifrados. Nunca compartimos tu información con terceros sin tu consentimiento.
          </p>
        </section>

        {/* Card 2 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl">
             🛡️
          </div>
          <h2 className="text-xl font-bold mb-2">Reglas de Convivencia</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Mantenemos un ambiente libre de acoso. Cualquier conducta de odio resulta en expulsión inmediata.
          </p>
        </section>

        {/* Card 3 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl">
             👤
          </div>
          <h2 className="text-xl font-bold mb-2">Privacidad de Perfil</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tú decides quién ve tu información. Configura tu perfil para que solo amigos mutuos te contacten.
          </p>
        </section>

        {/* Card 4 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl">
             🚫
          </div>
          <h2 className="text-xl font-bold mb-2">Reporte y Bloqueo</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Si alguien te molesta, nuestra herramienta de reporte actúa rápido. Bloquea usuarios al instante.
          </p>
        </section>

        {/* Card 5 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl">
             ⚠️
          </div>
          <h2 className="text-xl font-bold mb-2">Restricciones de Edad</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Solo para mayores de 18 años. Verificamos identidades para evitar perfiles falsos.
          </p>
        </section>

        {/* Card 6 */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl">
             📄
          </div>
          <h2 className="text-xl font-bold mb-2">Políticas Legales</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Cumplimos con normativas internacionales de protección de datos (GDPR y Habeas Data).
          </p>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto py-12 px-8 text-center text-gray-400 text-sm">
        © 2026 VirtualFriends Security Team.
      </footer>
    </div>
  );
}