import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import {Request, RequestSchema} from '../schemas/RequestSchema.tsx';

interface ApiResponse {
  data: Request;
}

export const useRequestById = (requestId: string) => {
    const [data, setData] = useState<Request | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRequest = async () => {
            if (!requestId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(`${API_BASE_URL}/requests/${requestId}`);
                const validatedData = RequestSchema.parse(response.data.data);
                setData(validatedData);
                setError(null);
            } catch (err) {
                setError(err as AxiosError);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [requestId]);

    const refetch = async () => {
        if (!requestId) return;

        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(`${API_BASE_URL}/requests/${requestId}`);
            const validatedData = RequestSchema.parse(response.data.data);
            setData(validatedData);
            setError(null);
        } catch (err) {
            setError(err as AxiosError);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch };
};

export default useRequestById;
