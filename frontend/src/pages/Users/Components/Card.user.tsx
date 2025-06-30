/**
 * Componente de Card de Usuário
 * Exibe informações de um usuário em formato de linha de tabela
 */

import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { LuView } from 'react-icons/lu'
import { useDeleteConsumerMutation } from '../../../provider/queries/Users.query'
import { toast } from 'sonner'
import { Button } from 'primereact/button'
import UpdateModel from './UpdateModel.user'
import { locale, addLocale } from 'primereact/api'

addLocale('pt', {
    accept: 'Sim',
    reject: 'Não',
    // Outras traduções se necessário
})
locale('pt')

const TableCard = ({ data, id }: any) => {
    // Mutation para deletar usuário
    const [DeleteConsumer, DeleteConsumerResponse] = useDeleteConsumerMutation()

    // Estado para controlar visibilidade do modal de edição
    const [visible, setVisible] = useState(false);

    /**
     * Manipula a exclusão de um usuário com confirmação
     * @param {string} _id - ID do usuário a ser excluído
     */
    const deleteHandler = (_id: string) => {
        confirmDialog({
            message: 'Deseja realmente excluir este consumidor?',
            header: 'Confirmação de Exclusão',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                console.log("accept for " + _id);

                try {
                    const { data, error }: any = await DeleteConsumer(_id)

                    if (error) {
                        toast.error(error.data.message);
                        return
                    }
                    toast.success(data.msg)
                } catch (e: any) {
                    toast.error(e.message)
                }
            },
            reject: () => {
                console.log("reject for " + _id);
            }
        });
    };

    return (
        <>
            <tr className="bg-white border-b bg-stone-200">
                {/* ID do usuário */}
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {id}
                </th>
                {/* Nome do usuário */}
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {data.name}
                </th>
                {/* Email do usuário */}
                <td className="px-6 py-4">
                    {data.email}
                </td>
                {/* Telefone do usuário */}
                <td className="px-6 py-4">
                    {data.mobile}
                </td>
                {/* Ações do usuário */}
                <td className="px-6 py-4">
                    <button
                        onClick={() => setVisible(!visible)}
                        title="Visualizar"
                        className="p-4 bg-green-500 text-white rounded-sm mx-2"
                    >
                        <LuView className="text-xl" />
                    </button>
                    <button
                        onClick={() => setVisible(!visible)}
                        title="Editar"
                        className="p-4 bg-purple-500 text-white rounded-sm mx-2"
                    >
                        <FaRegEdit className="text-xl" />
                    </button>
                    <Button
                        loading={DeleteConsumerResponse.isLoading}
                        onClick={() => deleteHandler(data._id)}
                        title="Excluir consumidor"
                        className="p-4 bg-red-500 text-white rounded-sm mx-2"
                    >
                        <FaRegTrashAlt className="text-xl" />
                    </Button>
                </td>
            </tr>

            {/* Modal para editar usuário */}
            <UpdateModel visible={visible} setVisible={setVisible} _id={data._id} />

            <ConfirmDialog acceptClassName='' className=' ' contentClassName='py-2 ' closable />
        </>
    )
}

export default TableCard