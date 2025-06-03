import { useNavigate } from "react-router"
import { AppRoutes } from "../../routes";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export function About() {
  const navigate = useNavigate();

  const { currentUser } = useAuth()
    const appointmentRoute = () => {
      if (!currentUser) {
        toast.info("Debes iniciar sessión para sacar turno")
        return
      }
      navigate(AppRoutes.selectBranchAppointment.route())
    }
  return (
    <div className="my-5 mt-[30px] md:mt-[100px]">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
           Nosotros
          </h1>
          <div className="w-32 h-1 bg-amber-700 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Más que un corte de pelo, una experiencia de tradición y estilo
          </p>
        </div>

        {/* Historia */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <div className="md:w-1/2">
          <img src="/local.webp" alt="" className="bg-gray-200 rounded-xl w-full h-72 flex items-center justify-center text-amber-800 cursor-pointer" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Nuestra Historia</h2>
            <p className="text-amber-900 mb-4">
              Fundada en 2024, nuestra barbería nació de la pasión por el arte tradicional de la barbería 
              combinado con un toque moderno. Lo que empezó como un pequeño local en el centro de la ciudad, 
              hoy se ha convertido en una cadena de sucursales que mantiene el mismo compromiso con la 
              excelencia y la satisfacción del cliente.
            </p>
            <p className="text-amber-900">
              Cada día, nuestros barberos profesionales combinan técnicas ancestrales con las últimas 
              tendencias para ofrecerte un servicio incomparable.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Tradición", 
                description: "Mantenemos vivas las técnicas clásicas de barbería",
                icon: "M12 6v6m0 0v6m0-6h6m-6 0H6"
              },
              { 
                title: "Calidad", 
                description: "Usamos los mejores productos y herramientas",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              { 
                title: "Comunidad", 
                description: "Un espacio donde todos son bienvenidos",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-amber-50 mx-2 cursor-pointer bg-opacity-90 rounded-xl p-6 border border-amber-200 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-amber-800 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-800 mb-2">{value.title}</h3>
                <p className="text-amber-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">Nuestro Equipo</h2>
          <div className="flex justify-center flex-col md:flex-row items-center gap-8 mx-2">
            {[
              { name: "Carlos Méndez", role: "Fundador & Barber", experience: "15 años" },
              { name: "Carlos Méndez", role: "Fundador & Barber", experience: "15 años" },
            ].map((member, index) => (
              <div 
                key={index} 
                className="hover:shadow-lg transition-shadow duration-300 bg-amber-50 max-w-[250px] cursor-pointer w-full bg-opacity-90 rounded-xl overflow-hidden border border-amber-200 text-center"
              >
                <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center text-amber-800 ">
                  [Foto de {member.name}]
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-amber-800">{member.name}</h3>
                  <p className="text-amber-700 mb-1">{member.role}</p>
                  <p className="text-sm text-amber-600">Experiencia: {member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Llamada a la acción */}
        <div className="text-center py-12 px-4 bg-amber-800 rounded-x mx-2 rounded-md">
          <h2 className="text-3xl font-bold text-amber-100 mb-4">¿Listo para una nueva experiencia?</h2>
          <p className="text-amber-200 mb-8 max-w-2xl mx-auto">
            Reserva tu turno ahora y a probar esta experiencia
          </p>
          <button 
          type="button"
          onClick={() => appointmentRoute()}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Reservar Ahora
          </button>
        </div>
      </div>
    </div>
  )
}