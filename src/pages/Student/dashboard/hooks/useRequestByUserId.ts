import { useState, useEffect } from 'react';
import axios from 'axios';
import {type Request, RequestSchema} from '../schemas';

export const useRequestByUserId = (userId: string, role: string) => {
    const [requests, setRequest] = useState<Request[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Request[]>(`/api/requests/${role}/${userId}`);

            if (response.data instanceof Array){
                const validatedData = response.data.map((request) => RequestSchema.parse(request));
                setRequest(validatedData);
            }else{
                console.log(response.data);
                console.error('response is not a array');
                setRequest([]);
            }


        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            setRequest([]);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId, role]);

    const refetch = fetchData;

    return {requests, loading, refetch};
};


export default useRequestByUserId;
