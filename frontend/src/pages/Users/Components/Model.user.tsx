/**
 * Modal para Adicionar Usuário
 * Permite criar novos usuários com validação completa de dados
 */

import { Dialog } from 'primereact/dialog';
import { ErrorMessage, Field, Formik } from 'formik';
import { Calendar } from 'primereact/calendar';
import * as yup from 'yup'
import { toast } from 'sonner'
import { useRegisterConsumerMutation } from '../../../provider/queries/Users.query';
import { Button } from 'primereact/button';

const Model = ({ visible, setVisible }: any) => {
  // Mutation para registrar novo usuário
  const [RegisterConsumer, RegisterConsumerResponse] = useRegisterConsumerMutation()

  // Schema de validação usando Yup
  const validationSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email deve ser válido").required("Email é obrigatório"),
    mobile: yup.string().required("Telefone é obrigatório"),
    address: yup.string().required("Endereço é obrigatório"),
    dob: yup.string().required("Data de nascimento é obrigatória"),
  })

  // Valores iniciais do formulário
  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    dob: new Date()
  }

  /**
   * Manipula o envio do formulário de registro de usuário
   * @param {Object} e - Dados do formulário
   * @param {Object} resetForm - Função para resetar o formulário
   */
  const onSubmitHandler = async (e: any, { resetForm }: any) => {
    try {
      const { data, error }: any = await RegisterConsumer(e)

      if (error) {
        toast.error(error.data.message);
        return
      }

      toast.success(data.msg)
      resetForm()
      setVisible(false)
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  return (
    <>
      <Dialog
        draggable={false}
        header="Adicionar Usuário"
        position='top'
        visible={visible}
        className=" w-full md:w-[70%] lg:w-1/2"
        onHide={() => setVisible(false)}
      >
        <Formik onSubmit={onSubmitHandler} initialValues={initialValues} validationSchema={validationSchema}>
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <form onSubmit={handleSubmit} className="w-full" >
                <div className="mb-3">
                  <label htmlFor="name">Nome <span className="text-red-500 text-sm">*</span> </label>
                  <Field
                    name="name"
                    id="name"
                    type="text"
                    placeholder='Digite o nome do usuário'
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage name='name' className='text-red-500 capitalize' component={'p'} />
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Email <span className="text-red-500 text-sm">*</span> </label>
                  <Field
                    name="email"
                    id="email"
                    type="text"
                    placeholder='Digite o email do usuário'
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage name='email' className='text-red-500 capitalize' component={'p'} />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile">Telefone <span className="text-red-500 text-sm">*</span> </label>
                  <Field
                    name="mobile"
                    id="mobile"
                    type="text"
                    placeholder='Digite o telefone do usuário'
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage name='mobile' className='text-red-500 capitalize' component={'p'} />
                </div>

                <div className="mb-3">
                  <label htmlFor="dob">Data de Nascimento <span className="text-red-500 text-sm">*</span> </label>
                  <Calendar
                    className='w-full my-2 border outline-none py-3 px-4 ring-0'
                    maxDate={new Date()}
                    inputClassName='outline-none ring-0'
                    placeholder='Selecione a data de nascimento'
                    dateFormat='dd/mm/yy'
                    value={values.dob}
                    onChange={(e) => {
                      setFieldValue('dob', e.value)
                    }}
                  />
                  <ErrorMessage name='dob' className='text-red-500 capitalize' component={'p'} />
                </div>

                <div className="mb-3">
                  <label htmlFor="address">Endereço <span className="text-red-500 text-sm">*</span> </label>
                  <Field
                    as="textarea"
                    rows={3}
                    name="address"
                    id="address"
                    type="text"
                    placeholder='Digite o endereço do usuário'
                    className="w-full my-2 border outline-none py-3 px-4"
                  />
                  <ErrorMessage name='address' className='text-red-500 capitalize' component={'p'} />
                </div>

                <div className="flex justify-end">
                  <Button
                    loading={RegisterConsumerResponse.isLoading}
                    className="text-white px-5 rounded-sm bg-indigo-500 py-3 text-center "
                  >
                    Adicionar Usuário
                  </Button>
                </div>
              </form>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

export default Model