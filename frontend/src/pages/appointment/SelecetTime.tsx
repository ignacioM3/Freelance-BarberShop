import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "../../components/styles/PageContainer";
import { PageContent } from "../../components/styles/PageContent";
import { PageTitle } from "../../components/styles/PageTitle";
import { getAppointmentByDayApi } from "../../api/AppointmentApi";
import LoadingSpinner from "../../components/styles/LoadingSpinner";
import { generateTimeSlots } from "../../utils/generateTime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppRoutes } from "../../routes";
import useAppointment from "../../hooks/useAppointment";
import { formattedDateForApi } from "../../utils/getFormatDay";
import { Appointment } from "../../types";
import { AppointmentStatus } from "../../types/appointment-status";

export function SelecetTime() {
  const { id } = useParams();
  const branchId = id!
  const { appointment, setAppointment, branch, setAppointments } = useAppointment()
  const navigate = useNavigate()

  const shortDate = appointment.day?.split("-").slice(0, 2).join("-");
  const dateForApi = formattedDateForApi(appointment.day)
  const [timeSlots, setTimeSlots] = useState<{ time: string; available: number }[]>([]);
  const [timeSelect, setTimeSelect] = useState('')


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAppointmentByDayApi({ branchId, appointmentId: dateForApi }),
    queryKey: ["getAppointmentDayWeek", branchId, dateForApi],
    retry: false
  })


  const totalBarbers = data?.branch?.barbers.length | 0
  useEffect(() => {

    if (!branch) {
      navigate(AppRoutes.home.route(), { replace: true })
      return
    }

    if (data?.branch) {
      let generatedSlots = generateTimeSlots(data.branch.open, data.branch.close, 30);

      // Verificar si el día seleccionado es hoy (formato DD-MM-YYYY)
      if (appointment.day) {
        const [day, month, year] = appointment.day.split('-').map(Number); // [27, 5, 2025]
        const selectedDate = new Date(year, month - 1, day); // Meses van de 0-11 en JS
        const today = new Date();

        // Comparar si es el mismo día
        const isToday = selectedDate.getDate() === today.getDate() &&
          selectedDate.getMonth() === today.getMonth() &&
          selectedDate.getFullYear() === today.getFullYear();

        // Si es hoy, filtrar horas pasadas
        if (isToday) {
          const currentHours = String(today.getHours()).padStart(2, '0');
          const currentMinutes = String(today.getMinutes()).padStart(2, '0');
          const currentTime = `${currentHours}:${currentMinutes}`;

          generatedSlots = generatedSlots.filter(slot => slot > currentTime); // Ej: "15:00" > "14:30"
        }
      }
      const updateSlots = generatedSlots.map(slot => {
        const appointmentsInTime = data.appointments?.filter((appointment: Appointment) => appointment.timeSlot === slot && appointment.status !== AppointmentStatus.CANCELED).length

        return {
          time: slot,
          available: Math.max(0, totalBarbers - appointmentsInTime)
        };
      })
      setTimeSlots(updateSlots);

    }
  }, [data, appointment.day, branch, navigate, totalBarbers]);

  const handleNext = () => {
    if (timeSelect.length < 1) {
      toast.error("Debe seleccionar un horario")
      return
    }
    setAppointment({ time: timeSelect })
    setAppointments(data.appointments)
    navigate(AppRoutes.selectBarberAppointment.route(branchId))
  }
  if(isLoading) return (
     <div className="absolute inset-0 flex items-center justify-center z-10">
      <LoadingSpinner />
    </div>
  )
  if (isError) return <h1>Falta Implementar error</h1>

  return (
    <PageContainer>
      <PageContent className="md:mt-10">
        <PageTitle className="text-white font-bold">Seleccione el horario</PageTitle>
        <p className="text-center text-white font-bold mt-4">Fecha Seleccionada: {shortDate}</p>
        <div className="flex justify-center mx-auto flex-wrap gap-3 md:max-w-[800px] mt-8">
          {timeSlots.length > 0 ? (
            timeSlots.map(({ time, available }, index) => {
              return (
                <div
                  key={index}
                  onClick={() => available > 0 && setTimeSelect(time)}
                  className={`flex text-center flex-col p-2 rounded-md w-[80px] items-center justify-center cursor-pointer ${timeSelect === time ? 'bg-gray-500 text-white' : available < 1 ? 'bg-gray-400' : 'bg-white'}`}
                >
                  <span className="font-bold">{time}</span>
                  <span className={`font-bold text-green-600 text-sm ${timeSelect === time && 'text-green-300'}`}>{available > 0 ? `${available} turnos` : "0 turnos"}</span>
                </div>
              )
            })
          ) : (
            <div className="text-center p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
              <div className="mb-6">
                <svg
                  className="w-20 h-20 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Horarios agotados!
              </h2>

              <p className="text-gray-600 mb-6">
                Lo sentimos, no hay turnos disponibles para la fecha seleccionada.
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center mt-4 gap-4">
          <button
            className="bg-red-500 p-2 w-[100px] rounded-md cursor-pointer text-white font-bold hover:bg-red-600 transition-colors"
            onClick={() => navigate(-1)}
          >Volver</button>
          {timeSlots.length > 0 && (
            <button
              className="bg-green-500 p-2 w-[100px] rounded-md cursor-pointer text-white font-bold hover:bg-green-600 transition-colors"
              onClick={() => handleNext()}
            >Siguiente</button>
          )}
        </div>

      </PageContent>
    </PageContainer>
  )
}
