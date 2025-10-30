import React from 'react';
import {useState} from 'react';
type PemsumItem = {
    semester: string;
    courseName: string;
    courseAbbreviation: string;
    state?: 'completed' | 'in-progress' | 'pending' | 'cancelled';
};

type Props = {
    data: PemsumItem[];
};

const semester = ['1', '2', '3', '4', '5', '6', '7', '8'];
const slots = [1, 2, 3, 4, 5];

const PemsumView: React.FC<Props> = ({data}) => {
    const [currentSlot, setCurrentSlot] = useState(0);
    return (
        <table className="table-auto border-collapse w-full border-separate border-spacing-1">
            <thead>
            <tr>
                <th className="p-1"/>
                {semester.map(semester => (
                    <th key={semester} className="px-2 py-1 text-center">{semester}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {slots.map(slot => (
                <tr key={slot} className="h-5">
                    <td className="px-2 py-1 font-semibold text-center">{slot}</td>
                    {semester.map(semester => {
                        const item = data.find(entry => entry.semester === semester
                        && data.filter(i => i.semester === semester).indexOf(entry) === slot - 1);
                        setCurrentSlot(slot + 1);
                        return (
                            <td
                                key={`${semester}-${slot}`}
                                className={`px-2 py-2 w-20 h-12 text-center rounded-3xl ${
                                    item?.state === 'completed' ? 'bg-secondary-completed' :
                                        item?.state === 'cancelled' ? 'bg-secondary-cancelled' :
                                            'bg-secondary-neutral'
                                }`}
                            >
                                <span className="text-foreground">{item?.courseAbbreviation}</span>
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PemsumView;
