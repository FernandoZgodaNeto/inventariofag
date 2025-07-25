/**
 * Página de Registro
 * Permite que novos usuários se registrem no sistema
 */

import { ErrorMessage, Field, Formik } from 'formik'
import { Button } from 'primereact/button'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useRegisterUserMutation } from '../provider/queries/Auth.query'
import { toast } from 'sonner'

const Register = () => {
  const [registerUser, registerUserResponse] = useRegisterUserMutation()
  const navigate = useNavigate()

  // Interface para os dados do formulário de registro
  type User = {
    name: string,
    email: string,
    password: string
  }

  // Valores iniciais do formulário
  const initialValues: User = {
    name: '',
    email: '',
    password: ''
  }

  // Schema de validação usando Yup
  const validationSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email deve ser válido").required("Email é obrigatório"),
    password: yup.string().min(6, "Senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
  })

  /**
   * Manipula o envio do formulário de registro
   * @param {User} e - Dados do formulário
   * @param {Object} resetForm - Função para resetar o formulário
   */
  const OnSubmitHandler = async (e: User, { resetForm }: any) => {
    try {
      const { data, error }: any = await registerUser(e)

      if (error) {
        toast.error(error.data.message);
        return
      }
      localStorage.setItem("token", data.token);
      resetForm()
      navigate("/")
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-[#eeee]'>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={OnSubmitHandler}>
        {({ handleSubmit }) => (
          <>
            <form onSubmit={handleSubmit} className="w-[96%] md:w-[70%] lg:w-1/3 shadow-md rounded-md pt-10 pb-3 px-4 bg-white">
              <h1 className="text-center font-bold text-2xl">REGISTRO</h1>
              {/* Campo Nome */}
              <div className="mb-3 py-1">
                <label htmlFor="name">Nome</label>
                <Field
                  id='name'
                  name='name'
                  className='w-full outline-none py-3 px-2 border-[.1px] border-zinc-400 rounded-lg'
                  placeholder='Digite seu nome'
                />
                <ErrorMessage component={'p'} className='text-red-500 text-sm ' name='name' />
              </div>

              {/* Campo Email */}
              <div className="mb-3 py-1">
                <label htmlFor="email">E-mail</label>
                <Field
                  id='email'
                  name='email'
                  className='w-full outline-none py-3 px-2 border-[.1px] border-zinc-400 rounded-lg'
                  placeholder='Digite seu e-nail'
                />
                <ErrorMessage component={'p'} className='text-red-500 text-sm ' name='email' />
              </div>

              {/* Campo Senha */}
              <div className="mb-3 py-1">
                <label htmlFor="password">Senha</label>
                <Field
                  name='password'
                  id='password'
                  type="password"
                  className='w-full outline-none py-3 px-2 border-[.1px] border-zinc-400 rounded-lg'
                  placeholder='******************'
                />
                <ErrorMessage component={'p'} className='text-red-500 text-sm ' name='password' />
              </div>

              {/* Botão de Registro */}
              <div className="mb-3 py-1">
                <Button
                  loading={registerUserResponse.isLoading}
                  raised
                  type='submit'
                  className='w-full bg-blue-800 text-white py-3 px-2 flex items-center justify-center rounded-lg font-semibold'
                >
                  REGISTRAR
                </Button>
              </div>

              {/* Link para Login */}
              <div className="mb-3 py-1 flex items-center justify-center">
                <p className="inline-flex items-center gap-x-1">
                  Já tem uma conta?
                  <Link className='font-semibold' to={'/login'}>
                    Entre
                  </Link>
                </p>
              </div>
            </form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default Register