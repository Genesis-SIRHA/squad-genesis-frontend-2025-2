import { useState, useEffect } from "react";
import apiClient from "@/lib/interceptors/apiClient";

export type ScheduleItem = {
    day: string;
    slot: number;
    classroomName?: string;
    groupCode?: string;
};

const dayMap: Record<string, string> = {
    MONDAY: "l",
    TUESDAY: "m",
    WEDNESDAY: "x",
    THURSDAY: "j",
    FRIDAY: "v",
    SATURDAY: "s",
};

export const useSchedule = (studentId: string | undefined) => {
    const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!studentId) return;

        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/schedules/${studentId}`);
                const schedule = response.data;

                const mappedData: ScheduleItem[] = schedule.sessions.map((s: any) => ({
                    day: dayMap[s.day] || "?",
                    slot: s.slot,
                    classroomName: s.classroomName,
                    groupCode: s.groupCode,
                }));

                setScheduleData(mappedData);
                setError(null);
            } catch (err) {
                console.error('Error fetching schedule:', err);
                setError(err instanceof Error ? err.message : 'Error al cargar el horario');
                setScheduleData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [studentId]);

    return { scheduleData, loading, error };
};