import CourseModule, {type CourseState} from "@/pages/Pensum/CourseModule.tsx";
import {useContext} from "react";
import {AuthContext} from "@/context/AuthContext.tsx";
import {usePensumByUserId} from "@/hooks/usePensumByUserId.ts";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/Loading.json";
import ProgressBar from "@/lib/components/ProgressBar.tsx";

const Pensum = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("Header must be used within an AuthProvider");
    }
    const {user} = authContext;
    const userId = user?.userId;
    const {Pensum, loading} = usePensumByUserId(userId as string);
    const semesters = Array.from({length: 8}, (_, i) => (i + 1).toString());

    if (loading || !Pensum) {
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

    const {approvedCredits, totalCredits} = Pensum.courses.reduce((acc, {course, status}) => {
        if (status === 'success') {
            acc.approvedCredits += course.credits;
        }
        acc.totalCredits += course.credits;
        return acc;
    }, {approvedCredits: 0, totalCredits: 0});

    const progressPercentage = totalCredits > 0 ? (approvedCredits / totalCredits) * 100 : 0;

    return (
        <div className="w-full h-full bg-primary-smoke p-8  overflow-hidden">
            {/* Sección de créditos */}
            <div className="flex flex-col h-1/5 bg-primary-smoke overflow-hidden p-4 mb-4">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/3 h-full bg-white p-4 shadow-sm rounded-2xl justify-around text-lg items-center mb-2">
                        <div className="flex flex-row w-full px-16 justify-between text-lg items-center mb-2">
                            <div className="flex flex-col justify-center">
                                <div className="text-foreground"><span>Id Estudiante:</span> {Pensum.studentId}</div>
                                <div className="text-foreground"><span>Estudiante:</span> {Pensum.studentName}</div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-foreground"><span>Carrera:</span> {Pensum.facultyName}</div>
                                <div className="text-foreground"><span>Plan:</span> {Pensum.facultyPlan}</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-2/3">
                            <ProgressBar label="Progreso" value={progressPercentage} />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3 h-full bg-customGradient justify-center items-center p-4 shadow-sm rounded-2xl">
                        <div className="text-white"><span>Creditos aprobados:</span> {Pensum.approvedCredits}</div>
                        <div className="text-white"><span>Creditos pendientes:</span> {Pensum.totalCredits - Pensum.approvedCredits}</div>
                        <div className="text-white"><span>Creditos totales:</span> {Pensum.totalCredits}</div>

                    </div>
                </div>
            </div>

            <div className="w-full h-4/5 px-4">
                {/* Encabezado de semestres */}
                <div className="grid grid-cols-8 gap-4 mb-2 text-center">
                    {semesters.map((sem) => (
                        <div key={`header-${sem}`} className="text-primary-mate font-semibold">
                            Semestre {sem}
                        </div>
                    ))}
                </div>

                {/* Contenido de cursos por semestre */}
                <div className="grid grid-rows-5 gap-6 h-full w-full">
                    {semesters.map((sem) => {
                        const semesterCourses = Pensum.courses
                            .filter(({ course }) => course.semester === sem)
                            .map(({ course, status }) => ({
                                ...course,
                                status
                            }));

                        return (
                            <div key={sem} className="grid grid-cols-8 gap-4 h-full w-full">
                                {semesterCourses.map((course) => (
                                    <div key={course.abbreviation} className="group">
                                        <CourseModule
                                            course={course}
                                            state={course.status.toLowerCase() as CourseState}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pensum;