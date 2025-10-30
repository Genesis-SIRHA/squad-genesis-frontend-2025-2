import ProgressBar from "@/lib/components/ProgressBar.tsx";
import useRequestPercentages from "@/hooks/useRequestPercentages.ts";

const StudentStats = ({userId}: { userId: string }) => {
    const {requestsComplete, requestsPending, requestsRevision, requestsRejected} = useRequestPercentages(userId);

    return (
        <div className="flex flex-row h-1/3 gap-8">
            <div className="flex flex-col h-full w-2/3">
                <div className="flex flex-row items-center justify-between p-5 w-full h-full rounded-xl bg-white shadow-sm">
                    <div className="w-full px-10">
                        <div className="text-primary-mate font-bold">Solicitudes asignadas</div>
                        <div className="flex flex-row items-center w-full h-full gap-8">
                            <div className="flex flex-col h-full w-1/3 gap-2 mt-2">
                                <ProgressBar label="Aceptadas" value={requestsComplete} />
                                <ProgressBar label="Rechazadas" value={requestsRejected} />
                                <ProgressBar label="En revisión" value={requestsPending} />
                                <ProgressBar label="Pendientes" value={requestsRevision} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentStats;