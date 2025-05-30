import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { cancelAppointmentByUserApi } from "../../../api/AppointmentApi";
import { AppointmentStatus } from "../../../types/appointment-status";

export default function CancelAppointmentModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const showModal = queryParams.get('showModal');
    const show = showModal ? true : false;
    const queryClient = useQueryClient();
    const id = queryParams.get('id')!;

    const { mutate } = useMutation({
        mutationFn: cancelAppointmentByUserApi,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ["getMyAppointments"] });
            closeModal();
        }
    })
    const closeModal = () => {
        navigate(location.pathname, { replace: true })
    }


    const handleCancelAppointment = () => {
        const data = {
            appointmentId: id, 
            status: AppointmentStatus.CANCELED
        }

        mutate(data);
    }
    return (
        <div
            className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0 mx-2`}
            onClick={closeModal}
        >
            <form
                className="flex items-center justify-center h-full"
                onSubmit={() => handleCancelAppointment()}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <h2 className="text-xl font-semibold text-[#2a3c4d] mb-4">Cancelar Turno</h2>
                    <p className="text-gray-700 mb-4">¿Estás seguro de que deseas cancelar este turno?</p>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancelar</button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"

                        >Confirmar Cancelación</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
