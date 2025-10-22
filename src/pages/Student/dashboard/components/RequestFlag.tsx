import type {Request} from '../schemas/RequestSchema';
import useStudentById from "../hooks/useStudentById.ts";
import {RequestType} from "../schemas";

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

    const typeLabel: Record<RequestType, string> = {
        [RequestType.JOIN]: "Inscripción",
        [RequestType.SWAP]: "Intercambio",
        [RequestType.CANCELLATION]: "Cancelación"
    }

    const type = typeLabel[request.type]

    return (
        <div className="flex flex-row p-4 border rounded-lg shadow-sm gap-8">
            <p className="text-primary-mate w-1/2">{student.student.fullName}</p>
            <p className="text-primary-mate w-1/4">{formatDate(request.createdAt)}</p>
            <p className="text-primary-mate w-1/4">{type}</p>
            <div className="border rounded-lg p-2 w-1/4">
                <p className="text-primary-mate w-1/4">{request.status}</p>
            </div>
        </div>
    );
}

export default RequestFlag;