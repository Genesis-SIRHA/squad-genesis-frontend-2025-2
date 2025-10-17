import {Clock, SquareCheck, Calendar, Settings } from "lucide-react"
const DashBoard: React.FC = () => {
    return (
        <div className="flex flex-row h-screen">
            <div className="flex flex-col w-1/20 gap-16 items-center pt-32 ">
                <Clock className="w-10 h-10 text-primary-mid"/>
                <SquareCheck className="w-10 h-10 text-primary-mid"/>
                <Calendar className="w-10 h-10 text-primary-mid"/>
                <Settings className="w-10 h-10 text-primary-mid"/>
            </div>
            <div className="flex flex-col w-17/18 bg-primary-smoke">
                <div className="flex flex-row ">
                    <div className="">

                    </div>
                    <h1>Dashboard</h1>
                </div>
            </div>
        </div>
    )
};

export default DashBoard;