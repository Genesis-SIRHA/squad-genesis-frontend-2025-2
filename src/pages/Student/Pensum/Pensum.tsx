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


    return (
        <div className="w-full h-full overflow-x bg-primary-smoke">
            <div className="grid grid-rows-8 gap-4">
                {semesters.map((sem) => {
                    const semesterCourses = Array.from(Pensum.courses.entries())
                        .map(([course, status]) => ({ ...course, status }))
                        .filter(course => course.semester === sem);

                    return (
                        <div key={sem} className="grid grid-cols-8 gap-2">
                            {semesterCourses.map((course) => (
                                <div
                                    key={`${course.abbreviation}-${sem}`}
                                    className="group"
                                >
                                    <CourseModule
                                        course={course}
                                        state={course.status}
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