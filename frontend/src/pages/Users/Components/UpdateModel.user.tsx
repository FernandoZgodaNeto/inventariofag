/**
 * Modal para Atualizar Usuário
 * Permite editar dados de usuários existentes
 */

import * as yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { toast } from 'sonner';
import { useGetConsumersQuery, useUpdateConsumerMutation } from '../../../provider/queries/Users.query';
import Loader from '../../../components/Loader';

const UpdateModel = ({ visible, setVisible, _id }: any) => {
    // Query para buscar dados do usuário
    const { isLoading, data } = useGetConsumersQuery(_id)

    // Mutation para atualizar usuário
    const [updateConsumer, updateConsumerResponse] = useUpdateConsumerMutation()

    // Exibe loader durante carregamento
    if (isLoading) {
        return <Loader />
    }

    // Schema de validação usando Yup
    const validationSchema = yup.object({
        name: yup.string().required("Nome é obrigatório"),
        email: yup.string().email("Email deve ser válido").required("Email é obrigatório"),
        mobile: yup.string().required("Telefone é obrigatório"),
        address: yup.string().required("Endereço é obrigatório"),
        dob: yup.string().required("Data de nascimento é obrigatória"),
    })

    // Valores iniciais do formulário com dados do usuário
    const initialValues = {
        name: data.user.name,
        email: data.user.email,
        mobile: data.user.mobile,
        address: data.user.address,
        dob: new Date(data.user.dob)
    }

    /**
     * Manipula o envio do formulário de atualização
     * @param {Object} e - Dados do formulário
     * @param {Object} setValues - Função para atualizar valores
     */
    const onSubmitHandler = async (e: any, { setValues }: any) => {
        try {
            console.log(e)
            const { data, error }: any = await updateConsumer({ data: e, _id: _id })

            if (error) {
                toast.error(error.data.message);
                return
            }

            // Atualiza os valores do formulário
            setValues({
                name: e.name,
                email: e.email,
                mobile: e.mobile,
                address: e.address,
                dob: new Date(e.dob)
            })
            toast.success(data.msg)
            setVisible(false)
        } catch (error: any) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <>
            <Dialog
                draggable={false}
                visible={visible}
                className=' w-[90%] mx-auto lg:mx-0 lg:w-1/2'
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
                                        id='dob'
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
                                        loading={updateConsumerResponse.isLoading}
                                        className="text-white px-5 rounded-sm bg-indigo-500 py-3 text-center "
                                    >
                                        Atualizar Usuário
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

export default UpdateModel