/**
 * Layout Principal da Aplicação
 * Define a estrutura base com sidebar de navegação e área de conteúdo
 */

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarSlicePath, toggleSidebar } from '../provider/slice/Sidebar.slice';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FiBox } from "react-icons/fi";
import { Link } from 'react-router-dom';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // Estado da sidebar do Redux
  const selector = useSelector(SidebarSlicePath)
  const dispatch = useDispatch()

  return (
    <>
      <div className="flex items-start lg:gap-x-2">
        {/* Sidebar de navegação */}
        <Sidebar collapsed={selector.collapsed} breakPoint="lg" toggled={selector.toggle} >
          <Menu >
            {/* Botão de toggle para dispositivos móveis */}
            <MenuItem 
              className="lg:hidden" 
              onClick={() => dispatch(toggleSidebar())} 
            >
              {selector.toggle ?
                <IoIosArrowDropright className="text-2xl" /> :
                <IoIosArrowDropleft className="text-2xl" />
              }
            </MenuItem>

            {/* Item de menu - Dashboard */}
            <MenuItem 
              component={<Link to="/" />} 
              icon={<MdOutlineSpaceDashboard className="text-2xl" />} 
            >
              Painel de Controle
            </MenuItem>

            {/* Item de menu - Pedidos */}
            <MenuItem 
              component={<Link to="/orders" />} 
              icon={<FiBox className="text-2xl" />}
            >
              Pedidos
            </MenuItem>

            {/* Item de menu - Usuários */}
            <MenuItem 
              component={<Link to="/user" />} 
              icon={<FiUser className="text-2xl" />} 
            >
              Usuários
            </MenuItem>
          </Menu>
        </Sidebar>

        {/* Área de conteúdo principal */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </>
  )
}

export default MainLayout 