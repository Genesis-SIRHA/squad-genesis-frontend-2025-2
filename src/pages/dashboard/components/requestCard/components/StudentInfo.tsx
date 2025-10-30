import type {Student} from "@/schemas";

const StudentInfo = ({ student } : { student: Student | null }) => {
    return (
        <header className="flex flex-col gap-1 py-8 w-1/2">
            <p className="text-primary-mate text-3xl font-bold">{student?.fullName}</p>
            <div className="flex flex-row gap-32">
                <p className="text-foreground text-sm">Semestre: {student?.semester || 0}</p>
                <p className="text-foreground text-sm">Promedio: {student?.generalAverage}</p>
            </div>
        </header>
    );
}

export default StudentInfo;