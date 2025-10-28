import useStudentById from "@/hooks/useStudentById.ts";
import {AuthContext} from "@/context/AuthContext.tsx";
import {useContext} from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/Loading.json";

export const Header = () =>{
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("Header must be used within an AuthProvider");
    }
    const { user } = authContext;
    const { student, loading } = useStudentById(user?.userId || '');
    const faculty = student?.facultyName || "";

    if(loading){
        return <div className="w-full h-full flex items-center justify-center">
            <div className="w-1/8 h-1/8">
                <Lottie
                    animationData={loadingAnimation}
                    loop
                    autoplay
                />
            </div>
        </div>
    }

    return(
        <header className="flex flex-row justify-between items-center top-0 right-0 px-8 py-4">
            <p className="text-primary-smoke font-bold text-xl">
                Mantente Motivado
            </p>
            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                    <p className="text-primary-smoke font-bold text-right">{student?.fullName}</p>
                    <p className="text-primary-smoke text-right">{faculty}</p>
                </div>

                <img className="w-12" src="public/images/user-profile.svg" alt="basic_user_foto" />
            </div>

        </header>
    );
};
