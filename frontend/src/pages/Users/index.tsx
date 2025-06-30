/**
 * Página de Usuários
 * Exibe lista de usuários com funcionalidades de busca, paginação e gerenciamento
 */

import { FormEvent, useState } from 'react';
import BredCrums from '../../components/BredCrums';
import Model from './Components/Model.user';
import { useGetAllConsumersQuery } from '../../provider/queries/Users.query';
import Loader from '../../components/Loader';
import TableCard from './Components/Card.user';
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate, useSearchParams } from 'react-router-dom';

const UserPage = () => {
  // Estado para controlar a visibilidade do modal de adicionar usuário
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()

  // Parâmetros de busca da URL
  const [SearchParams] = useSearchParams();
  const [Search, setSearch] = useState(SearchParams.get("query") || '');

  // Query para buscar usuários com paginação e filtros
  const { isLoading, data, isFetching } = useGetAllConsumersQuery({
    query: SearchParams.get("query") || '',
    page: SearchParams.get("page") || 1
  })

  /**
   * Navega para a próxima página de resultados
   */
  const OnNextPageHandler = () => {
    const page = Number(SearchParams.get("page")) || 1;
    const query = SearchParams.get("query") || '';

    let string = ``;
    if (query) {
      string = `?query=${query}&page=${page + 1}`
    } else {
      string = `?page=${page + 1}`
    }

    navigate(`/user` + string);
  }

  /**
   * Navega para a página anterior de resultados
   */
  const onPrevPageHandler = () => {
    const page = Number(SearchParams.get("page")) || 1;
    const query = SearchParams.get("query") || '';

    let string = ``;
    if (query) {
      string = `?query=${query}&page=${page - 1}`
    } else {
      string = `?page=${page - 1}`
    }

    navigate(`/user` + string);
  }

  /**
   * Manipula a busca de usuários
   * @param {FormEvent<HTMLFormElement>} e - Evento do formulário
   */
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let string = `?query=${Search}&page=${1}`
    navigate(`/user` + string);
  }

  return (
    <>
      <BredCrums PageLink='/user' PageName='Usuários' />

      {/* Botão para adicionar novo usuário */}
      <div className="mb-3 flex justify-end w-[90%] mx-auto">
        <button 
          onClick={() => setVisible(!visible)} 
          className="px-5 py-2 bg-sky-500 text-white rounded-sm rounded-lg"
        >
          Novo Usuário
        </button>
      </div>

      {/* Formulário de busca */}
      <form onSubmit={onSubmitHandler} className="mb-3 flex justify-end w-[90%] mx-auto">
        <input
          value={Search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="w-[90%] mx-auto lg:mx-0 lg:w-1/2 rounded-sm border py-3 px-5 outline-none rounded-lg"
          placeholder="Buscar Usuário"
        />
      </form>

      {/* Controles de paginação */}
      <div className={`mb-3 flex ${(Number(SearchParams.get("page")) || 1) > 1 ? 'justify-between' : 'justify-end'} w-[90%] mx-auto`}>
        {(Number(SearchParams.get("page")) || 1) > 1 &&
          <button 
            onClick={onPrevPageHandler} 
            title='Página Anterior' 
            className="text-black text-xl lg:text-3xl p-2"
          >
            <BsArrowLeftCircle />
          </button>
        }

        {data && data.more &&
          <button 
            onClick={OnNextPageHandler} 
            title='Próxima Página' 
            className="text-black text-xl lg:text-3xl p-2"
          >
            <BsArrowRightCircle />
          </button>
        }
      </div>

      {/* Tabela de usuários */}
      <div className="w-full">
        {isLoading || isFetching ? (
          <Loader />
        ) : (
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
                    Telefone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.users && data.users.length > 0 && data.users.map((c: any, i: number) => {
                  return <TableCard key={i} id={i + 1} data={c} />
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal para adicionar/editar usuário */}
      <Model visible={visible} setVisible={setVisible} />
    </>
  )
}

export default UserPage