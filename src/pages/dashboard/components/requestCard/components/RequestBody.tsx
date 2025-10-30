import RequestForm from "@/pages/dashboard/components/requestCard/components/RequestForm.tsx";
import StudentInfo from "@/pages/dashboard/components/requestCard/components/StudentInfo.tsx";
import ScheduleToggle from "@/pages/dashboard/components/requestCard/components/ScheduleToggle.tsx";
import type {Student} from "@/schemas";
import type {Request} from "@/schemas/RequestSchema";
import RequestFooter from "@/pages/dashboard/components/requestCard/components/RequestFooter.tsx";

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
    onFieldChange?: (field: keyof Request, value: any) => void;
}

const RequestBody = ({
                         isActive,
                         student,
                         studentId,
                         request,
                         editable,
                         courseOptions,
                         viewSchedule,
                         setViewSchedule,
                         mode,
                         onFieldChange
                     }: RequestBodyProps) => {

    // Función para pasar al RequestForm
    const handleFormFieldChange = (field: keyof Request, value: any) => {
        if (onFieldChange) {
            onFieldChange(field, value);
        }
    };

    return (
        <div className={`overflow-hidden transform transition-all duration-500 ${isActive ? '' : 'max-h-0'}`}>
            <div className="border border-gray-100 rounded-b-2xl rounded-t-0 bg-white shadow-sm">
                <main className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 pt-6 pb-12 px-18">
                        <div className="flex flex-col w-1/2 ">
                            <StudentInfo student={student}/>
                            <RequestForm
                                request={request}
                                editable={editable}
                                courseOptions={courseOptions}
                                mode={mode}
                                onFieldChange={handleFormFieldChange}
                            />
                        </div>
                        <ScheduleToggle
                            viewSchedule={viewSchedule}
                            setViewSchedule={setViewSchedule}
                            studentId={studentId}
                        />
                    </div>

                    {mode === 'create' && (
                        <RequestFooter editable={editable} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default RequestBody;