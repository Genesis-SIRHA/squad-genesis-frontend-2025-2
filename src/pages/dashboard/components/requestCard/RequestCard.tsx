import { useState } from "react";
import RequestHeader from "@/pages/dashboard/components/requestCard/components/RequestHeader.tsx";
import RequestBody from "@/pages/dashboard/components/requestCard/components/RequestBody.tsx";
import useCourseByGroupCode from "@/hooks/useCourseByGroupCode.ts";
import useStudentById from "@/hooks/useStudentById.ts";
import useFacultyByNameAndPlan from "@/hooks/useFacultyByNameAndPlan.ts";
import type { Request } from "@/schemas/RequestSchema";

interface RequestCardProps {
    request: Request;
    isActive: boolean;
    onToggle: () => void;
    mode: 'create' | 'view' | 'respond';
    onSave?: (request: Request) => void;
    onCancel?: () => void;
}

const RequestCard = ({ request, isActive, onToggle, mode, onSave, onCancel }: RequestCardProps) => {
    const [editableRequest, setEditableRequest] = useState<Request>(request);
    const [isEditing, setIsEditing] = useState(mode === 'create');
    const [viewSchedule, setViewSchedule] = useState(true);

    const groupCode = editableRequest.originGroupId || editableRequest.destinationGroupId || "";
    const course = useCourseByGroupCode(groupCode);
    const student = useStudentById(editableRequest.studentId);
    const faculty = student.student?.facultyName || "";
    const plan = student.student?.plan || "";
    const courseOptions = useFacultyByNameAndPlan(faculty, plan).faculty?.courses.map((course) => ({
        label: course.courseName,
        value: course.abbreviation,
    })) || [];

    const handleFieldChange = (field: keyof Request, value: any) => {
        setEditableRequest(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        if (onSave) {
            onSave(editableRequest);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (mode === 'create' && onCancel) {
            onCancel();
        } else {
            setEditableRequest(request);
            setIsEditing(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="flex flex-col">
            <RequestHeader
                isActive={isActive}
                onToggle={onToggle}
                courseName={course.Course?.courseName}
                type={editableRequest.type}
                createdAt={editableRequest.createdAt}
                status={editableRequest.status}
                isEditing={isEditing}
                onEditToggle={handleEditToggle}
                onSave={handleSave}
                onCancel={handleCancel}
                mode={mode}
            />

            {isActive && (
                <RequestBody
                    isActive={isActive}
                    student={student.student}
                    studentId={editableRequest.studentId}
                    request={editableRequest}
                    editable={isEditing}
                    courseOptions={courseOptions}
                    viewSchedule={viewSchedule}
                    setViewSchedule={setViewSchedule}
                    mode={mode}
                    onFieldChange={handleFieldChange}
                />
            )}
        </div>
    );
};

export default RequestCard;