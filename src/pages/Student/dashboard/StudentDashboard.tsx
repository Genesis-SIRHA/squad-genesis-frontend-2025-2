import useRequestByUserId from "./hooks/useRequestById.ts";
import RequestFlag from "./components/RequestFlag.tsx";

const DashBoard = () => {
    const userId = "A123456789";
    const {requests, loading} = useRequestByUserId(userId);

    if (loading){
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-row h-full w-full">
            <div className="flex flex-col px-12 pt-6 h-full w-full gap-8">
                <div className="rounded-lg bg-white h-1/4">
                </div>

                <div className="rounded-t-3xl bg-primary-smoke h-4/5">
                    <div className="flex flex-row px-12 rounded-t-3xl bg-white h-15 items-center">
                        <p className="text-primary-mate font-bold w-1/2">Nombre</p>
                        <p className="text-primary-mate font-bold w-1/6">Tipo</p>
                        <p className="text-primary-mate font-bold w-1/6">Fecha</p>
                        <p className="text-primary-mate font-bold w-1/6">Estado</p>
                    </div>

                    <div className="px-12 py-4 space-y-2">
                        {requests && requests.length > 0 ? (
                            requests.map((request) => (
                                <RequestFlag request={request} />
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