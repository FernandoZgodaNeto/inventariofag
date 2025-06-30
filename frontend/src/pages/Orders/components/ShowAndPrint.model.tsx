/**
 * Modal para Visualizar e Imprimir Pedido
 * Exibe detalhes completos do pedido e permite gerar PDF
 */

import { Dialog } from 'primereact/dialog'
import { useGetInvoiceByIdQuery } from '../../../provider/queries/Orders.query'
import Loader from '../../../components/Loader';
import moment from 'moment';
import Barcode from 'react-barcode';
import { usePDF } from 'react-to-pdf';

const ShowAndPrintModel = ({ setVisible, visible, id }: any) => {
  // Query para buscar dados do pedido por ID
  const { data, isLoading, isError, isFetching } = useGetInvoiceByIdQuery(id);

  // Hook para gerar PDF
  const { toPDF, targetRef } = usePDF();

  // Exibe loader durante carregamento
  if (isFetching || isLoading) {
    return <Loader />
  }

  // Exibe mensagem de erro em caso de falha
  if (isError) {
    return <>
      Algo deu errado
    </>
  }

  // Interface para os itens do pedido
  type OrderDoc = {
    name: string
    id: string
    price: number
  }

  return (
    <>
      <Dialog
        draggable={false}
        visible={visible}
        className=' w-[90%] mx-auto lg:mx-0 lg:w-1/2'
        onHide={() => setVisible(false)}
      >
        {/* Área de conteúdo para PDF */}
        <div ref={targetRef} className="m-0 px-5">
          {/* Cabeçalho com informações do cliente e fornecedor */}
          <div className="flex items-start gap-x-10 py-5  justify-between ">
            <div className="w-1/2 flex  flex-col gap-y-2">
              <h1 className="font-semibold text-xl capitalize">
                {data && data.consumer && data.consumer.name}
              </h1>
              <p className='text-sm'>{data.consumer && data.consumer.address}</p>
              <p className='font-semibold'>Data: {moment(new Date(data.createdAt)).format("lll")} </p>
            </div>
            <div className="w-1/2">
              <Barcode displayValue={false} width={1} height={50} value={data && data._id} />
              <h1 className='font-semibold'>Fornecedor: {data && data.user.name} </h1>
            </div>
          </div>

          {/* Tabela de itens do pedido */}
          <div className="items py-2">
            <table className="border w-full">
              <thead className='border'>
                <tr>
                  <th className='border py-2'>ID</th>
                  <th className='border py-2'>Item</th>
                  <th className='border py-2'>Preço (em R$) </th>
                </tr>
              </thead>

              <tbody>
                {data.items && data.items.length > 0 && data.items.map((c: OrderDoc, i: number) => {
                  return <tr key={i} className='py-2'>
                    <td className='border text-center py-2'>{i + 1}</td>
                    <td className='border text-center py-2 capitalize'>{c.name}</td>
                    <td className='border text-center py-2'>R$ {c.price}</td>
                  </tr>
                })}
              </tbody>

              {/* Rodapé com total */}
              <tfoot>
                <tr>
                  <th colSpan={2} className='border capitalize text-center py-2'>
                    Total
                  </th>
                  <th className='border capitalize text-center py-2'>
                    R$ {
                      data.items && data.items.length > 0 && data.items.map((cur: OrderDoc) => cur.price).reduce((a: any, c: any) => a + c, 0)
                    }
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Botão para gerar PDF */}
        <footer>
          <button
            className='px-6 py-2 outline-none bg-red-500 rounded-md text-white'
            onClick={() => toPDF({
              method: 'open',
              page: {
                format: 'A4'
              }
            })}
          >
            Gerar PDF
          </button>
        </footer>
      </Dialog>
    </>
  )
}

export default ShowAndPrintModel