interface TextAreaFieldProps {
    label: string;
    value: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const TextAreaField = ({ label, value, disabled = false, onChange }: TextAreaFieldProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="font-bold">{label}</label>
            <textarea
                className="w-full h-36 bg-primary-smoke rounded-xl shadow-inner border border-gray-200 p-3 resize-none"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            />
        </div>
    );
};

export default TextAreaField;
