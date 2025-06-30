/**
 * Componente de Cabeçalho
 * Contém os controles de navegação e logout da aplicação
 */

import { useDispatch } from 'react-redux'
import { collapsedSidebar, toggleSidebar } from '../provider/slice/Sidebar.slice';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { removeUser } from '../provider/slice/user.slice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Manipuladores para controlar a sidebar
  const sidebarHandler = () => dispatch(collapsedSidebar())
  const sidebarHandlerToggle = () => dispatch(toggleSidebar())

  /**
   * Manipula o logout do usuário
   * Remove o token do localStorage e redireciona para login
   */
  const logoutHandler = () => {
    try {
      localStorage.removeItem("token");
      dispatch(removeUser())
      navigate("/login");
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <header className="py-4 shadow md px-10 bg-stone-600 text-stone-100">
        <div className="nav flex items-center justify-between text-stone-100">
          {/* Botões de controle da sidebar */}
          <div className="btn">
            {/* Botão para dispositivos móveis */}
            <button 
              className='lg:hidden' 
              onClick={sidebarHandlerToggle}
              title="Alternar menu"
            >
              <HiOutlineMenuAlt3 className='text-2xl' /> 
            </button>
            
            {/* Botão para desktop */}
            <button 
              className='hidden lg:flex' 
              onClick={sidebarHandler}
              title="Colapsar menu"
            >
              <HiOutlineMenuAlt3 className='text-2xl' /> 
            </button>
          </div>
          
          {/* Botão de logout */}
          <div className="end">
            <button 
              title='Sair' 
              className='hidden lg:flex' 
              onClick={logoutHandler}
            >
              <IoLogOutOutline className='text-2xl' /> 
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header