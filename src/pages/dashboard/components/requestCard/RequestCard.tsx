import RequestHeader from "@/pages/dashboard/components/requestCard/components/RequestHeader.tsx";
import RequestBody from "@/pages/dashboard/components/requestCard/components/RequestBody.tsx";
import {useState} from "react";
import useCourseByGroupCode from "@/hooks/useCourseByGroupCode.ts";
import useStudentById from "@/hooks/useStudentById.ts";
import useFacultyByNameAndPlan from "@/hooks/useFacultyByNameAndPlan.ts";
import RequestFooter from "@/pages/dashboard/components/requestCard/components/RequestFooter.tsx";
import type {Request} from "@/schemas/RequestSchema";

interface RequestCardProps {
    request: Request;
    isActive: boolean;
    onToggle: () => void;
    mode: 'create' | 'view' | 'respond';
}

const RequestCard = ({ request, isActive, onToggle, mode }: RequestCardProps) => {
    const [viewSchedule, setViewSchedule] = useState(true);
    const groupCode = request.originGroupId || request.destinationGroupId || "";
    const course = useCourseByGroupCode(groupCode);
    const student = useStudentById(request.studentId);
    const faculty = student.student?.facultyName || "";
    const plan = student.student?.plan || "";
    const courseOptions = useFacultyByNameAndPlan(faculty, plan).faculty?.courses.map((course) => ({
        label: course.courseName,
        value: course.abbreviation,
    })) || [];

    const editable = mode === 'create';
    const showActions = mode === 'create' || mode === 'respond';

    return (
        <div className="flex flex-col">
            <RequestHeader
                isActive={isActive}
                onToggle={onToggle}
                courseName={course.Course?.courseName}
                type={request.type}
                createdAt={request.createdAt}
                status={request.status}
            />

            <RequestBody
                isActive={isActive}
                student={student.student}
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
