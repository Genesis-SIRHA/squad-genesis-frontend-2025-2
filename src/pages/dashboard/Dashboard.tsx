import {useContext, useState} from "react";
import {AuthContext} from "@/context/AuthContext.tsx";
import useRequestByUserId from "@/hooks/useRequestByUserId.ts";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/Loading.json";
import StatsPanel from "./components/StatsPanel.tsx";
import RequestList from "./components/RequestList.tsx";

const Dashboard = () => {
    const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("Header must be used within an AuthProvider");
    }

    const {user} = authContext;
    const userId = user?.userId || 'invalid';
    const role = user?.role || 'invalid';

    const {requests, loading} = useRequestByUserId(userId, role);

    const toggleRequest = (requestId: string) => {
        setActiveRequestId(prev => (prev === requestId ? null : requestId));
    };

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-1/8 h-1/8">
                    <Lottie animationData={loadingAnimation} loop autoplay/>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full overflow-y-auto scrollable-container px-8 pt-8 gap-8">
            <StatsPanel role={role} userId={userId}/>
            <RequestList requests={requests} activeRequestId={activeRequestId} toggleRequest={toggleRequest}/>
        </div>
    );
};

export default Dashboard;
