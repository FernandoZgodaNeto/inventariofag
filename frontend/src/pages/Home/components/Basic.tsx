/**
 * Componente de Gráfico de Barras
 * Exibe estatísticas do dashboard em formato de gráfico de barras
 */

import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useDashboardDataQuery } from '../../../provider/queries/Users.query';
import Loader from '../../../components/Loader';
import { useLocation } from 'react-router-dom';

export default function BasicChart() {
    // Query para buscar dados do dashboard
    const { data, isError, isLoading, isFetching } = useDashboardDataQuery({})
    const location = useLocation()

    // Estados para dados e opções do gráfico
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if (!data) {
            return
        }

        // Configuração dos dados do gráfico de barras
        const chartData = {
            labels: ['Usuários', 'Pedidos', 'Vendas'],
            datasets: [
                {
                    label: ['Total'],
                    data: [data.consumers, data.orders, data.sell],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                    ],
                    borderWidth: 1
                }
            ]
        };

        // Opções de configuração do gráfico
        const options = {
            scales: {
                y: {
                    beginAtZero: true
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
        <Chart type="bar" width='' className=' w-full lg:w-1/2 ' data={chartData} options={chartOptions} />
    )
}

