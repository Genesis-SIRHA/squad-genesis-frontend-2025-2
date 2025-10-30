import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.tsx";
import useRequestByUserId from "@/hooks/useRequestByUserId.ts";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/Loading.json";
import StatsPanel from "./components/StatsPanel.tsx";
import RequestList from "./components/RequestList.tsx";
import { Button } from "@headlessui/react";
import { PlusIcon } from "lucide-react";
import { toast } from "react-toastify";
import type { Request, RequestStatus } from "@/schemas/RequestSchema";
import RequestCard from "@/pages/dashboard/components/requestCard/RequestCard.tsx";

const Dashboard = () => {
    const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("Header must be used within an AuthProvider");
    }

    const { user } = authContext;
    const userId = user?.userId || 'invalid';
    const role = user?.role || 'invalid';

    const { requests, loading, refetch } = useRequestByUserId(userId, role);

    const handleCreateRequest = () => {
        setIsCreating(true);
        setActiveRequestId(null);
    };

    const handleSaveNewRequest = (newRequest: Request) => {
        console.log('Creando nueva solicitud:', newRequest);


        setIsCreating(false);
        toast.success("Solicitud creada exitosamente");
        refetch(); // Recargar las solicitudes
    };

    const handleSaveExistingRequest = (updatedRequest: Request) => {
        console.log('Actualizando solicitud:', updatedRequest);

        // Aquí iría la llamada a tu API para actualizar la solicitud
        // await updateRequestInAPI(updatedRequest);

        toast.success("Solicitud actualizada exitosamente");
        refetch(); // Recargar las solicitudes
    };

    const handleAcceptRequest = (requestId: string) => {
        console.log('Aceptando solicitud:', requestId);

        // Aquí iría la llamada a tu API para aceptar la solicitud
        // await acceptRequestInAPI(requestId);

        toast.success("Solicitud aceptada");
        refetch(); // Recargar las solicitudes
    };

    const handleRejectRequest = (requestId: string) => {
        console.log('Rechazando solicitud:', requestId);

        // Aquí iría la llamada a tu API para rechazar la solicitud
        // await rejectRequestInAPI(requestId);

        toast.success("Solicitud rechazada");
        refetch(); // Recargar las solicitudes
    };

    const handleCancelCreation = () => {
        setIsCreating(false);
    };

    const toggleRequest = (requestId: string) => {
        setActiveRequestId(prev => (prev === requestId ? null : requestId));
        setIsCreating(false); // Cancelar creación si se activa otra solicitud
    };

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-1/8 h-1/8">
                    <Lottie animationData={loadingAnimation} loop autoplay />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full overflow-y-auto scrollable-container px-8 pt-8 gap-8">
            <StatsPanel role={role} userId={userId} />

            {/* Mostrar RequestCard en modo creación */}
            {isCreating && (
                <div className="mb-6">
                    <RequestCard
                        request={{
                            requestId: 'temp-id',
                            studentId: userId,
                            type: 'SWAP' as RequestStatus,
                            status: 'pending' as RequestStatus,
                            createdAt: new Date(),
                            isExceptional: false,
                            destinationGroupId: null,
                            originGroupId: null,
                            description: '',
                            gestedBy: null,
                            answerAt: null,
                            answer: null,
                        }}
                        isActive={true}
                        onToggle={() => {}} // No hacer nada al toggle en modo creación
                        mode="create"
                        onSave={handleSaveNewRequest}
                        onCancel={handleCancelCreation}
                    />
                </div>
            )}

            <RequestList
                requests={requests}
                activeRequestId={activeRequestId}
                toggleRequest={toggleRequest}
                onCreateRequest={handleCreateRequest}
                onSaveRequest={handleSaveExistingRequest}
                onCancelCreate={handleCancelCreation}
                onAcceptRequest={handleAcceptRequest}
                onRejectRequest={handleRejectRequest}
                userRole={role as 'student' | 'teacher'}
            />

            {/* Botón flotante de crear solo para estudiantes */}
            {role === 'student' && !isCreating && (
                <Button
                    className="flex items-center justify-center fixed w-15 h-15 bottom-20 right-20 z-10 bg-customGradient rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleCreateRequest}
                >
                    <PlusIcon className="w-6 h-6" />
                </Button>
            )}
        </div>
    );
};

export default Dashboard;