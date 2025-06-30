/**
 * Página Inicial (Dashboard)
 * Exibe gráficos e estatísticas do sistema em formato de dashboard
 */

import BasicChart from "./components/Basic"

const HomePage = () => {
    return (
        <div className="w-full flex flex-wrap gap-4 p-4 justify-center">
            {/* Gráfico de barras com estatísticas */}
            <BasicChart />
        </div>
    )
}

export default HomePage