import React, { useState } from "react";
import { User, Lock } from "lucide-react";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Login failed");
            }

            const result = await response.text();
            console.log("✅ Login success:", result);
            alert("Login success!");
        } catch (err: any) {
            console.error("❌ Login error:", err);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-pattern flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                <div className="bg-primary-mate flex flex-row rounded-4xl shadow-lg bg-primary-smoke">
                    <div className="w-2/5 p-6 pt-24 my-6 mx-10 login-container flex flex-col items-center bg-primary-smoke gap-4">
                        <p className="text-primary-mate text-2xl font-title text-gradient">Sirha</p>
                        <p className="text-primary-mate text-2xl font-bold">Login</p>

                        <div className="w-full flex flex-col items-center space-y-4 form-container">
                            <form onSubmit={handleSubmit} className="flex flex-col items-center width-field">
                                {/* Email */}
                                <div className="w-full flex flex-row gap-2 w-input-field my-4 items-center">
                                    <User strokeWidth={3} className="w-8 h-8 text-primary-mid" />
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
                                    <Lock strokeWidth={3} className="w-8 h-8 text-primary-mid" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-mid"
                                    />
                                </div>

                                {/* Error */}
                                {error && <p className="text-red-600 text-sm">{error}</p>}

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

                    <div className="w-3/5 bg-pattern bg-cover bg-center rounded-4xl flex items-center justify-center">
                        <div className="bg-customGradient bg-opacity-40 w-full h-full py-24 rounded-4xl flex items-center justify-center">
                            <img src="/public/images/login-decorator.svg" alt="Login Decorator" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
