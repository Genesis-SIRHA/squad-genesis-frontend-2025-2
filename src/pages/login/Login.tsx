import React from "react";
import Lottie from "lottie-react";
import LoginAnimation from "@/assets/animations/LoginAnimation.json";
import LoginForm from "@/pages/login/components/LoginForm.tsx";
import {ToastContainer} from "react-toastify";

const Login: React.FC = () => {
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
                <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-primary-smoke">
                    <div className="w-full text-center">
                        <p className="text-primary-mate text-8xl font-title text-gradient">Sirha</p>
                        <p className="text-primary-mate text-xl font-bold">Login</p>

                        <div className="flex flex-col w-full h-full items-center space-y-4">
                            <LoginForm/>
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

export default Login;

