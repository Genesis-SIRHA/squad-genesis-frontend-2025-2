import { ChevronDown } from "lucide-react";
import { Button } from "@headlessui/react";

interface RequestHeaderProps {
    isActive: boolean;
    onToggle: () => void;
    courseName?: string;
    type: string;
    createdAt: Date | string;
    status: string;
    isEditing?: boolean;
    onEditToggle?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    mode: 'create' | 'view' | 'respond';
}

const RequestHeader = ({
                           isActive,
                           onToggle,
                           courseName,
                           type,
                           createdAt,
                           status,
                           isEditing,
                           onEditToggle,
                           onSave,
                           onCancel,
                           mode
                       }: RequestHeaderProps) => {
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

    const getStatusColor = (status: string): string => {
        const statusColorMap: Record<string, string> = {
            ACCEPTED: 'bg-green-100 text-green-800 border-green-200',
            PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            WAITING: 'bg-blue-100 text-blue-800 border-blue-200',
            REJECTED: 'bg-red-100 text-red-800 border-red-200',
            CANCELLED: 'bg-gray-100 text-gray-800 border-gray-200',
        };
        return statusColorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <div className={`flex flex-row pl-4 pr-8 py-2 border border-gray-100 bg-white shadow-sm items-center duration-500 ${isActive ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
            <button
                onClick={onToggle}
                className={`rounded-full text-primary-mid p-2 transform transition-transform ${isActive ? 'rotate-180' : ''}`}
            >
                <ChevronDown className="size-5" />
            </button>

            <div className="flex w-1/2">
                <p className="text-primary-mate w-5/12">{courseName || (mode === 'create' ? 'Nueva Solicitud' : 'loading...')}</p>
            </div>

            <div className="flex justify-center w-1/6">
                <p className="text-primary-mate">{getRequestTypeLabel(type)}</p>
            </div>

            <div className="flex justify-center w-1/6">
                <p className="text-primary-mate">{formatDate(createdAt)}</p>
            </div>

            <div className="flex justify-center items-center w-1/6">
                {mode !== 'create' ? (
                    <div className={`border rounded-full py-2 px-6 shadow-inner ${getStatusColor(status)}`}>
                        <p className="text-sm font-medium">{getRequestStatusLabel(status)}</p>
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-full py-2 px-6 bg-primary-smoke shadow-inner">
                        <p className="text-gray-500 text-sm font-medium">Pendiente</p>
                    </div>
                )}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                {mode === 'create' ? (
                    <div className="flex gap-2">
                        <Button
                            onClick={onSave}
                            className="px-4 py-2 bg-secondary-success text-white rounded-lg text-sm font-medium hover:bg-secondary-success transition-colors"
                        >
                            Crear
                        </Button>
                        <Button
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </Button>
                    </div>
                ) : mode === 'view' ? (
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button
                                    onClick={onSave}
                                    className="px-4 py-2 bg-secondary-success text-white rounded-lg text-sm font-medium hover:bg-secondary-success transition-colors"
                                >
                                    Guardar
                                </Button>
                                <Button
                                    onClick={onCancel}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                                >
                                    Cancelar
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={onEditToggle}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                            >
                                Editar
                            </Button>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default RequestHeader;