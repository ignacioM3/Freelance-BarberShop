import { useNavigate } from "react-router";
import { AppRoutes } from "../../routes";
import { FaHome } from "react-icons/fa";

export function Products() {
  const navigate = useNavigate();
  return (
    <div className="my-5 mt-[30px] md:mt-[100px] flex justify-center">
      <div className="max-w-md w-full bg-[#f8f4e8] rounded-2xl shadow-xl overflow-hidden m-4 border border-[#d4c9a8]">
        <div className="p-8 text-center">
          <div className="inline-block bg-[#e8dfc8] p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#8a6d3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-[#5d4a1f] mb-2">
            ¡Próximamente!
          </h2>
          
          <p className="text-lg text-[#7d6a40] mb-6">
            Estamos preparando algo increíble para ti
          </p>
          
          <div className="bg-[#ede7d5] rounded-lg p-4 border border-[#d4c9a8]">
            <p className="text-[#8a6d3b] font-medium">
              📦 Nuevos productos en camino
            </p>
          </div>
          
          <button 
            className="mt-8 flex items-center justify-center gap-2 mx-auto cursor-pointer bg-[#ae9961] hover:bg-[#8a774d] text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            type="button"
            onClick={ () => navigate(AppRoutes.home.route()) }
          >
            <FaHome /> Volver al Inicio 
          </button>
        </div>
      </div>
    </div>
  )
}