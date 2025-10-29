import { useState } from "react";
import { User, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "@/lib/interceptors/apiClient.ts";

const roleRoutes: Record<string, string> = {
    STUDENT: "/dashboard",
    TEACHER: "/dashboard",
    DEAN: "/dashboard",
};

const LoginForm = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post("/auth/login", { email, password });
            const { token, user } = response.data;

            login(token, user);
            const redirectPath = roleRoutes[user.role] || "/dashboard";
            navigate(redirectPath, { replace: true });
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-3/5 items-center">
            <div className="w-full flex flex-row gap-2 my-4 items-center">
                <User strokeWidth={3} className="w-8 h-8 text-primary-mid" />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-mid"
                />
            </div>

            <div className="w-full flex flex-row gap-2 my-4 items-center">
                <Lock strokeWidth={3} className="w-8 h-8 text-primary-mid" />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-mid"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-2/3 p-4 my-6 bg-customGradient text-white font-bold rounded-lg hover:bg-primary-mid transition-colors duration-300 disabled:opacity-50"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-primary-mate text-sm">
                Forgot Password? <a href="#" className="text-primary-mid">Reset Password</a>
            </p>
        </form>
    );
};

export default LoginForm;