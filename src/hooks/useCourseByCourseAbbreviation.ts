import { useState, useEffect } from 'react';
import axios from 'axios';
import {type Course, CourseSchema} from '../pages/Student/dashboard/schemas';
import apiClient from "@/lib/interceptors/apiClient.ts";


export const useCourseByCourseAbbreviation = (CourseAbbreviation: string) => {
    const [Course, setCourse] = useState<Course|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<Course>(`/courses/${CourseAbbreviation}`);
            const validatedData = CourseSchema.parse(response.data);
            setCourse(validatedData);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            setCourse(null);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [CourseAbbreviation]);

    const refetch = fetchData;

    return {Course, loading, refetch};
};

export default useCourseByCourseAbbreviation;
