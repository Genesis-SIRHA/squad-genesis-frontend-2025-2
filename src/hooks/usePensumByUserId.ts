import {useEffect, useState} from "react";
import apiClient from "@/lib/interceptors/apiClient.ts";
import axios from "axios";
import {type Pensum,PensumSchema} from "@/schemas";

export const usePensumByUserId = (studentId: string) => {
    const [Pensum, setPensum] = useState<Pensum|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<Pensum>(`/pemsum/${studentId}/respond`);

            if (response.data instanceof Array){
                const validatedData = PensumSchema.parse(response);
                setPensum(validatedData);
            }else{
                console.log(response.data);
                console.error('response is not a array');
                setPensum(null);
            }


        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            setPensum(null);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData().then(r => console.log(r));
    }, [fetchData, studentId]);

    const refetch = fetchData;

    return {Pensum, loading, refetch};
};