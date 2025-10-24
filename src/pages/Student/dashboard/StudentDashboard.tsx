import useRequestByUserId from "./hooks/useRequestByUserId.ts";
import RequestFlag from "./components/RequestFlag.tsx";

const DashBoard = () => {
    const userId = "A123456789";
    const {requests, loading} = useRequestByUserId(userId, "STUDENT");

    if (loading){
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-row h-full w-full">
            <div className="flex flex-col px-12 pt-6 h-full w-full gap-8">
                <div className="flex flex-row h-1/4 gap-8">
                    <div className="flex flex-row items-center justify-center w-2/3 h-full rounded-xl bg-white">

                    </div>
                    <div className="flex flex-row items-center justify-center w-1/3 h-full rounded-xl bg-customGradient">

                    </div>
                </div>

                <div className="rounded-t-3xl bg-primary-smoke h-4/5">
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

                    <div className="px-6 py-4 space-y-2">
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