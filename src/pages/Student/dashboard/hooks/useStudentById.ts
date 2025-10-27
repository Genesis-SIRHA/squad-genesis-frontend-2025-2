import { useState, useEffect } from 'react';
import axios from 'axios';
import {type Student, StudentSchema} from '../schemas';

export const useStudentByUserId = (studentId: string) => {
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Student>(`/api/student/${studentId}`);
                const validatedData = StudentSchema.parse(response.data);
                setStudent(validatedData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data || error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
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
            const response = await axios.get<Student>(`http://localhost:8080/api/student/${studentId}`);
            const validatedData = StudentSchema.parse(response.data);
            setStudent(validatedData);
        } catch {
            setStudent(null);
        } finally {
            setLoading(false);
        }
    };

    return {student, loading, refetch};
};

export default useStudentByUserId;
