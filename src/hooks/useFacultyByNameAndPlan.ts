import {useEffect, useState} from "react";
import axios from "axios";
import {type Faculty, FacultySchema} from "@/schemas/FacultySchema.ts";
import apiClient from "@/lib/interceptors/apiClient.ts";

const useFacultyByNameAndPlan = (facultyName: string, plan: string) => {
    const [faculty, setFaculty] = useState<Faculty | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<Faculty>(`/faculty/${facultyName}/${plan}`);
            const validatedData = FacultySchema.parse(response.data);
            setFaculty(validatedData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            setFaculty(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [facultyName, plan]);

    const refetch = fetchData;

    return { faculty, loading, refetch };
};

export default useFacultyByNameAndPlan;