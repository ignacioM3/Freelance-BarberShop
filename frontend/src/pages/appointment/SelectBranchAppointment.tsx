import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { getAllBranchsApi } from "../../api/BranchApi";
import LoadingSpinner from "../../components/styles/LoadingSpinner";
import { PageTitle } from "../../components/styles/PageTitle";
import Carousel from "../../components/bits/Carousel";
import { CiShop } from "react-icons/ci";
import { useState } from "react";
import { CalendarReact } from "../../components/styles/CalendarReact";
import { Branch, Value } from "../../types";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { toast } from "react-toastify";
import useAppointment from "../../hooks/useAppointment";
import { getMyAppointmentsByUserApi } from "../../api/AppointmentApi";
import useAuth from "../../hooks/useAuth";
import { FiArrowLeft, FiClock } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";


export function SelectBranchAppointment() {
  const navigate = useNavigate()
  const [branchId, setBranchIdState] = useState("")
  const { setAppointment, setBranch } = useAppointment()

  const { currentUser } = useAuth();
  const setBranchCarrousel = (data: Branch) => {
    console.log("Seleccionado:", data);
    setBranch(data);
    setBranchIdState(data._id);
  };

  const [value, onChange] = useState<Value>(null);


  const disableDays = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliza 'today' a medianoche

    const day = date.getDay();
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0); // Normaliza 'date' también

    return day === 0 || day === 1 || checkDate < today;
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: getAllBranchsApi,
    queryKey: ['getAllBranchAppointment']
  })

  const { data: appointment } = useQuery({
    queryKey: ['getMyAppointments', currentUser?._id],
    queryFn: () => getMyAppointmentsByUserApi(currentUser!._id),
    enabled: !!currentUser?._id,
  })
  const handleNext = () => {
    if (!value) {
      toast.error("Debe seleccionar un dia")
    } else {
      const formattedDate = (value as Date).toISOString().split('T')[0].split('-').reverse().join('-');
      setAppointment({ day: formattedDate })
      navigate(AppRoutes.selectTimeAppointment.route(branchId))
    }
  }

  if (isError) return <h1>falta implementar error</h1>
  return (
    <PageContainer>
      <PageContent className="md:mt-10">
        <PageTitle className="text-white font-bold">Turno Online</PageTitle>
        {appointment?.currentAppointment.length > 0 ? (
          <PageContainer>
            <PageContent className="flex items-center justify-center">
              <div className="max-w-md w-full bg-red-600/80 backdrop-blur-sm text-white p-6 rounded-xl shadow-lg border border-red-700/50">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="h-8 w-8 text-red-200 animate-pulse" />
                    <h2 className="text-xl font-bold text-center">¡Turno Pendiente!</h2>
                  </div>

                  <p className="text-center text-red-100">
                    Actualmente tienes un turno en proceso.
                    <br />
                    Completa o cancela tu turno actual antes de solicitar uno nuevo.
                  </p>

                  <div className="flex gap-4 mt-4 w-full">
                    <button
                      onClick={() => navigate(AppRoutes.home.route())}
                      className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-md transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <FiArrowLeft />
                      Inicio
                    </button>
                    <button
                      onClick={() => navigate(AppRoutes.myAppointments.route())}
                      className="flex-1 text-xs md:text-xl py-2 px-4 bg-white/20 hover:bg-white/30 rounded-md transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <FiClock />
                      Ver Turno
                    </button>
                  </div>
                </div>
              </div>
            </PageContent>
          </PageContainer>) : (
          <>
            <hr className="mt-2 w-[30%] mx-auto" />
            <h2 className="text-center mt-2 font-bold text-gray-200">{branchId ? "Seleccioné el día" : "Seleccione la sucursal"}</h2>
            <div className="mt-8">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <LoadingSpinner />
                </div>
              )}
              {(data && !branchId) && (
                <div className="flex justify-center" /* style={{ height: '600px', position: 'relative' }} */ >
                  <Carousel
                    baseWidth={300}
                    autoplay={true}
                    autoplayDelay={3000}
                    pauseOnHover={true}
                    setBranchCarrousel={setBranchCarrousel}
                    loop={true}
                    items={data.map((branch: Branch) => ({
                      branch: branch,
                      name: branch.name,
                      address: branch.address,
                      _id: branch._id,
                      img: "https://i.pinimg.com/originals/e5/12/68/e51268203ad501704ff82ffa739e57ac.jpg",
                      icon: <CiShop className="h-[16px] w-[16px] text-white font-bold" />,
                    }))}
                    round={false}
                  />
                </div>
              )}
              {branchId && (
                <div className="flex justify-center flex-col items-center gap-5">
                  <CalendarReact
                    value={value}
                    onChange={onChange}
                    disableDays={disableDays}
                  />
                  <div className="flex gap-4">
                    <button
                      className="rounded-md bg-red-500 p-2 font-bold uppercase text-white"
                      onClick={() => navigate(AppRoutes.home.route())}
                    >Cancelar</button>
                    <button
                      className="rounded-md bg-gray-500 p-2 font-bold uppercase text-white"
                      onClick={() => handleNext()}
                    >Siguiente</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}


      </PageContent>
    </PageContainer>
  )
}
