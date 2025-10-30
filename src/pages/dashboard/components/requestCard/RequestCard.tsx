import {useState} from "react";
import type {Request} from "@/schemas/RequestSchema";
import useCourseByGroupCode from "@/hooks/useCourseByGroupCode.ts";
import useStudentById from "@/hooks/useStudentById.ts";
import useFacultyByNameAndPlan from "@/hooks/useFacultyByNameAndPlan.ts";
import RequestHeader from "@/pages/dashboard/components/requestCard/components/RequestHeader.tsx";
import RequestBody from "@/pages/dashboard/components/requestCard/components/RequestBody.tsx";
import RequestFooter from "@/pages/dashboard/components/requestCard/components/RequestFooter.tsx";

interface RequestCardProps {
    request: Request;
    isActive: boolean;
    onToggle: () => void;
    mode: 'create' | 'view' | 'respond';
    editable?: boolean;
}

const RequestCard = ({ request, isActive, onToggle, mode }: RequestCardProps) => {
    const [viewSchedule, setViewSchedule] = useState(true);
    const groupCode = request.originGroupId || request.destinationGroupId || "";
    const {Course, loading} = useCourseByGroupCode(groupCode);
    const {student, loading} = useStudentById(request.studentId);
    const faculty = student.facultyName;
    const plan = student.plan;

    const courseOptions = useFacultyByNameAndPlan(faculty, plan).faculty?.courses.map((course) => ({
        label: course.courseName,
        value: course.abbreviation,
    })) || [];

    const editable = mode === 'create';

    return (
        <div className="flex flex-col">
            <RequestHeader
                isActive={isActive}
                onToggle={onToggle}
                courseName={Course?.courseName}
                type={request.type}
                createdAt={request.createdAt}
                status={request.status}
            />

            <RequestBody
                isActive={isActive}
                student={student}
                studentId={request.studentId}
                request={request}
                editable={editable}
                courseOptions={courseOptions}
                viewSchedule={viewSchedule}
                setViewSchedule={setViewSchedule}
                mode={mode}
            />

            {mode === 'create' && (
                <RequestFooter editable={editable} />
            )}
        </div>
    );
};

export default RequestCard;
