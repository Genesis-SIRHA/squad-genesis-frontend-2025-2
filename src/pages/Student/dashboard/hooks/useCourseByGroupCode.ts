import {useEffect, useState} from "react";
import axios from "axios";
import {type Course, CourseSchema} from "../schemas";

export const useGroupByGroupCode = (GroupCode: string ) => {
    const [Course, setCourse] = useState<Course|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Course>(`/api/groups/${GroupCode}/course`);
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
    }, [GroupCode]);

    const refetch = fetchData;

    return {Course, loading, refetch};
};

export default useGroupByGroupCode;
