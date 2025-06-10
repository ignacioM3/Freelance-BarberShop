type ConfirmModalProps = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

export default function CancelApointmentAdminModal({ show, onConfirm, onCancel, message }: ConfirmModalProps) {
  return (
    <div
      className={`${show ? 'fixed' : 'hidden'} bg-[#4b4b4b72] h-screen left-0 bottom-0 right-0 z-50`}
      onClick={onCancel}
    >
      <div className='w-full h-full flex items-center justify-center'>
        <form
          className='bg-white w-[300px] text-center rounded-md shadow-sm p-5'
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm();
          }}
        >
          <h2 className='text-xl font-bold'>{message}</h2>
          <div className='flex gap-2 justify-center mt-4'>
            <input
              type='button'
              className='bg-red-500 cursor-pointer text-white px-4 py-2 rounded-sm hover:bg-red-800 transition-colors'
              onClick={onCancel}
              value="Cancelar"
            />
            <input
              type="submit"
              value="Confirmar"
              className='bg-green-400 cursor-pointer text-white px-4 py-2 rounded-sm hover:bg-green-700 transition-colors'
            />
          </div>
        </form>
      </div>
    </div>
  );
}
