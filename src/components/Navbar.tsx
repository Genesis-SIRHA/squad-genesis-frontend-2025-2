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
            ? 'flex items-center p-3 rounded-l-full bg-foreground text-primary-dark font-semibold transition-colors'
            : 'flex items-center p-3 rounded-l-full text-primary-smoke hover:bg-primary-dark/50 hover:text-primary-dark transition-colors';

    return (
        <nav className="flex flex-col top-0 left-0 min-h w-50 z-10">
            <div className="h-1/8 flex p-4 items-start justify-center">
                <img className="w-24" src="public/images/imagotipo.svg" alt="sirha_logo"/>
            </div>
            <div className="h-1/3 py-4 pl-4 space-y-2">
                {navItems.map(({ path, label, icon: Icon }) => (
                    <Link key={path} to={path} className={getLinkClasses(path)}>
                        <Icon className="w-8 h-8 mr-3" />
                        <span className="hidden md:inline">{label}</span>
                    </Link>
                ))}

                <Link
                    to="/logout"
                    className="fixed bottom-0 pb-6 flex items-center p-3 rounded-lg text-primary-mid transition-colors"
                >
                    <LogOut className="w-8 h-8 mr-3" />
                    <span className="hidden md:inline">Logout</span>
                </Link>
            </div>
        </nav>
    );
};

