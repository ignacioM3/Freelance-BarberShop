import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/styles/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { createAccountApi } from "../../api/AuthApi"
import { toast } from "react-toastify";
import { UserRegistrationForm } from "../../types"
import { Link, Navigate } from "react-router-dom";
import { AppRoutes } from "../../routes";
import useAuth from "../../hooks/useAuth";

function Register() {
  const {currentUser} = useAuth()

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }


  const {register, handleSubmit,  watch, reset, formState: { errors } } = useForm({defaultValues: initialValues})
  const {mutate} = useMutation({
    mutationFn: createAccountApi,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data);
      reset()
    }
  })
  const password = watch("password")
  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
  }

  if(currentUser){
    return <Navigate to={AppRoutes.home.route()}/>
  }


  return (
    <div className="my-5 mt-[50px] md:mt-[100px]">
      <h1 className="text-center text-4xl font-black text-white">Crear Cuenta</h1>
      <p className="text-2xl font-light mt-5 text-center lg:text-xl lg:mt-2 text-white">Llena el formulario para {''}
        <span className="text-gray-200 font-bold" >Crear tu cuenta</span>
      </p>

      <form action=""
      onSubmit={handleSubmit(handleRegister)}
         className=" p-10 max-w-[650px] mx-auto  mt-5 shadow-md rounded-sm  lg:max-w-[450px]"
         noValidate
      >
      <div className="flex flex-col gap-5 lg:gap-3 mb-3">
          <label
            className="font-normal text-2xl lg:text-xl text-white"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 lg:p-2 lg:rounded-sm  border-gray-300 border"
            {...register("email", {
              required: 'El email de registro es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              }
            })}
          />
          {
            errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )
          }
          
        </div>
        <div className="flex flex-col gap-5 lg:gap-3 mb-3">
          <label
            className="font-normal text-2xl lg:text-xl text-white"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("name",{
              required: 'El nombre de usuario es obligatorio'
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5 lg:gap-3 mb-3">
          <label
            className="font-normal text-2xl lg:text-xl text-white"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password",{
              required: "El password debe ser de minimo 8 caracteres",
              minLength: {
                value: 8,
                message: 'El password debe ser mínimo 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5 lg:gap-3 mb-3">
          <label
            className="font-normal text-2xl lg:text-xl text-white"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los password no son iguales'
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-gray-600 rounded-md hover:bg-gray-700 w-full p-3  text-white font-black  text-xl cursor-pointer mt-8"
        />
      </form>
      <nav
        className="mt-5 flex flex-col space-y-4"
      >
        <Link
          to={AppRoutes.login.route()}
          className="text-center text-gray-200 font-normal"
        >
            ¿Ya tienes cuenta? <span className="text-white font-bold">Iniciar Sesion</span>
        </Link>
        <Link
          to={AppRoutes.forgotPassword.route()}
           className="text-center text-gray-200 font-normal"
        >
        ¿Olvidaste tu contraseña? <span className="text-white font-bold">Restablecer</span>
        </Link>
      </nav>
    </div>
  )
}

export default Register