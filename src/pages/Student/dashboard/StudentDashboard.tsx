import Chart from 'chart.js/auto';

const DashBoard: React.FC = () => {
    return (
        <div className="flex flex-row h-full w-full">
            <div className="flex flex-col px-12 pt-6 h-full w-full gap-8">
                <div className="rounded-lg bg-white h-1/4">
                </div>

                <div className="rounded-t-3xl bg-primary-smoke h-4/5">
                    <div className="flex flex-row px-12 rounded-t-3xl bg-white h-15 items-center">
                        <p className="text-primary-mate font-bold w-1/2">Nombre</p>
                        <p className="text-primary-mate font-bold w-1/4">Fecha</p>
                        <p className="text-primary-mate font-bold w-1/4">Estado</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashBoard;