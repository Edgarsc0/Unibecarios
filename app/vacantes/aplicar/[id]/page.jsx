'use client';
import { useRouter } from 'next/navigation';

export default function AplicarVacante({ params }) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío
    router.push('/confirmacion');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Postular a vacante</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Nombre completo*</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Correo electrónico*</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Sube tu CV (PDF)*</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="cv-upload"
                required
              />
              <label
                htmlFor="cv-upload"
                className="cursor-pointer block"
              >
                <p>Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PDF (max. 32 MB)</p>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Háblanos de ti*</label>
            <textarea
              className="w-full p-3 border rounded-lg h-32"
              required
            />
          </div>

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