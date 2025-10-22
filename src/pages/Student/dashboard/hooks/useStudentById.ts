import { useState, useEffect } from 'react';
import axios from 'axios';
import {type Student, StudentSchema} from '../schemas';

interface ApiResponse {
    data: Student;
}

export const useRequestByUserId = (studentId: string) => {
    const [student, setStudent] = useState<Student | null >(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                setLoading(true);
                const response = await axios.get<ApiResponse>(`http://localhost:8080/api/student/${studentId}`);
                const validatedData = StudentSchema.parse(response.data.data);
                setStudent(validatedData);
            } catch {
                setStudent(null);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [studentId]);

    const refetch = async () => {
        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(`http://localhost:8080/api/student/${studentId}`);
            const validatedData = StudentSchema.parse(response.data.data);
            setStudent(validatedData);
        } catch {
            setStudent(null);
        } finally {
            setLoading(false);
        }
    };

    return {student, loading, refetch};
};

export default useRequestByUserId;
