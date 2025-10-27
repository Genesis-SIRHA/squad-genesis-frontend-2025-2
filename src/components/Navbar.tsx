import { Link, useLocation } from 'react-router-dom';
import {
    ChartColumnBig,
    SquareCheck,
    Calendar,
    Settings,
    LogOut,
} from 'lucide-react';

export const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: SquareCheck },
        { path: '/', label: 'Group Tracker', icon: Calendar },
        { path: '/stats', label: 'Stats', icon: ChartColumnBig },
        { path: '/perfil', label: 'Settings', icon: Settings },
    ];

    const getLinkClasses = (path: string) =>
        location.pathname === path
            ? 'flex items-center p-3 rounded-l-full bg-foreground text-primary-dark font-semibold transition-colors group-hover:pr-12'
            : 'flex items-center p-3 rounded-l-full text-primary-smoke hover:bg-primary-dark/50 hover:text-primary-dark transition-colors group-hover:pr-12';

    return (
        <nav
            className="group flex flex-col top-0 left-0 h-screen w-20 hover:w-54 transition-all duration-300 ease-in-out z-10">
            <div className="h-24 flex p-4 items-center justify-center">
                <img className="w-12 group-hover:w-24 transition-all duration-300" src="public/images/imagotipo.svg" alt="sirha_logo"/>
            </div>
            <div className="flex-1 py-4 pl-4 space-y-2 overflow-hidden">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <Link key={path} to={path} className={getLinkClasses(path)}>
                        <Icon className="w-8 h-8 mr-3 flex-shrink-0" />
                        <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                            {label}
                        </span>
                    </Link>
                ))}

                <Link
                    to="/logout"
                    className="fixed bottom-0 pb-6 flex items-center p-3 rounded-lg text-primary-mid hover:text-primary-smoke transition-colors"
                >
                    <LogOut className="w-8 h-8 mr-3 flex-shrink-0" />
                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                        Logout
                    </span>
                </Link>
            </div>
        </nav>
    );
};

