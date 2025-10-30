import {useContext} from "react";
import {AuthContext} from "@/context/AuthContext";
import StudentHeader from "@/components/Headers/StudentHeader.tsx";
import ProfessorHeader from "@/components/Headers/ProfessorHeader.tsx";
import DeanHeader from "@/components/Headers/DeanHeader.tsx";
import AdministratorHeader from "@/components/Headers/AdministratorHeader.tsx";


export const Header = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("Header must be used within an AuthProvider");

    const {user} = authContext;
    if (!user) return null;

    switch (user.role) {
        case "STUDENT":
            return <StudentHeader userId={user.userId}/>;
        case "PROFESSOR":
            return <ProfessorHeader userId={user.userId}/>;
        case "DEAN":
            return <DeanHeader userId={user.userId}/>;
        case "ADMINISTRATOR":
            return <AdministratorHeader userId={user.userId}/>;
        default:
            return null;
    }
};
