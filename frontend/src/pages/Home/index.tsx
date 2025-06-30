/**
 * Página Inicial (Dashboard)
 * Exibe gráficos e estatísticas do sistema em formato de dashboard
 */

import BasicChart from "./components/Basic"
import PieChartDemo from "./components/Pie"

const HomePage = () => {
    return (
        <div className="w-full flex flex-wrap gap-4 p-4">
            {/* Gráfico de barras com estatísticas */}
            <BasicChart />

            {/* Gráfico de pizza com estatísticas */}
            <PieChartDemo />
        </div>
    )
}

export default HomePage