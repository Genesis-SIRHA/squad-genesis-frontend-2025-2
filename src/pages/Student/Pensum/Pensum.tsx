import CourseModule from "@/pages/Student/Pensum/CourseModule.tsx";
import {useContext} from "react";
import {AuthContext} from "@/context/AuthContext.tsx";
import {usePensumByUserId} from "@/hooks/usePensumByUserId.ts";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/Loading.json";

const Pensum = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("Header must be used within an AuthProvider");
    }
    const { user } = authContext;
    const userId = user?.userId;
    const {Pensum, loading} = usePensumByUserId(userId as string);
    const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());

    if (loading || !Pensum){
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

    const { approvedCredits, totalCredits } = Pensum.courses.reduce((acc, { course, status }) => {
        if (status === 'success') {
            acc.approvedCredits += course.credits;
        }
        acc.totalCredits += course.credits;
        return acc;
    }, { approvedCredits: 0, totalCredits: 0 });

    const progressPercentage = totalCredits > 0 ? (approvedCredits / totalCredits) * 100 : 0;

    return (
        <div className="w-full h-full overflow-x-auto bg-primary-smoke p-4">
            {/* Sección de créditos */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-primary-mate">Progreso del Pensum</h2>
                    <span className="text-sm font-medium text-primary-mate">
                        {approvedCredits} / {totalCredits} créditos
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-primary-dark h-2.5 rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <span>{Math.round(progressPercentage)}% Completado</span>
                    <span>{totalCredits - approvedCredits} créditos restantes</span>
                </div>
            </div>

            <div className="grid grid-rows-8 gap-6 min-w-max">
                {semesters.map((sem) => {
                    const semesterCourses = Pensum.courses
                        .filter(({ course }) => course.semester === sem)
                        .map(({ course, status }) => ({
                            ...course,
                            status
                        }));

                    return (
                        <div key={sem} className="grid grid-cols-8 gap-4 min-w-max">
                            {semesterCourses.map((course) => (
                                <div
                                    key={`${course.abbreviation}-${sem}`}
                                    className="group"
                                >
                                    <CourseModule
                                        course={course}
                                        state={course.status.toLowerCase()}
                                    />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Pensum;