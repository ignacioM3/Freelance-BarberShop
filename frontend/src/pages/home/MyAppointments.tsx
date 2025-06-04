import { useLocation, useNavigate } from "react-router"
import CancelAppointmentModal from "../../components/modal/appointment/CancelAppointmentModal"
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getMyAppointmentsByUserApi } from "../../api/AppointmentApi";
import LoadingSpinner from "../../components/styles/LoadingSpinner";
import { format, parseISO } from "date-fns";
import { es } from 'date-fns/locale'
import { AppointmentPopulated } from "../../types";
import { AppointmentStatus } from "../../types/appointment-status";
import { translateAppointmentStatus } from "../../utils/translateStatus";

const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, "EEEE d MMMM", { locale: es });
};

export function MyAppointments() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();


    const { data, isLoading, isError } = useQuery({
        queryKey: ['getMyAppointments', currentUser?._id],
        queryFn: () => getMyAppointmentsByUserApi(currentUser!._id),
        enabled: !!currentUser?._id,
    });

    console.log(data)

    if (isError) return <h1>falta implementar error</h1>
    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
        </div>
    )

    const currentAppointments = data?.currentAppointment ?? [];
    const oldAppointments = data?.oldAppointment ?? [];
    return (
        <div className="mt-[25px] md:mt-[100px] min-h-[60dvh] px-4">
            <h2 className="font-mono text-center text-2xl font-bold text-[#2a3c4d] mb-8">
                <span className="inline-block mr-2">📅</span>
                Mis Turnos
            </h2>

            <div className="max-w-2xl mx-auto space-y-8">
                {/* Turno Actual */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#2a3c4d] hover:shadow-xl transition-shadow">
                    <h3 className="text-lg font-semibold text-[#2a3c4d] mb-4 flex items-center">
                        <span className="inline-block mr-2 text-green-600 text-xl">⏰</span>
                        Turno Actual
                    </h3>
                    {currentAppointments.length > 0 ? (
                        currentAppointments.map((appointment: AppointmentPopulated, index: number) => (
                            <div className="bg-[#f5f0e6] p-4 rounded-md space-y-2" key={index}>
                                <div className="flex items-center">
                                    <span className="text-[#2a3c4d] mr-2">📅</span>
                                    <p className="text-gray-700 font-medium capitalize">{formatDate(appointment.day)}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-[#2a3c4d] mr-2">⏲️</span>
                                    <p className="text-gray-700">{appointment.timeSlot}</p>

                                </div>
                                <div className="flex items-center">
                                    <span className="text-[#2a3c4d] mr-2">👤</span>
                                    <p className="text-[#2a3c4d] font-semibold">{appointment.barberId.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-[#2a3c4d] mr-2">📍</span>
                                    <p className="text-gray-600">{appointment.branchId.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-[#2a3c4d] mr-2">💈</span>
                                    <p className="text-gray-600 capitalize">{translateAppointmentStatus(appointment.status)}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-[#2a3c4d] mr-2">💵</span>
                                    <p className="text-[#2a3c4d] font-semibold">${appointment.price}</p>
                                </div>

                                <div className="flex justify-between my-[20px]">
                                    <button
                                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                                        onClick={() => navigate(location.pathname + `?showModal=true&id=${appointment._id}`)}
                                    >
                                        Cancelar
                                    </button>
                                    <span className="bg-green-200 text-green-800 p-2 rounded-md text-sm">
                                        {translateAppointmentStatus(appointment.status)}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-[#f5f0e6] p-4 rounded-md">
                            <p className="text-gray-600 italic text-center">
                                No tienes turnos actuales
                            </p>
                        </div>
                    )}
                </div>

                {/* Turnos Anteriores */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#ae9961]">
                    <h3 className="text-lg font-semibold text-[#2a3c4d] mb-4 flex items-center">
                        <span className="inline-block mr-2 text-gray-500">🕰️</span>
                        Turnos Anteriores ({oldAppointments.length})
                    </h3>
                    <div className={`space-y-4 ${oldAppointments.length > 2 ? "max-h-64 overflow-y-auto pr-2" : ""
                        }`}>
                        {oldAppointments.length > 0 ? (
                            oldAppointments.map((appointment: AppointmentPopulated, index: number) => (
                                <div key={index} className="bg-[#f5f0e6] p-4 rounded-md hover:bg-[#eee6d8] transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-[#2a3c4d] font-medium">{formatDate(appointment.day)}</p>
                                            <p className="text-gray-600 text-sm">{appointment.service}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-md text-sm ${appointment.status === AppointmentStatus.COMPLETED
                                            ? 'bg-green-200 text-green-800'
                                            : 'bg-red-200 text-red-800'
                                            }`}>
                                            {translateAppointmentStatus(appointment.status)}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="mr-2">👤</span>
                                        {appointment.barberId.name}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <span className="mr-2">📍</span>
                                        {appointment.branchId.name}
                                    </div>
                                    <div className="flex items-center text-gray-600 mt-1">
                                        <span className="mr-2">⏱️</span>
                                        {appointment.timeSlot}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-[#f5f0e6] p-4 rounded-md">
                                <p className="text-gray-600 italic text-center">
                                    No tienes turnos anteriores
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <CancelAppointmentModal />
        </div>
    )
}