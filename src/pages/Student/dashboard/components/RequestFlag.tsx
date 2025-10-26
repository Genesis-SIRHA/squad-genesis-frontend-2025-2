import type {Request} from '../schemas';
import {ChevronDown} from "lucide-react";
import useCourseByGroupCode from "../hooks/useCourseByGroupCode.ts";
import {useState} from "react";

const RequestFlag = ({request}: { request: Request }) => {
    const [selected, setSelected] = useState(false);

    const groupCode = request.originGroupId || request.destinationGroupId || "";
    const course = useCourseByGroupCode(groupCode);

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="flex flex-row pl-4 pr-8 py-2 border border-gray-100 bg-white rounded-xl shadow-sm items-center">
            <button
                onClick={() => setSelected(!selected)}
                className="rounded-full text-primary-mid p-2">
                <ChevronDown className="size-5"/>
            </button>
            <div className="flex w-1/2">
                <p className="text-primary-mate w-5/12">{course.Course?.courseName || "loading..."}</p>
            </div>
            <div className="flex justify-center w-1/6">
                <p className="text-primary-mate ">{request.type}</p>
            </div>
            <div className="flex justify-center w-1/6">
                <p className="text-primary-mate">{formatDate(request.createdAt)}</p>
            </div>

            <div className="flex justify-center items-center w-1/6">
                <div className="border border-gray-200 rounded-full py-2 px-6 bg-primary-smoke">
                    <p className="text-gray-500">{request.status}</p>
                </div>
            </div>

            {selected &&
                <div className="border border-gray-200 rounded-full py-2 px-6 bg-primary-smoke">
                    hola mundo
                </div>
            }
        </div>
    );
};

export default RequestFlag;