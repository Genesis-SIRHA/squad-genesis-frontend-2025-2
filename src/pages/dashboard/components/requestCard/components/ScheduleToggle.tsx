import PemsumView from "@/pages/dashboard/components/PemsumView.tsx";
import ScheduleView from "@/pages/dashboard/components/ScheduleView.tsx";

type ScheduleItem = {
    day: string;   // Día de la semana (abreviado: 'l', 'm', 'x', 'j', 'v', 's')
    slot: number;  // Número de bloque horario (por ejemplo, 1 a 8)
};

const ScheduleToggle = ({ viewSchedule, setViewSchedule }) =>{
    const sampleScheduleData: ScheduleItem[] = [
        { day: 'l', slot: 2 }, // Lunes, slot 2
        { day: 'l', slot: 4 },
        { day: 'm', slot: 1 }, // Martes, slot 1
        { day: 'm', slot: 3 },
        { day: 'x', slot: 2 }, // Miércoles, slot 2
        { day: 'x', slot: 5 },
        { day: 'j', slot: 3 }, // Jueves, slot 3
        { day: 'j', slot: 6 },
        { day: 'v', slot: 1 }, // Viernes, slot 1
        { day: 'v', slot: 4 },
        { day: 's', slot: 2 }, // Sábado, slot 2
    ];

    return <div className="flex flex-col p-4 w-1/2 items-start">
        <button onClick={() => setViewSchedule(!viewSchedule)} className="rounded-full text-primary-mid p-2 transform transition-transform">
            <div className="flex flex-row gap-2 text-2xl font-bold">
                <p className={viewSchedule ? 'text-primary-mate' : 'text-foreground'}>Horario</p>
                <p className={viewSchedule ? 'text-foreground' : 'text-primary-mate'}>Semestre</p>
            </div>
        </button>
        <div className="flex flex-row w-full items-center justify-center gap-1">
            <div className={`overflow-hidden transform duration-500 ${viewSchedule ? 'w-150 opacity-100' : 'w-0 opacity-0'}`}>
                <ScheduleView data={sampleScheduleData} />
            </div>
            <div className={`overflow-hidden transform duration-500 ${viewSchedule ? 'w-0 opacity-0' : 'w-150 opacity-100'}`}>
                <PemsumView data={sampleScheduleData} />
            </div>
        </div>
    </div>
};

export default ScheduleToggle;
