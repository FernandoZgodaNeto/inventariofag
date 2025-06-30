/**
 * Página de Pedidos
 * Exibe lista de pedidos com funcionalidades de busca e paginação
 */

import { FormEvent, useState } from "react";
import BredCrums from "../../components/BredCrums";
import Loader from "../../components/Loader";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddOrderModel from "./components/AddOrder.model";
import { useGetAllOrdersQuery } from "../../provider/queries/Orders.query";
import TableCard from "./components/Card.order";

const OrdersPage = () => {
  // Estado para controlar a visibilidade do modal de adicionar pedido
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // Parâmetros de busca da URL
  const [SearchParams] = useSearchParams();
  const [Search, setSearch] = useState(SearchParams.get("query") || "");

  // Query para buscar pedidos com paginação e filtros
  const { data, isLoading, isError } = useGetAllOrdersQuery({
    query: SearchParams.get("query") || "",
    page: SearchParams.get("page") || 1,
  });

  // Exibe loader durante o carregamento
  if (isLoading) {
    return <Loader />;
  }

  // Exibe mensagem de erro em caso de falha
  if (isError) {
    return <h1>Algo deu errado</h1>;
  }

  /**
   * Manipula a busca de pedidos
   * @param {FormEvent<HTMLFormElement>} e - Evento do formulário
   */
  const SearchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let string = `?query=${Search}&page=${1}`;
    navigate(`/orders` + string);
  };

  /**
   * Navega para a próxima página de resultados
   */
  const OnNextPageHandler = () => {
    const page = Number(SearchParams.get("page")) || 1;
    const query = SearchParams.get("query") || "";

    let string = ``;
    if (query) {
      string = `?query=${query}&page=${page + 1}`;
    } else {
      string = `?page=${page + 1}`;
    }

    navigate(`/orders` + string);
  };

  /**
   * Navega para a página anterior de resultados
   */
  const onPrevPageHandler = () => {
    const page = Number(SearchParams.get("page")) || 1;
    const query = SearchParams.get("query") || "";

    let string = ``;
    if (query) {
      string = `?query=${query}&page=${page - 1}`;
    } else {
      string = `?page=${page - 1}`;
    }

    navigate(`/orders` + string);
  };

  return (
    <>
      <BredCrums PageLink="/orders" PageName="Pedidos" />

      {/* Botão para adicionar novo pedido */}
      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <button
          onClick={() => setVisible(!visible)}
          className="px-5 py-2 bg-sky-500 text-white rounded-sm rounded-lg"
        >
          Novo Pedido
        </button>
      </div>

      {/* Formulário de busca */}
      <form
        onSubmit={SearchHandler}
        className="mb-3 flex justify-end w-[90%] mx-auto rounded-lg"
      >
        <input
          value={Search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="w-[90%] mx-auto lg:mx-0 lg:w-1/2 rounded-sm border py-3 px-5 outline-none"
          placeholder="Buscar Pedidos"
        />
      </form>

      {/* Controles de paginação */}
      <div
        className={`mb-3 flex ${
          (Number(SearchParams.get("page")) || 1) > 1
            ? "justify-between"
            : "justify-end"
        } w-[90%] mx-auto`}
      >
        {(Number(SearchParams.get("page")) || 1) > 1 && (
          <button
            onClick={onPrevPageHandler}
            title="Página Anterior"
            className="text-black text-xl lg:text-3xl p-2"
          >
            <BsArrowLeftCircle />
          </button>
        )}

        {data && data.hasMore && (
          <button
            onClick={OnNextPageHandler}
            title="Próxima Página"
            className="text-black text-xl lg:text-3xl p-2"
          >
            <BsArrowRightCircle />
          </button>
        )}
      </div>

      {/* Tabela de pedidos */}
      <div className="relative overflow-x-auto shadow rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Itens
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data &&
              data.data.length > 0 &&
              data.data.map((c: any, i: number) => {
                return <TableCard key={i} id={i + 1} data={c} />;
              })}
          </tbody>
        </table>
      </div>

      {/* Modal para adicionar pedido */}
      <AddOrderModel visible={visible} setVisible={setVisible} />
    </>
  );
};

export default OrdersPage;
