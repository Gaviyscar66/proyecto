import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";

// ==========================================
// FUNCIONES AUXILIARES (Recorte de imagen)
// ==========================================
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], "foto_perfil.jpg", { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg");
  });
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function Profile() {
  // --- 1. ESTADOS (HOOKS) ---
  const [user, setUser] = useState(null);
  const [editando, setEditando] = useState(false);
  const [bio, setBio] = useState("");
  const [archivoPerfil, setArchivoPerfil] = useState(null);
  const [archivoGaleria, setArchivoGaleria] = useState(null);
  const [fotos, setFotos] = useState([]);

  // Estados del Cropper
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [mostrarCropper, setMostrarCropper] = useState(false);

  // 🔥 NUEVO: Estado para ver foto ampliada (Lightbox)
  const [fotoAmpliada, setFotoAmpliada] = useState(null);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // --- 2. EFECTOS ---
  useEffect(() => {
    if (!usuario || !usuario.id) {
      navigate("/login");
      return;
    }

    fetch(`https://backend-production-578d.up.railway.app/user/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setBio(data.bio || "");
      });

    fetch(`https://backend-production-578d.up.railway.app/fotos/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => setFotos(data));
  }, [usuario?.id, navigate]);

  // --- 3. CALLBACKS (Deben ir antes de cualquier 'return') ---
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // --- 4. CARGA ---
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-rose-500 border-opacity-50"></div>
      </div>
    );
  }

  // --- 5. FUNCIONES DE MANEJO ---
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setMostrarCropper(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const procesarRecorte = async () => {
    try {
      const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);
      setArchivoPerfil(croppedImageFile);
      setMostrarCropper(false);
    } catch (e) {
      alert("Error al recortar");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    if (archivoPerfil) formData.append("foto", archivoPerfil);

    await fetch(`https://backend-production-578d.up.railway.app/user/${usuario.id}`, {
      method: "PUT",
      body: formData,
    });

    const res = await fetch(`https://backend-production-578d.up.railway.app/user/${usuario.id}`);
    const data = await res.json();
    setUser(data);
    localStorage.setItem("usuario", JSON.stringify(data));
    setEditando(false);
    setArchivoPerfil(null);
  };

  const handleSubirFotoGaleria = async (e) => {
    e.preventDefault();
    if (!archivoGaleria) return alert("Selecciona una foto");
    if (fotos.length >= 4) return alert("Máximo 4 fotos");

    const formData = new FormData();
    formData.append("user_id", usuario.id);
    formData.append("foto", archivoGaleria);

    await fetch("https://backend-production-578d.up.railway.app/fotos", {
      method: "POST",
      body: formData,
    });

    setArchivoGaleria(null);
    const res = await fetch(`https://backend-production-578d.up.railway.app/fotos/${usuario.id}`);
    const data = await res.json();
    setFotos(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12 relative">

      {/* --- MODAL CROPPER --- */}
      {mostrarCropper && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Encuadra tu foto</h2>
            <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-6">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
              />
            </div>
            <div className="w-full flex gap-3">
              <button onClick={() => setMostrarCropper(false)} className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl">Cancelar</button>
              <button onClick={procesarRecorte} className="flex-1 px-4 py-3 bg-rose-500 text-white font-bold rounded-xl shadow-md">Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 NUEVO: MODAL LIGHTBOX (Para ver foto completa) */}
      {fotoAmpliada && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all"
          onClick={() => setFotoAmpliada(null)}
        >
          <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center text-2xl backdrop-blur-md">✕</button>
          <img
            src={fotoAmpliada}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-zoom-in"
            alt="Ampliada"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center z-50 border-b border-gray-100">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
          VirtualFriends
        </h1>

        {/* 🔥 Agrupamos ambos botones en este div con flex y separación (gap-2) */}
        <div className="flex gap-2 items-center">
          <Link
            to="/historial"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-full transition-colors"
          >
            Likes
          </Link>
          <Link
            to="/discover"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-full transition-colors"
          >
            Feed
          </Link>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto pt-28 px-4">

        {/* PERFIL CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-rose-400 to-purple-500"></div>
          <div className="px-6 pb-6 flex flex-col items-center -mt-16">
            <img
              src={user.foto || "https://i.imgur.com/6VBx3io.png"}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4 bg-white"
              alt="Perfil"
            />
            <h1 className="text-3xl font-bold text-gray-900">{user.nombre} {user.apellido}</h1>
            <p className="text-gray-500 mt-2 text-center max-w-sm">{user.bio || "Sin biografía"}</p>
            <button onClick={() => setEditando(!editando)} className="mt-6 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-full transition-all">
              {editando ? "Cancelar edición" : "Editar perfil"}
            </button>
          </div>
        </div>

        {/* FORMULARIO EDICIÓN */}
        {editando && (
          <form onSubmit={handleUpdate} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Información</h2>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Foto de Perfil:</label>
            <div className="flex items-center justify-center w-full mb-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-rose-300 border-dashed rounded-2xl cursor-pointer bg-rose-50 hover:bg-rose-100">
                <span className="text-rose-600 font-medium">{archivoPerfil ? "¡Foto lista! 📸" : "Subir y recortar"}</span>
                <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
              </label>
            </div>
            <textarea
              placeholder="Bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none h-28"
            />
            <button type="submit" className="w-full mt-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-md">Guardar</button>
          </form>
        )}

        {/* GALERÍA CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Mi Galería</h2>
          <form onSubmit={handleSubirFotoGaleria} className="mb-6">
            <div className="flex gap-3 items-center">
              <label className="flex-1 flex items-center justify-center h-12 px-4 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
                <span className="text-gray-500 text-sm font-medium">{archivoGaleria ? archivoGaleria.name : "Seleccionar foto..."}</span>
                <input type="file" accept="image/*" onChange={(e) => setArchivoGaleria(e.target.files[0])} className="hidden" />
              </label>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">Subir</button>
            </div>
          </form>

          {/* GRID DE FOTOS */}
          <div className="grid grid-cols-2 gap-4">
            {fotos.map((f) => (
              <div key={f.id} className="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img
                  src={f.url}
                  // 🔥 Llamamos al modal de ampliar
                  onClick={() => setFotoAmpliada(f.url)}
                  className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  alt="Galería"
                />
                <button
                  onClick={async (e) => {
                    e.stopPropagation(); // Evita que se abra el modal al borrar
                    await fetch(`https://backend-production-578d.up.railway.app/fotos/${f.id}/${usuario.id}`, { method: "DELETE" });
                    const res = await fetch(`https://backend-production-578d.up.railway.app/fotos/${usuario.id}`);
                    const data = await res.json();
                    setFotos(data);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}