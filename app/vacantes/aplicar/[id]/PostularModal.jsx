'use client';

import LoadingOverlay from '@/app/components/Loading';
import useSession from '@/hooks/useSession';
import { addPostulante } from '@/serverActions/addPostulante';
import { getUserCV } from '@/serverActions/getUserCV';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function AplicarVacante({ vacante }) {


  const [userCV, setUserCV] = useState(null); // CV en base64 desde perfil
  const [selectedFile, setSelectedFile] = useState(null); // archivo nuevo
  const [useProfileCV, setUseProfileCV] = useState(true);
  const [sobreTi, setSobreTi] = useState('');

  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUseProfileCV(false);
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Informacion:', sobreTi, session.userId, vacante);

    if (useProfileCV && userCV) {
      const response = await addPostulante(userCV, sobreTi, session.userId, vacante);
      if (response.ok) {
        toast.success(response.message);
        window.location.href = "/vacantes";
      } else {
        toast.error(response.error)
      }
    } else if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target.result; // incluye encabezado        
        const response = await addPostulante(base64, sobreTi, session.userId, vacante);
        if (response.ok) {
          toast.success(response.message);
        } else {
          toast.error(response.error)
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onSession = async (session) => {
    if (session) {
      const { ok, cv, message } = await getUserCV(session.userId);
      if (ok) {
        toast.success("Se ha cargado el cv.")
        setUserCV(cv);
      } else {
        toast.error(message);
      }
    }
  };

  const { session, loading } = useSession(onSession);

  if (loading || !userCV)
    return <LoadingOverlay isActive={true} message="Cargando..." />;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Postular a vacante</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Nombre completo*</label>
            {session?.userCompleteName || 'No disponible'}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Correo electrónico*</label>
            {session?.email || 'No disponible'}
          </div>

          {/* Selección de CV */}
          <div>
            <label className="block text-gray-700 mb-2">Currículum Vitae*</label>

            {userCV && (
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="profile-cv"
                    name="cv-option"
                    checked={useProfileCV}
                    onChange={() => setUseProfileCV(true)}
                  />
                  <label htmlFor="profile-cv" className="cursor-pointer">
                    Continuar con CV cargado desde tu perfil
                  </label>
                </div>

                {useProfileCV && (
                  <iframe
                    src={userCV}
                    title="CV actual"
                    className="w-full h-48 border rounded"
                  />
                )}

                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="new-cv"
                    name="cv-option"
                    checked={!useProfileCV}
                    onChange={() => setUseProfileCV(false)}
                  />
                  <label htmlFor="new-cv" className="cursor-pointer">
                    Subir un nuevo CV (PDF)
                  </label>
                </div>
              </div>
            )}

            {/* Input para nuevo CV */}
            {!userCV || !useProfileCV ? (
              <div
                className="mt-4 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
                onClick={handleClickUpload}
              >
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="cv-upload"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  required={!userCV}
                />

                {selectedFile ? (
                  <p>{selectedFile.name}</p>
                ) : (
                  <>
                    <p>Click para subir o arrastra el archivo</p>
                    <p className="text-sm text-gray-500">PDF (máx. 32 MB)</p>
                  </>
                )}
              </div>
            ) : null}
          </div>

          {/* Campo adicional */}
          <div>
            <label className="block text-gray-700 mb-2">Háblanos de ti*</label>
            <textarea
              className="w-full p-3 border rounded-lg h-32"
              required
              value={sobreTi}
              onChange={(e) => setSobreTi(e.target.value)}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Postular
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
