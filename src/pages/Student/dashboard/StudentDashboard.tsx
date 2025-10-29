import useRequestByUserId from "../../../hooks/useRequestByUserId.ts";
import RequestCard from "./components/RequestCard.tsx";
import {useContext, useState} from "react";
import loadingAnimation from "@/assets/animations/Loading.json";
import Lottie from "lottie-react";
import {AuthContext} from "@/context/AuthContext.tsx";

const DashBoard = () => {
    const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("Header must be used within an AuthProvider");
    }
    const { user } = authContext;
    const userId = user?.userId;
    const {requests, loading} = useRequestByUserId(userId as string, "STUDENT");

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
                    <div className="flex flex-row items-center justify-center w-2/3 h-full rounded-xl bg-white shadow-sm">

                        <div className="flex-1 flex flex-col px-8 py-4 gap-4">
                            <div className="text-primary-mate font-bold"> Progreso academico </div>
                            <div className="flex flex-row gap-4 items-center">
                                <img className="h-30 w-30 justify-center" src="public/images/user-profile.svg" alt="progress"/>
                                <div className="flex flex-col gap-4 justify-center">
                                    <div className="flex flex-row gap-4 items-center"><div className="h-6 w-6 bg-green-400 rounded-lg"/><p>Completado</p></div>
                                    <div className="flex flex-row gap-4 items-center"><div className="h-6 w-6 bg-blue-500 rounded-lg"/><p>En progreso</p></div>
                                    <div className="flex flex-row gap-4 items-center"><div className="h-6 w-6 bg-red-400 rounded-lg"/><p>Pendiente</p></div>
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