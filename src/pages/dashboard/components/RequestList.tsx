// RequestList.tsx
import { useState } from "react";
import RequestCard from "./requestCard/RequestCard.tsx";

interface RequestListProps {
    requests: any[];
    activeRequestId: string | null;
    toggleRequest: (id: string) => void;
    onCreateRequest: () => void;
    onSaveRequest: (request: any) => void;
    onCancelCreate: () => void;
    onAcceptRequest?: (requestId: string) => void;
    onRejectRequest?: (requestId: string) => void;
    userRole: 'student' | 'teacher';
}

const RequestList = ({
                         requests,
                         activeRequestId,
                         toggleRequest,
                         onCreateRequest,
                         onSaveRequest,
                         onCancelCreate,
                         onAcceptRequest,
                         onRejectRequest,
                         userRole
                     }: RequestListProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [newRequest, setNewRequest] = useState<any>(null);

    const handleCreateClick = () => {
        onCreateRequest();
    };

    const handleSaveNewRequest = (request: any) => {
        onSaveRequest(request);
    };

    const handleCancelCreate = () => {
        onCancelCreate();
    };

    return (
        <div className="rounded-t-3xl bg-primary-smoke shadow-sm min-h-full h-auto">
            {/* Header de la lista */}
            <div className="flex flex-row px-16 rounded-t-3xl bg-white h-15 items-center justify-between">
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
                    <p className="text-primary-mate font-bold">Estado</p>
                </div>

                {/* Botón de crear solo para estudiantes */}
                {userRole === 'student' && (
                    <div className="flex justify-end w-auto ml-4">
                        <button
                            onClick={handleCreateClick}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm"
                        >
                            + Crear Solicitud
                        </button>
                    </div>
                )}
            </div>

            <div className="px-6 py-4 space-y-4">
                {/* Lista de solicitudes existentes */}
                {requests.length > 0 ? (
                    requests.map((request: any) => (
                        <RequestCard
                            key={request.requestId}
                            request={request}
                            isActive={activeRequestId === request.requestId}
                            onToggle={() => toggleRequest(request.requestId)}
                            mode={userRole === 'teacher' ? 'respond' : 'view'}
                            onSave={onSaveRequest}
                            onCancel={handleCancelCreate}
                            onAccept={onAcceptRequest}
                            onReject={onRejectRequest}
                        />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No hay solicitudes disponibles</p>
                        {userRole === 'student' && (
                            <button
                                onClick={handleCreateClick}
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                            >
                                Crear primera solicitud
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestList;