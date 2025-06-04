import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentByDayApi } from "../../../api/AppointmentApi";
import LoadingSpinner from "../../../components/styles/LoadingSpinner";
import { PageContent } from "../../../components/styles/PageContent";
import { generateTimeSlots } from "../../../utils/generateTime";
import { Appointment, UserBarberListType } from "../../../types";
import { AppointmentDetails } from "../../../components/modal/appointment/AppointmentDetails";
import { AppointmentModal, Services } from "../../../components/modal/appointment/AddAppointmentModal";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { AppointmentStatus } from "../../../types/appointment-status";

export function AppointmentWeekDay() {
  const { id } = useParams();
  const branchId = id!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dayParam = queryParams.get("appointmentWeek");
  const detailsAppointment = queryParams.get("detailsAppointment");
  const navigate = useNavigate();

  const getFormattedDates = (dateString: string | null) => {
    if (!dateString) {
      const today = new Date();
      return {
        formatForApi: format(today, "yyyy-MM-dd"),
        formattedDate: format(today, "dd/MM/yyyy", { locale: es }),
      };
    }

    try {
      const date = parseISO(dateString);
      return {
        formatForApi: format(date, "yyyy-MM-dd"),
        formattedDate: format(date, "dd/MM/yyyy", { locale: es }),
      };
    } catch (error) {
      console.error("Error parsing date:", error);
      const today = new Date();
      return {
        formatForApi: format(today, "yyyy-MM-dd"),
        formattedDate: format(today, "dd/MM/yyyy", { locale: es }),
      };
    }
  };

  const { formatForApi, formattedDate } = getFormattedDates(dayParam);

  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getAppointmentByDayApi({ branchId, appointmentId: formatForApi }),
    queryKey: ["getAppointmentDayWeek", formatForApi],
    retry: false,
  });

  if (isLoading)
    return (
      <div className="mt-20">
        <LoadingSpinner />
      </div>
    );
    
  if (isError) return <h1>Error al cargar los turnos</h1>;

  if (data) {
    const timeSlots = generateTimeSlots(data.branch.open, data.branch.close, 30);

    const getAppointmentName = (slot: string, barberId: string) => {
      const getAppointmentByBarberId = data.appointments.filter(
        (a: Appointment) => (a.barberId === barberId && a.status !== AppointmentStatus.CANCELED)
      );

      const appointment = getAppointmentByBarberId.find(
        (a: Appointment) => a.timeSlot === slot
      );

      if (appointment) {
        const firtName = appointment.name.split(" ")[0];
        return { firtName, appointment };
      }

      return null;
    };

    return (
      <PageContent className="mt-5">
        <span className="text-gray-500">
          Fecha seleccionada: {formattedDate}
        </span>
        {data.branch.barbers.length > 0 ? (
          data.branch.barbers.map(
            (barberAppointment: UserBarberListType, index: string) => (
              <div key={index}>
                <h2 className="text-xl text-gray-500 mb-4">
                  {barberAppointment.name}
                </h2>
                <div className="flex justify-center mx-auto flex-wrap gap-3 md:max-w-[1000px]">
                  {timeSlots.map((slot, index) => {
                    const appointmentData = getAppointmentName(
                      slot,
                      barberAppointment._id
                    );
                    return (
                      <div
                        key={index}
                        className={`flex text-center flex-col border ${
                          appointmentData?.appointment?.status === "completed"
                            ? "border-green-600 border-2"
                            : "border-gray-400"
                        } p-2 rounded-md cursor-pointer w-[80px] items-center justify-center ${
                          appointmentData ? "bg-gray-200" : "bg-white"
                        }`}
                        onClick={() =>
                          appointmentData
                            ? navigate(
                                `${location.pathname}${location.search}&detailsAppointment=${appointmentData.appointment._id}`
                              )
                            : navigate(
                                `${location.pathname}${location.search}&time=${slot}&barberId=${barberAppointment._id}`
                              )
                        }
                      >
                        <span className="font-bold">{slot}</span>
                        {appointmentData ? (
                          <span
                            className={`font-bold ${
                              appointmentData.appointment.status === "completed"
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {appointmentData.firtName}
                          </span>
                        ) : (
                          <span className="text-green-500 font-bold uppercase">
                            Libre
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )
        ) : (
          <h1 className="text-center text-gray-500 font-bold md:text-2xl mt-5">
            No hay barberos agregados a esta sucursal
          </h1>
        )}
        {detailsAppointment && <AppointmentDetails />}
        <AppointmentModal
          services={data.branch.prices.map((service: Services) => ({
            service: service.service,
            price: service.price,
          }))}
        />
      </PageContent>
    );
  }
}