import {useEffect, useState} from "react";
import type {Administrator} from "@/schemas";
import axios from "axios";
import {toast} from "react-toastify";

const useAdmistratorById = (admistratorId: string) => {
    const [administrator, setAdmistrator] = useState<Administrator | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdmistrator = async () => {
            try {
                const response = await axios.get(`/api/admistrator/${admistratorId}`);
                setAdmistrator(response.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching dean");
                setLoading(false);
                toast.error(error);
            }
        };
        fetchAdmistrator();
    }, [admistratorId]);

    return {administrator, loading};
};

export default useAdmistratorById;