import React from 'react';
import {User, Lock} from "lucide-react";

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-pattern flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                <div className="bg-primary-mate flex flex-row rounded-4xl shadow-lg bg-primary-smoke">
                    <div className="w-2/5 p-6 pt-24 my-6 mx-10 login-container flex flex-col items-center bg-primary-smoke gap-4">
                        <p className="text-primary-mate text-2xl font-title text-gradient">Sirha</p>
                        <p className="text-primary-mate text-2xl font-bold">Login</p>
                        <div className="w-full space-y-4 form-container">
                            <form className="flex flex-col items-center width-field">
                                <div className="w-full flex flex-row gap-2 w-input-field my-4 items-center">
                                    <User strokeWidth={3} className="w-8 h-8 text-primary-mid"/>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus: ring-primary-mid"
                                    />
                                </div>
                                <div className="w-full flex flex-row gap-2 w-input-field my-4 items-center">
                                    <Lock strokeWidth={3} className="w-8 h-8 text-primary-mid color-primary-mid"/>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus: ring-primary-mid"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-2/3 p-3 bg-customGradient text-white font-bold rounded-lg hover:bg-primary-mid transition-colors duration-300"
                                >
                                    Login
                                </button>
                            </form>
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