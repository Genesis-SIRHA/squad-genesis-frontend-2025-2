import {useEffect, useState} from "react";
import apiClient from "@/lib/interceptors/apiClient.ts";
import axios from "axios";

const useCompletedPercentage = (userId: string) => {
    const [percentage, setPercentage] = useState<number>(0);

    const fetchData = async () => {
        try {
            const response = await apiClient.get<number>(`/pemsum/${userId}/completed-percentages`);
            setPercentage(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            setPercentage(0);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);


    return {percentage};
}

export default useCompletedPercentage;