/**
 * Componente de Breadcrumbs
 * Exibe a navegação hierárquica da aplicação
 */

import { Link } from 'react-router-dom'

interface BreadcrumbsProps {
  PageName: string;
  PageLink: string;
}

const BredCrums = ({ PageName, PageLink }: BreadcrumbsProps) => {
  return (
    <>
      <div className="w-[96%] lg:w-[90%] mx-auto my-10 flex items-center justify-between">
        {/* Título da página */}
        <h1 className='text-4xl font-semibold leading-tight'>{PageName}</h1>
        
        {/* Navegação breadcrumb */}
        <ul className="flex items-center gap-x-2 text-blue-500">
          <li><span>Painel de Controle</span></li>
          <li><span>/</span></li>
          <li><Link to={PageLink}>{PageName}</Link></li>
        </ul>
      </div>
    </>
  )
}

export default BredCrums