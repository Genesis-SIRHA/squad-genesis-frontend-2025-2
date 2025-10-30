
import type {Request} from '@/schemas/RequestSchema';
import {DropdownMenu} from "@/lib";
import TextAreaField from "@/lib/components/TextAreaField.tsx";

interface RequestFormProps {
    request: Request;
    editable: boolean;
    courseOptions: { label: string; value: string }[];
    mode: 'create' | 'view' | 'respond';
    onUpdate?: (field: keyof Request, value: string) => void;
}

const RequestForm = ({request, editable, courseOptions, mode, onUpdate}: RequestFormProps) => {
    const requestTypeOptions = [
        {label: 'Cancelación', value: 'CANCELLATION'},
        {label: 'Ingreso', value: 'JOIN'},
        {label: 'Intercambio', value: 'SWAP'},
    ];

    return (
        <form className="flex flex-col gap-5 text-sm w-full">
            <div className="flex flex-col gap-1 w-full">
                <p className="font-bold">Tipo de solicitud:</p>
                <DropdownMenu
                    options={requestTypeOptions}
                    selected={request.type}
                    onSelect={(value: string) => onUpdate?.('type', value)}
                    disabled={!editable}
                />
            </div>

            <div className="flex flex-row gap-5">
                <div className="flex flex-col w-1/2">
                    <p className="font-bold">Clase en Catálogo:</p>
                    <DropdownMenu
                        options={courseOptions}
                        selected={request.originGroupId || request.destinationGroupId}
                        onSelect={(value: string) => {
                            if (request.originGroupId !== null) {
                                onUpdate?.('originGroupId', value);
                            } else if (request.destinationGroupId !== null) {
                                onUpdate?.('destinationGroupId', value);
                            }
                        }}
                        disabled={!editable}
                    />
                </div>

                <div className="flex flex-col w-1/2">
                    <p className="font-bold">Grupo:</p>
                    <DropdownMenu
                        options={requestTypeOptions}
                        selected={request.type}
                        onSelect={(value: string) => onUpdate?.('type', value)}
                        disabled={!editable}
                    />
                </div>
            </div>

            <TextAreaField
                label="Descripción"
                value={request.description}
                disabled={!editable}
                onChange={(value: string) => onUpdate?.('description', value)}
            />

            {mode === 'respond' && (
                <div className="flex flex-col gap-1 w-full">
                    <p className="font-bold">Acción:</p>
                    <DropdownMenu
                        options={[
                            {label: 'Aceptar', value: 'ACCEPTED'},
                            {label: 'Rechazar', value: 'REJECTED'},
                        ]}
                        selected={request.status}
                        onSelect={(value: string) => onUpdate?.('status', value)}
                        disabled={false}
                    />
                </div>
            )}
        </form>
    );
}

export default RequestForm;
