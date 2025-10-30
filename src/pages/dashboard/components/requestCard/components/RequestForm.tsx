import type {Request} from '@/schemas/RequestSchema';
import {DropdownMenu} from "@/lib";
import TextAreaField from "@/lib/components/TextAreaField.tsx";

interface RequestFormProps {
    request: Request;
    editable: boolean;
    courseOptions: { label: string; value: string }[];
    mode: 'create' | 'view' | 'respond';
    onUpdate?: (field: keyof Request, value: any) => void;
    onFieldChange?: (field: keyof Request, value: any) => void;
}

const RequestForm = ({request, editable, courseOptions, mode, onUpdate, onFieldChange}: RequestFormProps) => {
    const handleUpdate = (field: keyof Request, value: any) => {
        if (onUpdate) {
            onUpdate(field, value);
        }
        if (onFieldChange) {
            onFieldChange(field, value);
        }
    };

    const requestTypeOptions = [
        {label: 'Cancelación', value: 'CANCELLATION'},
        {label: 'Ingreso', value: 'JOIN'},
        {label: 'Intercambio', value: 'SWAP'},
    ];

    const getGroupOptions = () => {
        return courseOptions;
    };

    const showOriginGroup = request.type === 'SWAP' || request.type === 'CANCELLATION';
    const showDestinationGroup = request.type === 'SWAP' || request.type === 'JOIN';

    return (
        <form className="flex flex-col gap-5 text-sm w-full">
            {/* Tipo de Solicitud */}
            <div className="flex flex-col gap-1 w-full">
                <p className="font-bold">Tipo de solicitud:</p>
                <DropdownMenu
                    options={requestTypeOptions}
                    selected={request.type}
                    onSelect={(value: string) => handleUpdate('type', value)}
                    disabled={!editable || mode === 'respond'}
                />
            </div>

            {/* Campos de Grupos - Condicionales según el tipo */}
            <div className="flex flex-row gap-5">
                {/* Grupo Origen - Solo para SWAP y CANCELLATION */}
                {showOriginGroup && (
                    <div className="flex flex-col w-1/2">
                        <p className="font-bold">
                            {request.type === 'SWAP' ? 'Grupo Origen:' : 'Grupo a Cancelar:'}
                        </p>
                        <DropdownMenu
                            options={getGroupOptions()}
                            selected={request.originGroupId || ''}
                            onSelect={(value: string) => handleUpdate('originGroupId', value || null)}
                            disabled={!editable}
                        />
                    </div>
                )}

                {/* Grupo Destino - Solo para SWAP y JOIN */}
                {showDestinationGroup && (
                    <div className="flex flex-col w-1/2">
                        <p className="font-bold">
                            {request.type === 'SWAP' ? 'Grupo Destino:' : 'Grupo a Ingresar:'}
                        </p>
                        <DropdownMenu
                            options={getGroupOptions()}
                            selected={request.destinationGroupId || ''}
                            onSelect={(value: string) => handleUpdate('destinationGroupId', value || null)}
                            disabled={!editable}
                        />
                    </div>
                )}

                {/* Espaciador para mantener el layout cuando solo hay un campo */}
                {((showOriginGroup && !showDestinationGroup) || (!showOriginGroup && showDestinationGroup)) && (
                    <div className="flex flex-col w-1/2"></div>
                )}
            </div>

            {/* Descripción */}
            <TextAreaField
                label="Descripción"
                value={request.description}
                disabled={!editable}
                onChange={(value: string) => handleUpdate('description', value)}
            />

            {/* Checkbox para Solicitud Excepcional */}
            {editable && (
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isExceptional"
                        checked={request.isExceptional}
                        onChange={(e) => handleUpdate('isExceptional', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={!editable}
                    />
                    <label htmlFor="isExceptional" className="text-sm font-medium text-gray-700">
                        Solicitud Excepcional
                    </label>
                </div>
            )}

            {/* Mostrar estado de solicitud excepcional si está activa */}
            {request.isExceptional && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-yellow-800 text-sm font-medium">
                        ⚠️ Solicitud Excepcional
                    </p>
                    <p className="text-yellow-700 text-xs mt-1">
                        Esta solicitud requiere revisión especial del coordinador
                    </p>
                </div>
            )}

            {/* Campo de Acción para modo Respond */}
            {mode === 'respond' && (
                <div className="flex flex-col gap-1 w-full">
                    <p className="font-bold">Acción:</p>
                    <DropdownMenu
                        options={[
                            {label: 'Aceptar', value: 'ACCEPTED'},
                            {label: 'Rechazar', value: 'REJECTED'},
                            {label: 'Pendiente', value: 'PENDING'},
                        ]}
                        selected={request.status}
                        onSelect={(value: string) => handleUpdate('status', value)}
                        disabled={!editable}
                    />
                </div>
            )}
        </form>
    );
}

export default RequestForm;