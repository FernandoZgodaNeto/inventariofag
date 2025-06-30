/**
 * Componente de Card de Pedido
 * Exibe informações de um pedido em formato de linha de tabela
 */

import { ConfirmDialog } from 'primereact/confirmdialog'
import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { toast } from 'sonner'
import { Button } from 'primereact/button'
import { BsPrinter } from 'react-icons/bs'
import { useDeleteOrderMutation } from '../../../provider/queries/Orders.query'
import ShowAndPrintModel from './ShowAndPrint.model'
// import UpdateModel from './UpdateModel.user'

const TableCard = ({ data, id }: any) => {
    // Mutation para deletar pedido
    const [DeleteConsumer, DeleteConsumerResponse] = useDeleteOrderMutation()

    // Estado para controlar visibilidade do modal de visualização
    const [visible, setVisible] = useState(false);

    /**
     * Manipula a exclusão de um pedido
     * @param {string} _id - ID do pedido a ser excluído
     */
    const deleteHandler = async (_id: string) => {
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
    };

    return (
        <>
            <tr className="bg-white border-b  ">
                {/* ID do pedido */}
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {id}
                </th>
                {/* Nome do consumidor */}
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {data?.consumer?.name}
                </th>
                {/* Email do consumidor */}
                <td className="px-6 py-4">
                    {data?.consumer?.email}
                </td>
                {/* Lista de itens do pedido */}
                <td className="px-6 py-4">
                    <ul>
                        {
                            data.items.length > 0 && data.items.map((cur: any, i: number) => {
                                return <li key={i}>{cur?.name} - R${cur?.price}</li>
                            })
                        }
                    </ul>
                </td>
                {/* Ações do pedido */}
                <td className="px-6 py-4">
                    <button
                        onClick={() => setVisible(!visible)}
                        title="Visualizar"
                        className="p-4 bg-teal-500 text-white rounded-sm mx-2"
                    >
                        <BsPrinter className="text-xl" />
                    </button>
                    {/* <button onClick={() => setVisible(!visible)} title="Edit " className="p-4 bg-orange-400 text-white rounded-sm mx-2"><FaRegEdit className="text-xl" /> </button> */}
                    <Button
                        loading={DeleteConsumerResponse.isLoading}
                        onClick={() => deleteHandler(data._id)}
                        title="Excluir"
                        className="p-4 bg-red-500 text-white rounded-sm mx-2"
                    >
                        <FaRegTrashAlt className="text-xl" />
                    </Button>
                </td>
            </tr>
            {/* <UpdateModel visible={visible} setVisible={setVisible} _id={data._id} /> */}
            <ShowAndPrintModel id={data._id} visible={visible} setVisible={setVisible} />
            <ConfirmDialog id='order.queruies' acceptClassName='' className=' ' contentClassName='py-2 ' closable />
        </>
    )
}

export default TableCard