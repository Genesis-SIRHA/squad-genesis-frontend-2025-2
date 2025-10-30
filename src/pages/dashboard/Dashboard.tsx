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

    const { requests, loading } = useRequestByUserId(userId, role);

    const handleCreateRequest = () => {
        setIsCreating(true);
        setActiveRequestId(null);
    };

    const handleSaveNewRequest = (newRequest: Request) => {
        console.log('Creando nueva solicitud:', newRequest);

        const requestToSave = {
            ...newRequest,
            requestId: `temp-${Date.now()}`,
            studentId: userId,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        setIsCreating(false);
        toast.success("Solicitud creada exitosamente");
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
                <RequestCard
                    request={{
                        requestId: 'temp-id',
                        studentId: userId,
                        type: 'SWAP' as RequestStatus,
                        status: 'pending',
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
                    onToggle={handleCancelCreation}
                    mode="create"
                    onSave={handleSaveNewRequest}
                    onCancel={handleCancelCreation}
                />
            )}

            <RequestList
                requests={requests}
                activeRequestId={activeRequestId}
                toggleRequest={toggleRequest}
            />

            {!isCreating && (
                <Button
                    className="flex items-center justify-center fixed w-15 h-15 bottom-20 right-20 z-10 bg-customGradient rounded-full text-white"
                    onClick={handleCreateRequest}
                >
                    <PlusIcon />
                </Button>
            )}
        </div>
    );
};

export default Dashboard;