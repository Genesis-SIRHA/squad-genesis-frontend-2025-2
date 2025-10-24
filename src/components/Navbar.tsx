import {Link} from 'react-router-dom';
import {ChartColumnBig, SquareCheck, Calendar, Settings, LogOut} from "lucide-react";

const Navbar = () => {
    return (
        <nav className="top-0 left-0 min-h- w-20 md:w-64 bg-white/90  shadow-md z-10">
            <div className="flex flex-col p-4 items-center justify-center bg-pattern-small shadow-md">
                <div className="bg-gray-400 w-32 h-32 m-6 rounded-full">
                    <img className="w-full h-full" src="public/images/user-profile.svg" alt="basic_user_foto" />
                </div>
                <p className="text-lg text-primary-mate font-bold">Laura Parra Alvarado</p>
                <p className="text-sm text-white">Ingenieria de sistemas</p>
                <p className="text-sm text-white font-bold">Estudiante</p>
            </div>
            <div className="p-4 space-y-2">
                <Link
                    to="/dashboard"
                    className="flex items-center p-3 rounded-lg text-primary-mid hover:bg-gray-100 transition-colors"
                >
                    <SquareCheck className="w-8 h-8 mr-3" />
                    <span className="text-primary-mate hidden md:inline">Dashboard</span>
                </Link>
                <Link
                    to="/"
                    className="flex items-center p-3 rounded-lg text-primary-mid hover:bg-gray-100 transition-colors"
                >
                    <Calendar className="w-8 h-8 mr-3" />
                    <span className="text-primary-mate hidden md:inline">Group Tracker</span>
                </Link>
                <Link
                    to="/"
                    className="flex items-center p-3 rounded-lg text-primary-mid hover:bg-gray-100 transition-colors"
                >
                    <ChartColumnBig className="w-8 h-8 mr-3" />
                    <span className="text-primary-mate hidden md:inline">Stats</span>
                </Link>
                <Link
                    to="/perfil"
                    className="flex items-center p-3 rounded-lg text-primary-mid hover:bg-gray-100 transition-colors"
                >
                    <Settings className="w-8 h-8 mr-3" />
                    <span className="text-primary-mate hidden md:inline">Settings</span>
                </Link>

                <Link
                    to="/"
                    className="fixed bottom-0 pb-6 flex items-center p-3 rounded-lg text-primary-mid hover:bg-gray-100 transition-colors"
                >
                    <LogOut className="w-8 h-8 mr-3" />
                    <span className="text-primary-mate hidden md:inline">Logout</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
