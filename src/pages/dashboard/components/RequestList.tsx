import RequestCard from "./requestCard/RequestCard.tsx";

const RequestList = ({requests, activeRequestId, toggleRequest}: any) => (
    <div className="rounded-t-3xl bg-primary-smoke shadow-sm min-h-full h-auto">
        <div className="flex flex-row px-16 rounded-t-3xl bg-white h-15 items-center">
            <div className="flex items-center w-1/2"><p className="text-primary-mate font-bold">Nombre</p></div>
            <div className="flex justify-center w-1/6"><p className="text-primary-mate font-bold">Tipo</p></div>
            <div className="flex justify-center w-1/6"><p className="text-primary-mate font-bold">Fecha</p></div>
            <div className="flex justify-center w-1/6"><p className="text-primary-mate font-bold">Estado</p></div>
        </div>

        <div className="px-6 py-4 space-y-4">
            {requests.length > 0 ? (
                requests.map((request: any) => (
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
);

export default RequestList;
