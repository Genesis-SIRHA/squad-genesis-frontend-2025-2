import { useEffect, useState } from "react";
import type {RequestPeriod} from "@/schemas/RequestPeriodSchema.ts";

interface Props {
    period: RequestPeriod | null;
}

const RequestPeriodPanel = ({ period }: Props) => {
    const [daysLeft, setDaysLeft] = useState<number | null>(null);

    useEffect(() => {
        if (period && period.isActive) {
            const now = new Date();
            const end = new Date(period.finalDate);
            const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            setDaysLeft(diff >= 0 ? diff : null);
        } else {
            setDaysLeft(null);
        }
    }, [period]);

    return (
        <div className="flex flex-col h-full w-1/3 bg-customGradient rounded-xl shadow-sm p-6 items-center justify-center">
            <div className="text-primary-smoke text-3xl font-bold mb-4 text-center">Fechas de solicitud</div>

            {daysLeft !== null ? (
                <div className="text-white text-lg font-semibold">
                    Quedan <span className="text-primary-light">{daysLeft}</span> días para solicitar
                </div>
            ) : (
                <div className="text-white text-sm italic">No hay fechas válidas de solicitud</div>
            )}

            {period && (
                <div className="mt-4 text-xs text-primary-smoke">
                    Desde <strong>{period.initialDate.toLocaleDateString()}</strong> hasta{" "}
                    <strong>{period.finalDate.toLocaleDateString()}</strong>
                </div>
            )}
        </div>
    );
};

export default RequestPeriodPanel;
