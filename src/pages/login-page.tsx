import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-red-400 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
                <div className="bg-gray-100 flex flex-row rounded-2xl">
                    <div className="w-1/2 p-12 m-6 flex flex-col justify-center">
                        <h1 className="text-amber-950">Login</h1>
                        <form>
                            <input type="text" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-md"/>
                            <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-md"/>
                            <button type="submit" className="w-full p-2 bg-amber-950 text-white rounded-md">Login</button>
                        </form>
                    </div>
                    <div className="w-1/2 p-12">
                        <h1 className="text-amber-950">Login</h1>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;