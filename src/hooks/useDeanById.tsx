import {useEffect, useState} from "react";
import type {Dean} from "@/schemas";
import axios from "axios";

const useDeanById = (deanId: string) => {
    const [dean, setProfessor] = useState<Dean | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDean = async () => {
            try {
                const response = await axios.get(`/api/dean/${deanId}`);
                setProfessor(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching dean");
                setLoading(false);
            }
        };
        fetchDean();
    }, [deanId]);

    return {dean, loading, error};
};

export default useDeanById;