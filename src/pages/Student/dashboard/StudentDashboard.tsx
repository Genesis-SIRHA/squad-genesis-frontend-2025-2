import useRequestByUserId from "../../../hooks/useRequestByUserId.ts";
import RequestCard from "./components/RequestCard.tsx";
import {useContext, useState} from "react";
import loadingAnimation from "@/assets/animations/Loading.json";
import Lottie from "lottie-react";
import {AuthContext} from "@/context/AuthContext.tsx";
import useCompletedPercentage from "@/hooks/useCompletedPercentage.ts";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useRequestPercentages from "@/hooks/useRequestPercentages.ts";

ChartJS.register(ArcElement, Tooltip, Legend);


const DashBoard = () => {
    const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("Header must be used within an AuthProvider");
    }

    const { user } = authContext;
    const userId = user?.userId;
    const {requests, loading} = useRequestByUserId(userId as string, "STUDENT");
    const { percentage: completedPercentage } = useCompletedPercentage(userId as string);
    const { requestsComplete, requestsPending, requestsRejected } = useRequestPercentages(userId as string);

    const remainingPercentage = 100 - (completedPercentage || 0);
    const incompletePercentage = remainingPercentage < 0 ? remainingPercentage : remainingPercentage;

    const fill = requestsComplete + requestsRejected+requestsPending ? 0 : 100;

    const progressData = {
        labels: ['Completado', 'Incompleto'],
        datasets: [
            {
                data: [completedPercentage, incompletePercentage],
                backgroundColor: ['#59F4BE', '#d1d1d1'],
                borderWidth: 0,
            },
        ],
    };

    const requestData = {
        labels: ['Aceptadas', 'Rechazadas', 'Pendientes'],
        datasets: [
            {
                data: [requestsComplete, requestsRejected, requestsPending , fill],
                backgroundColor: ['#59F4BE', '#F45369', '#fdcb69', '#d1d1d1'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: '60%',
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
    };

    const toggleRequest = (requestId: string) => {
        setActiveRequestId(prevId => prevId === requestId ? null : requestId);
    };

    if (loading){
        return <div className="w-full h-full flex items-center justify-center">
            <div className="w-1/8 h-1/8">
                <Lottie
                    animationData={loadingAnimation}
                    loop
                    autoplay
                />
            </div>
        </div>
    }

    return (
        <div className="flex flex-col h-full w-full overflow-y-auto scrollable-container">
            <div className="flex flex-col px-8 pt-8 h-full w-full gap-8">
                <div className="flex flex-row h-1/3 gap-8">
                    <div className="flex flex-row items-center justify-between p-5 w-2/3 h-full rounded-xl bg-white shadow-sm">
                        <div className="flex-1 flex flex-col px-8 py-4 gap-4">
                            <div className="text-primary-mate font-bold"> Progreso academico </div>
                            <div className="flex flex-row gap-4 items-center">
                                <div className="w-30 h-30">
                                    <Doughnut className="w-1/2 h-1/2" data={progressData} options={options} />
                                </div>
                                <div className="flex flex-col gap-4 justify-center">
                                    <div className="flex flex-row gap-4 items-center"><div className="h-6 w-6 bg-secondary-success rounded-lg"/><p>Completado</p></div>
                                    <div className="flex flex-row gap-4 items-center"><div className="h-6 w-6 bg-secondary-neutral rounded-lg"/><p>Pendiente</p></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col px-8 py-4 gap-4">
                            <div className="text-primary-mate font-bold"> Estado solicitudes </div>
                            <div className="flex flex-row gap-4 items-center">
                                <div className="w-30 h-30">
                                    <Doughnut className="w-1/2 h-1/2" data={requestData} options={options} />
                                </div>
                                <div className="flex flex-col gap-4 justify-center">
                                    <div className="flex flex-row gap-4 items-center"><div className="h-6 w-6 bg-secondary-success rounded-lg"/><p>Completado</p></div>
                                    <div className="flex flex-row gap-4 items-center"><div className="h-6 w-6 bg-secondary-neutral rounded-lg"/><p>Pendiente</p></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-row items-center justify-center w-1/3 h-full rounded-xl bg-customGradient shadow-sm">

                    </div>
                </div>

                <div className="rounded-t-3xl bg-primary-smoke shadow-sm min-h-full h-auto">
                    <div className="flex flex-row px-16 rounded-t-3xl bg-white h-15 items-center">
                        <div className="flex items-center w-1/2">
                            <p className="text-primary-mate font-bold">Nombre</p>
                        </div>

                        <div className="flex justify-center w-1/6">
                            <p className="text-primary-mate font-bold">Tipo</p>
                        </div>

                        <div className="flex justify-center w-1/6">
                            <p className="text-primary-mate font-bold">Fecha</p>
                        </div>

                        <div className="flex justify-center w-1/6">
                            <p className="text-primary-mate font-bold w-1/6">Estado</p>
                        </div>
                    </div>

                    <div className="px-6 py-4 space-y-4">
                        {requests && requests.length > 0 ? (
                            requests.map((request) => (
                                <RequestCard
                                    key={request.requestId}
                                    request={request}
                                    isActive={activeRequestId === request.requestId}
                                    onToggle={() => toggleRequest(request.requestId)}
                                    editable={false}
                                />
                            ))
                        ) : (
                            <p className="text-center py-4">No hay solicitudes disponibles</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
};

export default DashBoard;