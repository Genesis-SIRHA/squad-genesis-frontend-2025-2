import {Doughnut} from "react-chartjs-2";
import ProgressBar from "@/lib/components/ProgressBar.tsx";
import useProgressPercentage from "@/hooks/useProgressPercentage.ts";
import useRequestPercentages from "@/hooks/useRequestPercentages.ts";

export const StudentStats = ({userId}: { userId: string }) => {
    const {percentage: progressPercentage} = useProgressPercentage(userId);
    const {requestsComplete, requestsPending, requestsRevision, requestsRejected} = useRequestPercentages(userId);

    const remaining = 100 - (progressPercentage || 0);

    const progressData = {
        labels: ["Completado", "Incompleto"],
        datasets: [
            {
                data: [progressPercentage, remaining],
                backgroundColor: ["#59F4BE", "#d1d1d1"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "60%",
        plugins: {
            legend: {display: false},
            tooltip: {enabled: true},
        },
    };

    return (
        <div className="flex flex-row h-1/3 gap-8">
            <div className="flex flex-col h-full w-2/3">
                <div className="flex flex-row items-center justify-between p-5 w-full h-full rounded-xl bg-white shadow-sm">
                    <div className="flex-1 flex flex-col h-full w-full px-8 py-4 gap-2">
                        <div className="text-primary-mate font-bold">Progreso académico</div>
                        <div className="flex flex-row items-center w-full h-full">
                            <div className="w-full h-full p-5">
                                <Doughnut data={progressData} options={options} />
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-secondary-success text-white text-xs font-semibold flex items-center justify-center rounded-sm">
                                        {progressPercentage}%
                                    </div>
                                    <span className="text-sm text-foreground">Completado</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-secondary-neutral text-white text-xs font-semibold flex items-center justify-center rounded-sm">
                                        {100 - progressPercentage}%
                                    </div>
                                    <span className="text-sm text-foreground">Incompleto</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col h-full w-full px-8 py-4 gap-2">
                        <div className="text-primary-mate font-bold">Estado solicitudes</div>
                        <div className="flex flex-col w-full h-full gap-2 items-center justify-center">
                            <ProgressBar label="Aceptadas" value={requestsComplete} />
                            <ProgressBar label="Rechazadas" value={requestsRejected} />
                            <ProgressBar label="En revisión" value={requestsPending} />
                            <ProgressBar label="Pendientes" value={requestsRevision} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};