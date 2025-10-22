/**
import { useState, useEffect } from 'react';
import axios from 'axios';
import {type Course, CourseSchema} from '../schemas/CourseSchema.tsx';

interface ApiResponse {
    data: Course;
}

export const useRequestByUserId = (courseAbreviation: string) => {
    const [course, setCourse] = useState<Request[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(`http://localhost:8080/api/course/${courseAbreviation}`);

                setRequest(validatedData);
            } catch {
                setRequest([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [userId]);

    const refetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(`http://localhost:8080/api/requests/${userId}`);
            const validatedData = response.data.data.map(request =>
                RequestSchema.parse(request)
            );
            setRequest(validatedData);
        } catch{
            setRequest([]);
        } finally {
            setLoading(false);
        }
    };

    return {requests, loading, refetch};
};

export default useRequestByUserId;
*/
