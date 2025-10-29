import { useState, useEffect } from 'react';
import axios from 'axios';
import {type Group, GroupSchema} from '../schemas';
import apiClient from "@/lib/interceptors/apiClient.ts";


export const useGroupByGroupCode = (GroupCode: string) => {
    const [Group, setGroup] = useState<Group|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<Group>(`/group/${GroupCode}`);
            const validatedData = GroupSchema.parse(response.data);
            setGroup(validatedData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            setGroup(null);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [GroupCode]);

    const refetch = fetchData;

    return {Group, loading, refetch};
};

export default useGroupByGroupCode;
