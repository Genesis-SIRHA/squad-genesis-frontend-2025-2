import { useEffect, useState, useCallback } from "react";
import apiClient from "@/lib/interceptors/apiClient.ts";
import axios from "axios";
import { type Pensum, PensumSchema } from "@/schemas";

export const usePensumByUserId = (studentId: string) => {
    const [Pensum, setPensum] = useState<Pensum | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<Pensum>(`/pemsum/${studentId}/respond`);
            const validatedData = PensumSchema.parse(response.data);
            setPensum(validatedData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("API Error Response:", {
                        status: error.response.status,
                        statusText: error.response.statusText,
                        data: error.response.data,
                        headers: error.response.headers,
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    }, [studentId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = fetchData;

    return { Pensum, loading, refetch };
};
