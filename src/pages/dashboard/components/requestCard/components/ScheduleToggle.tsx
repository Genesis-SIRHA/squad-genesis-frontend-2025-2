import PemsumView from "@/pages/dashboard/components/PemsumView.tsx";
import ScheduleView from "@/pages/dashboard/components/ScheduleView.tsx";
import { useSchedule } from "@/hooks/useSchedule.ts";
import { usePensumByUserId } from "@/hooks/usePensumByUserId.ts";

interface ScheduleToggleProps {
    viewSchedule: boolean;
    setViewSchedule: (value: boolean) => void;
    studentId: string;
}

const ScheduleToggle = ({ viewSchedule, setViewSchedule, studentId }: ScheduleToggleProps) => {
    const { scheduleData, loading: loadingSchedule, error: errorSchedule } = useSchedule(studentId);
    const { Pensum, loading: loadingPensum } = usePensumByUserId(studentId);

    const pensumData = Pensum?.courses?.map((course) => ({
        semester: course.course.semester.toString(),
        courseName: course.course.courseName,
        courseAbbreviation: course.course.abbreviation
    })) || [];


    const loading = viewSchedule ? loadingSchedule : loadingPensum;
    const error = viewSchedule ? errorSchedule : null;

    return (
        <div className="flex flex-col p-4 w-1/2 items-start">
            {/* 🔘 Botón de alternar */}
            <button
                onClick={() => setViewSchedule(!viewSchedule)}
                className="rounded-full text-primary-mid p-2 transform transition-transform"
            >
                <div className="flex flex-row gap-2 text-2xl font-bold">
                    <p className={viewSchedule ? "text-primary-mate" : "text-foreground"}>Horario</p>
                    <p className={viewSchedule ? "text-foreground" : "text-primary-mate"}>Semestre</p>
                </div>
            </button>

            {/* ⏳ Estado de carga o error */}
            {loading && <p className="text-sm text-muted-foreground mt-2">Cargando datos...</p>}
            {error && <p className="text-sm text-red-500 mt-2">Error: {error}</p>}

            {/* 📊 Vista de horario o pensum */}
            {!loading && !error && (
                <div className="flex flex-row w-full items-center justify-center gap-1">
                    <div
                        className={`overflow-hidden transform duration-500 ${
                            viewSchedule ? "w-150 opacity-100" : "w-0 opacity-0"
                        }`}
                    >
                        <ScheduleView data={scheduleData} />
                    </div>
                    <div
                        className={`overflow-hidden transform duration-500 ${
                            viewSchedule ? "w-0 opacity-0" : "w-150 opacity-100"
                        }`}
                    >
                        <PemsumView data={pensumData} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleToggle;
