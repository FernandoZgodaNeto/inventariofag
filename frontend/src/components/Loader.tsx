/**
 * Componente de Carregamento
 * Exibe um indicador visual durante operações assíncronas
 */

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600">Carregando...</span>
    </div>
  )
}

export default Loader