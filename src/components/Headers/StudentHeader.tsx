import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/Loading.json";
import useStudentById from "@/hooks/useStudentById.ts";

const StudentHeader = ({ userId }: { userId: string }) => {
    const { student, loading } = useStudentById(userId);

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
                    <p className="text-primary-smoke font-bold text-right">{student?.fullName}</p>
                    <p className="text-primary-smoke text-right">{student?.facultyName}</p>
                </div>

                <img className="w-12" src="public/images/user-profile.svg" alt="basic_user_foto" />
            </div>

        </header>
    );
};

export default StudentHeader;
