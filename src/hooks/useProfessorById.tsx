import {useEffect, useState} from "react";
import type {Professor} from "@/schemas";
import axios from "axios";

const useProfessorById = (professorId: string) => {
    const [professor, setProfessor] = useState<Professor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfessor = async () => {
            try {
                const response = await axios.get(`/api/PROFESSOR/${professorId}`);
                setProfessor(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching professor");
                setLoading(false);
            }
        };
        fetchProfessor();
    }, [professorId]);

    return {professor, loading, error};
};

export default useProfessorById;