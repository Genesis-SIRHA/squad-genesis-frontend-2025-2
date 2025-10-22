import type {Request} from '../schemas/RequestSchema';
import useStudentById from "../hooks/useStudentById.ts";

const RequestFlag = ({ request }: { request: Request }) => {

    const student = useStudentById(request.studentId);

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (student.loading) {
        return <div>Loading student data...</div>;
    }

    if (!student.student) {
        return <div>Student not found</div>;
    }

    return (
        <div className="flex flex-row p-4 border rounded-lg shadow-sm gap-8">
            <p className="text-primary-mate w-1/2">{student.student.fullName}</p>
            <p className="text-primary-mate w-1/4">{formatDate(request.createdAt)}</p>
            <div className="border rounded-lg p-2 w-1/4">
                <p className="text-primary-mate w-1/4">{request.status}</p>
            </div>
        </div>
    );
}

export default RequestFlag;