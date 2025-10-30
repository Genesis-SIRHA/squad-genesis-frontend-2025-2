import RequestForm from "@/pages/dashboard/components/requestCard/components/RequestForm.tsx";
import StudentInfo from "@/pages/dashboard/components/requestCard/components/StudentInfo.tsx";
import ScheduleToggle from "@/pages/dashboard/components/requestCard/components/ScheduleToggle.tsx";
import type {Student} from "@/schemas";
import type {Request} from "@/schemas/RequestSchema";

interface RequestBodyProps {
    isActive: boolean;
    student: Student | null;
    studentId: string;
    request: Request;
    editable: boolean;
    courseOptions: Array<{ label: string; value: string }>;
    viewSchedule: boolean;
    setViewSchedule: (value: boolean) => void;
    mode: 'create' | 'view' | 'respond';
}

const RequestBody = ({isActive, student, studentId, request, editable, courseOptions, viewSchedule, setViewSchedule, mode}: RequestBodyProps) => {
    return (
        <div className={`overflow-hidden transform transition-all duration-500 ${isActive ? '' : 'max-h-0'}`}>
            <div className="border border-gray-100 rounded-b-2xl rounded-t-0 bg-white shadow-sm">
                <main className="flex flex-row gap-4 py-6 px-18">
                    <div className="flex flex-col w-1/2 ">
                        <StudentInfo student={student}/>
                        <RequestForm
                            request={request}
                            editable={editable}
                            courseOptions={courseOptions}
                            mode={mode}
                        />
                    </div>
                    <ScheduleToggle
                        viewSchedule={viewSchedule}
                        setViewSchedule={setViewSchedule}
                        studentId={studentId}
                    />
                </main>
            </div>
        </div>
    );
};

export default RequestBody;

