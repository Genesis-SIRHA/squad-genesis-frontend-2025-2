import { useEffect, useState } from "react";
import apiClient from "@/lib/interceptors/apiClient";
import axios from "axios";
import type {RequestPeriod} from "@/schemas/RequestPeriodSchema.ts";


const useActiveRequestPeriod = () => {
    const [period, setPeriod] = useState<RequestPeriod | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPeriod = async () => {
        try {
            const response = await apiClient.get<RequestPeriod>("/requestPeriods/active");
            setPeriod(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || err.message);
                console.error("Axios error:", err.response?.data || err.message);
            } else {
                setError("Unexpected error");
                console.error("Unexpected error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPeriod();
    }, []);

    return { period, loading, error };
};

export default useActiveRequestPeriod;
