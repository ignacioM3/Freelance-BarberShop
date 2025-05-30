export function translateAppointmentStatus(status: string): string {
  const statusMap: Record<string, string> = {
    available: 'Disponible',
    booked: 'Reservado',
    canceled: 'Cancelado',
    completed: 'Completado',
  };

  return statusMap[status.toLowerCase()] || 'Estado desconocido';
}