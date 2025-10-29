const ProgressBar = ({
                         label,
                         value,
                     }: {
    label: string;
    value: number;
}) => {

    return (
        <div className="flex flex-col w-full h-8">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">{label}</span>
                <span className="text-xs text-foreground">{value}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-primary-mid"
                    style={{
                        width: `${value}%`,
                        transition: "width 0.3s ease-in-out",
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
