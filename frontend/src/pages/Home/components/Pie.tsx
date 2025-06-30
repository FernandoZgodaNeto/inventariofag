/**
 * Componente de Gráfico de Pizza
 * Exibe estatísticas do dashboard em formato de gráfico circular
 */

import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useDashboardDataQuery } from '../../../provider/queries/Users.query';
import { useLocation } from 'react-router-dom';
import Loader from '../../../components/Loader';

export default function PieChartDemo() {
    // Estados para dados e opções do gráfico
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    // Query para buscar dados do dashboard
    const { data, isError, isLoading, isFetching } = useDashboardDataQuery({})
    const location = useLocation()

    useEffect(() => {
        if (!data) {
            return
        }

        const documentStyle = getComputedStyle(document.documentElement);

        // Configuração dos dados do gráfico de pizza
        const chartData = {
            labels: ['Usuários', 'Pedidos', 'Vendas'],
            datasets: [
                {
                    data: [data.consumers, data.orders, data.sell],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }

        // Opções de configuração do gráfico
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(chartData);
        setChartOptions(options);
    }, [data, location]);

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

    return (
        <Chart type="pie" data={chartData} options={chartOptions} className="w-full lg:w-1/2" />
    )
}
