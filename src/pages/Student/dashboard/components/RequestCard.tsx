import {type Request, RequestStatus} from '../schemas';
import {ChevronDown, SendHorizonal} from "lucide-react";
import useCourseByGroupCode from "../../../../hooks/useCourseByGroupCode.ts";
import useStudentById from "../../../../hooks/useStudentById.ts";
import {DropdownMenu} from "@/lib";
import useFacultyByNameAndPlan from "@/hooks/useFacultyByNameAndPlan.ts";
import ScheduleView from "@/pages/Student/dashboard/components/ScheduleView.tsx";
import PemsumView from "@/pages/Student/dashboard/components/PemsumView.tsx";
import {useState} from "react";

interface RequestCardProps {
    request: Request;
    isActive: boolean;
    onToggle: () => void;
    editable: boolean
}

const RequestCard = ({request, isActive, onToggle, editable}: RequestCardProps) => {
    const [viewSchedule, setViewSchedule] = useState(true);
    const groupCode = request.originGroupId || request.destinationGroupId || "";
    const course = useCourseByGroupCode(groupCode);
    const student = useStudentById(request.studentId);

    const faculty = student.student?.facultyName;
    const plan = student.student?.plan;

    console.log(request)

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getRequestTypeLabel = (status: string): string => {
        const typeMap: Record<string, string> = {
            'SWAP': 'Intercambio',
            'CANCELLATION': 'Cancelación',
            'JOIN': 'Inscripción'
        };
        return typeMap[status] || status;
    };

    const getRequestStatusLabel = (status: string): string => {
        const typeMap: Record<string, string> = {
            'ACCEPTED': 'Aceptada',
            'PENDING': 'Pendiente',
            'WAITING': 'Esperando',
            'REJECTED': 'Rechazada',
            'CANCELLED': 'Cancelada'
        };
        return typeMap[status] || status;
    };

    const datosHorario = [
        {day: 'lunes', slot: 3},
        {day: 'miércoles', slot: 5},
        {day: 'viernes', slot: 2},
    ];

    const requestTypeOptions = [
        {label: 'Intercambio', value: "SWAP"},
        {label: 'Cancelacion', value: "CANCELLATION"},
        {label: 'Inscripcion', value: "JOIN"},
    ];

    const courseOptions = useFacultyByNameAndPlan(faculty, plan).faculty?.courses.map((course) => ({
        label: course.groupCode,
        value: course.id,
    })) || [];

    const groupOptions = useGroupByCourseId().faculty?.groups.map((group) => ({
        label: group.groupCode,
        value: group.id,
    })) || [];

    return (
        <div className="flex flex-col">
            <div
                className={`flex flex-row pl-4 pr-8 py-2 border border-gray-100 bg-white shadow-sm items-center duration-500 ${isActive ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
                <button
                    onClick={onToggle}
                    className={`rounded-full text-primary-mid p-2 transform transition-transform ${isActive ? 'rotate-180' : ''}`}>
                    <ChevronDown className="size-5"/>
                </button>
                <div className="flex w-1/2">
                    <p className="text-primary-mate w-5/12">{course.Course?.courseName || "loading..."}</p>
                </div>
                <div className="flex justify-center w-1/6">
                    <p className="text-primary-mate ">{getRequestTypeLabel(request.type)}</p>
                </div>
                <div className="flex justify-center w-1/6">
                    <p className="text-primary-mate">{formatDate(request.createdAt)}</p>
                </div>

                <div className="flex justify-center items-center w-1/6">
                    <div className="border border-gray-200 rounded-full py-2 px-6 bg-primary-smoke shadow-inner">
                        <p className="text-gray-500">{getRequestStatusLabel(request.status)}</p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className={`overflow-hidden transform transition-all duration-500 ${isActive ? '' : 'max-h-0'}`}>
                <div className="border border-gray-100 rounded-b-2xl rounded-t-0 bg-white shadow-sm">
                    <main className="flex flex-row gap-12 py-6 px-18">
                        <div className="flex flex-col w-1/2">

                            {/* Student info */}
                            <header className="flex flex-col gap-1 py-8">
                                <p className="text-primary-mate text-3xl font-bold">{student.student?.fullName}</p>
                                <div className="flex flex-row gap-32">
                                    <p className="text-foreground text-sm">Semestre: {student.student?.generalAverage}</p>
                                    <p className="text-foreground text-sm">Promedio: {student.student?.generalAverage}</p>
                                </div>
                            </header>

                            {/* Request info */}
                            <form className="flex flex-col gap-5 text-sm">
                                <div className="flex flex-col gap-1 w-full">
                                    <p className="font-bold">Tipo de solicitud:</p>
                                    <DropdownMenu
                                        options={requestTypeOptions}
                                        selected={request.type.toString()}
                                        onSelect={(value) => request.type = value as RequestStatus}
                                        disabled={!editable}
                                    />
                                </div>
                                <div className="flex flex-row gap-5">
                                    <div className="flex flex-col w-1/2">
                                        <p className="font-bold">Clase en Catalogo:</p>
                                        <DropdownMenu
                                            options={courseOptions}
                                selected={request.type}
                                            onSelect={(value) => {
                                                if (request.originGroupId !== null) {
                                                    request.originGroupId = value;
                                                } else if (request.destinationGroupId !== null) {
                                                    request.destinationGroupId = value;
                                                }
                                            }}
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                        <p className="font-bold">Grupo:</p>
                                        <DropdownMenu
                                            options={requestTypeOptions}
                                            selected={request.type.toString()}
                                            onSelect={(value) => request.type = value as RequestStatus}
                                            disabled={!editable}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold">Descripción:</p>
                                    <textarea
                                        className="w-full h-36 bg-primary-smoke rounded-xl shadow-inner border border-gray-200 p-3 resize-none"
                                        value={request.description}
                                        disabled={!editable}/>
                                </div>

                            </form>
                        </div>
                        <div className="flex flex-col p-4 w-1/2 items-start">
                            <button
                                onClick={() => setViewSchedule(!viewSchedule)}
                                className="rounded-full text-primary-mid p-2 transform transition-transform">
                                <div className="flex flex-row gap-2 text-2xl font-bold">
                                    <p className={viewSchedule ? 'text-primary-mate' : 'text-foreground'}>Horario</p>
                                    <p className={viewSchedule ? 'text-foreground' : 'text-primary-mate'}>Semestre</p>
                                </div>
                            </button>
                            <div className="flex flex-row w-full items-center justify-center gap-1">
                                <div
                                    className={`overflow-hidden transform duration-500 ${viewSchedule ? 'w-150 opacity-100' : 'w-0 opacity-0'}`}>
                                    <ScheduleView data={datosHorario}/>
                                </div>
                                <div
                                    className={`overflow-hidden transform duration-500 ${viewSchedule ? 'w-0 opacity-0' : 'w-150 opacity-100}'}`}>
                                    <PemsumView data={datosHorario}/>
                                </div>
                            </div>
                        </div>


                    </main>
                    <footer
                        className="flex flex-row justify-end bg-white border-t rounded-b-2xl border-gray-200 py-3 px-8">
                        <button
                            disabled={!editable}
                            className={`flex flex-row rounded-xl p-2 gap-2 transform transition-transform ${
                                editable
                                    ? 'bg-customGradient text-primary-smoke hover:opacity-80'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}>
                            <p>Enviar</p>
                            <SendHorizonal className="size-5"/>
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;