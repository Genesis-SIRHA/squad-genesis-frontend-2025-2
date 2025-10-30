import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/Loading.json";
import useDeanById from "@/hooks/useDeanById.tsx";

const DeanHeader = ({ userId }: { userId: string }) => {
    const {dean, loading} = useDeanById(userId);

    if (loading) {
        return <Lottie animationData={loadingAnimation} loop autoplay />;
    }

    return (
        <header className="flex flex-row justify-between items-center top-0 right-0 px-8 py-4">
            <p className="text-primary-smoke font-bold text-xl">
                Mantente Motivado
            </p>
            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                    <p className="text-primary-smoke font-bold text-right">{dean?.fullName}</p>
                    <p className="text-primary-smoke text-right">{dean?.facultyName}</p>
                </div>

                <img className="w-12" src="public/images/user-profile.svg" alt="basic_user_foto" />
            </div>

        </header>
    );
};

export default DeanHeader;
