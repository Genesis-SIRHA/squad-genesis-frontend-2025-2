import {useEffect, useState} from "react";
import apiClient from "@/lib/interceptors/apiClient.ts";
import axios from "axios";

const useRequestPercentages = (userId: string) => {
    const [requestsComplete, setRequestsComplete] = useState<number>(0);
    const [requestsRejected, setRequestsRejected] = useState<number>(0);
    const [requestsPending, setRequestsPending ] = useState<number>(0);

    const fetchData = async () => {
        try {
            const response = await apiClient.get<Array<number>>(`/requests/${userId}/stats`);
            setRequestsComplete(response.data[0]);
            setRequestsPending(response.data[1]);
            setRequestsRejected(response.data[2]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);


    return {requestsComplete,requestsPending,requestsRejected};
}

export default useRequestPercentages;