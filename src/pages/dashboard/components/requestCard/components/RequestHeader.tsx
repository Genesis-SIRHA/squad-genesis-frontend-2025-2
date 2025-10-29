import {ChevronDown} from "lucide-react";

const RequestHeader = ({ isActive, onToggle, courseName, type, createdAt, status }) => {
    const formatDate = (date: Date | string): string => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getRequestTypeLabel = (type: string): string => {
        const typeMap: Record<string, string> = {
            SWAP: 'Intercambio',
            CANCELLATION: 'Cancelación',
            JOIN: 'Inscripción',
        };
        return typeMap[type] || type;
    };

     const getRequestStatusLabel = (status: string): string => {
        const statusMap: Record<string, string> = {
            ACCEPTED: 'Aceptada',
            PENDING: 'Pendiente',
            WAITING: 'Esperando',
            REJECTED: 'Rechazada',
            CANCELLED: 'Cancelada',
        };
        return statusMap[status] || status;
    };



    return (
        <div className={`flex flex-row pl-4 pr-8 py-2 border border-gray-100 bg-white shadow-sm items-center duration-500 ${isActive ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
            <button onClick={onToggle} className={`rounded-full text-primary-mid p-2 transform transition-transform ${isActive ? 'rotate-180' : ''}`}>
                <ChevronDown className="size-5" />
            </button>
            <div className="flex w-1/2">
                <p className="text-primary-mate w-5/12">{courseName || "loading..."}</p>
            </div>
            <div className="flex justify-center w-1/6">
                <p className="text-primary-mate">{getRequestTypeLabel(type)}</p>
            </div>
            <div className="flex justify-center w-1/6">
                <p className="text-primary-mate">{formatDate(createdAt)}</p>
            </div>
            <div className="flex justify-center items-center w-1/6">
                <div className="border border-gray-200 rounded-full py-2 px-6 bg-primary-smoke shadow-inner">
                    <p className="text-gray-500">{getRequestStatusLabel(status)}</p>
                </div>
            </div>
        </div>
    );
};

export default RequestHeader;