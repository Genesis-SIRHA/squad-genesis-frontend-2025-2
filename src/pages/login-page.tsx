import React, {useState} from "react";
import {User, Lock} from "lucide-react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from 'react-router-dom';
import Lottie from "lottie-react";
import LoginAnimation from "@/assets/animations/LoginAnimation.json";
import {ToastContainer, toast} from 'react-toastify';
import apiClient from "@/lib/interceptors/apiClient.ts";

const LoginPage: React.FC = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email || !password) {
            setError("Please fill in all fields");
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.post("/auth/login", {
                email,
                password
            }, {
                headers: {"Content-Type": "application/json"}
            });

            console.log("Login response:", response.data);
            login(response.data.token, response.data.user);
            navigate('/dashboard');
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Error al iniciar sesión");
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full bg-pattern-big flex items-center justify-center p-4">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="rounded-lg shadow-md"
            />
            <div className="flex w-full max-w-6xl h-[80vh] glass rounded-4xl shadow-lg overflow-hidden">
                {/* Sección del formulario */}
                <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-primary-smoke">
                    <div className="w-full text-center">
                        <p className="text-primary-mate text-8xl font-title text-gradient">Sirha</p>
                        <p className="text-primary-mate text-xl font-bold">Login</p>

                        <div className="flex flex-col w-full h-full items-center space-y-4">
                            <form onSubmit={handleSubmit} className="flex flex-col w-3/5 items-center">
                                {/* Email */}
                                <div className="w-full flex flex-row gap-2 w-input-field my-4 items-center">
                                    <User strokeWidth={3} className="w-8 h-8 text-primary-mid"/>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-mid"
                                    />
                                </div>

                                {/* Password */}
                                <div className="w-full flex flex-row gap-2 w-input-field my-4 items-center">
                                    <Lock strokeWidth={3} className="w-8 h-8 text-primary-mid"/>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-mid"
                                    />
                                </div>

                                {/* Botón */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-2/3 p-4 my-6 bg-customGradient text-white font-bold rounded-lg hover:bg-primary-mid transition-colors duration-300 disabled:opacity-50"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </form>

                            <p className="text-primary-mate text-sm">
                                Don't have an account?{" "}
                                <a href="#" className="text-primary-mid">
                                    Sign Up
                                </a>
                            </p>
                            <p className="text-primary-mate text-sm">
                                Forgot Password?{" "}
                                <a href="#" className="text-primary-mid">
                                    Reset Password
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full rounded-4xl flex items-center justify-center">
                    <div className="w-full h-full rounded-4xl flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-full">
                                <Lottie
                                    animationData={LoginAnimation}
                                    loop
                                    autoplay
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

