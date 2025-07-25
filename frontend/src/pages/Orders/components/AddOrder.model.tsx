/**
 * Modal para Adicionar Pedido
 * Permite criar novos pedidos selecionando usuários e adicionando itens
 */

import { Dialog } from 'primereact/dialog';
import { ErrorMessage, Field, Formik, FieldArray } from 'formik';
import { toast } from 'sonner'
import * as yup from 'yup';
import { useGetForSearchUserQuery } from '../../../provider/queries/Users.query';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FaTrashAlt } from "react-icons/fa";
import Loader from '../../../components/Loader';
import moment from 'moment';
import { useCreateOrderMutation } from '../../../provider/queries/Orders.query';

const AddOrderModel = ({ visible, setVisible }: any) => {
    // Mutation para criar novo pedido
    const [CreateOrder] = useCreateOrderMutation()

    // Query para buscar usuários para seleção
    const { isLoading, isFetching, data } = useGetForSearchUserQuery({});

    // Exibe loader durante carregamento
    if (isLoading || isFetching) {
        return <Loader />
    }

    // const countries = [
    //     { name: 'Australia', code: 'AU' },
    //     { name: 'Brazil', code: 'BR' },
    //     { name: 'China', code: 'CN' },
    //     { name: 'Egypt', code: 'EG' },
    //     { name: 'France', code: 'FR' },
    //     { name: 'Germany', code: 'DE' },
    //     { name: 'India', code: 'IN' },
    //     { name: 'Japan', code: 'JP' },
    //     { name: 'Spain', code: 'ES' },
    //     { name: 'United States', code: 'US' }
    // ];

    /**
     * Template para exibir usuário selecionado no dropdown
     * @param {Object} option - Opção selecionada
     * @param {Object} props - Propriedades do componente
     */
    const selectedCountryTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div className='capitalize'>{option.name}- {moment(new Date(option.dob)).format("L")} </div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    /**
     * Template para exibir opções do dropdown
     * @param {Object} option - Opção do dropdown
     */
    const countryOptionTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag `} style={{ width: '18px' }} />
                <div>{option.name} - {moment(new Date(option.dob)).format("L")}  </div>
            </div>
        );
    };

    // Schema de validação usando Yup
    const validationSchema = yup.object({
        user: yup.mixed().required("Usuário é obrigatório"),
    })

    // Valores iniciais do formulário
    const initialValues = {
        user: null,
        items: [
        ]
    }
    // @ts-ignore
    /**
     * Manipula o envio do formulário de criação de pedido
     * @param {Object} e - Dados do formulário
     * @param {Object} resetForm - Função para resetar o formulário
     */
    const onSubmitHandler = async (e: any, { resetForm }: any) => {
        try {
            // console.log(e)
            const { data, error }: any = await CreateOrder({ ...e, user: e.user._id })

            if (error) {
                toast.error(error.data.message);
                return
            }

            // toast.success(data.msg)
            console.log(data);
            resetForm()
            setVisible(false)
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return (
        <>

            <Dialog draggable={false} header="Adicionar Pedido" position='top' visible={visible} className=" w-full md:w-[70%] lg:w-[60%]" onHide={() => setVisible(false)}>

                <Formik onSubmit={onSubmitHandler} initialValues={initialValues} validationSchema={validationSchema}>
                    {({ values, setFieldValue, handleSubmit }) => (
                        <>
                            <form onSubmit={handleSubmit} className="w-full" >
                                <div className="mb-3">
                                    <label htmlFor="name">Usuário <span className="text-red-500 text-sm">*</span> </label>

                                    <Dropdown value={values.user} onChange={(e) => setFieldValue('user', e.value)} filterBy='name' options={data && data.users} filterPlaceholder='Buscar usuário por nome' optionLabel="user" placeholder="Selecione um usuário"
                                        emptyFilterMessage="Nenhum usuário encontrado"
                                        emptyMessage="Você não tem usuários"
                                        filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full my-2 border outline-none  ring-0" />

                                    <ErrorMessage name='user' className='text-red-500 capitalize' component={'p'} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="name">Itens <span className="text-red-500 text-sm">*</span> </label>
                                    <FieldArray name='items'>
                                        {({ push, remove }) => (
                                            <>
                                                <div className="mb-3 flex justify-end">
                                                    <button type='button' onClick={() => { push({ name: '', price: '' }) }} className='bg-purple-500 px-4  text-white py-2 rounded-md'>Adicionar +</button>
                                                </div>
                                                {
                                                    values.items.length > 0 && values.items.map((_, i) => {


                                                        return <div className='w-full flex items-center justify-between gap-x-4' key={i}>
                                                            <div className="w-1/2">
                                                                <Field name={`items[${i}].name`} className="w-full my-2 border outline-none py-3 px-4" placeholder="Nome do item" />
                                                                {/* <ErrorMessage name={`items[${i}].name`} className='text-red-500 capitalize' component={'p'} /> */}


                                                            </div>
                                                            <div className="w-1/2">
                                                                <Field type="number" name={`items[${i}].price`} className="w-full my-2 border outline-none py-3 px-4" placeholder="Preço do item" />
                                                                {/* <ErrorMessage name={`items[${i}].price`} className='text-red-500 capitalize' component={'p'} /> */}

                                                            </div>
                                                            <div className="">
                                                                <button onClick={() => { remove(i) }} type='button' className="px-3 py-3 rounded-full bg-black text-white"><FaTrashAlt /></button>
                                                            </div>
                                                        </div>
                                                    })
                                                }

                                            </>
                                        )}

                                    </FieldArray>


                                    <ErrorMessage name='items' className='text-red-500 capitalize' component={'p'} />
                                </div>






                                <div className="flex justify-end">
                                    <Button className="text-white px-5 rounded-sm bg-indigo-500 py-3 text-center ">Adicionar Pedido</Button>
                                </div>

                            </form>
                        </>
                    )}

                </Formik>

            </Dialog>
        </>
    )
}

export default AddOrderModel