import React from 'react';

type ScheduleItem = {
    day: string;
    slot: number;
};

type Props = {
    data: ScheduleItem[];
};

const days = ['l', 'm', 'x', 'j', 'v', 's'];
const slots = [1, 2, 3, 4, 5, 6, 7, 8];

const ScheduleView: React.FC<Props> = ({ data }) => {
    return (
        <table className="table-auto border-collapse w-full border-separate border-spacing-1">
            <thead>
            <tr>
                <th className="p-1"/>
                {days.map(day => (
                    <th key={day} className="px-2 py-1 text-center">{day}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {slots.map(slot => (
                <tr key={slot} className="h-5">
                    <td className="px-2 py-1 font-semibold text-center">{slot}</td>
                    {days.map(day => {
                        const item = data.find(entry => entry.day === day && entry.slot === slot);
                        return (
                            <td
                                key={`${day}-${slot}`}
                                className={`px-2 py-1 w-20 text-center rounded-full ${item ? 'bg-secondary-success' : 'bg-secondary-neutral'}`}
                            >
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ScheduleView;
