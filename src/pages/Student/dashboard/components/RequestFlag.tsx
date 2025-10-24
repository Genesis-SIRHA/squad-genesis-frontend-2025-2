import type {Request} from '../schemas/RequestSchema';
import {ChevronDown} from "lucide-react";
import useCourseByCourseAbbreviation from "../hooks/useCourseByCourseAbbreviation.ts";
import useGroupByGroupAbbreviation from "../hooks/useGroupByGroupCode.ts";

const RequestFlag = ({ request }: { request: Request }) => {
    let GroupId: string | undefined | null;
    if (request.originGroupId) {
        GroupId = request.originGroupId;
    } else {
        GroupId = request.destinationGroupId;
    }


    const group = useGroupByGroupAbbreviation(GroupId || '');
    const course = useCourseByCourseAbbreviation(group.Group?.abbreviation || '');

    if (!course.Course) {
        return <div>Group not found</div>;
    }

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="flex flex-row pl-4 pr-8 py-2 border border-gray-100 bg-white rounded-xl shadow-sm items-center">
            <button className="rounded-full text-primary-mid p-2">
                <ChevronDown className="size-5"/>
            </button>
            <div className="flex w-1/2">
                <p className="text-primary-mate w-5/12">{course.Course?.courseName}</p>
            </div>
            <div className="flex justify-center w-1/6">
                <p className="text-primary-mate ">{request.type}</p>
            </div>
            <div className="flex justify-center w-1/6">
                <p className="text-primary-mate">{formatDate(request.createdAt)}</p>
            </div>

            <div className="flex justify-center items-center w-1/6">
                <div className="border border-gray-200 rounded-full py-2 px-10 bg-primary-smoke">
                    <p className="text-gray-500">{request.status}</p>
                </div>
            </div>


        </div>
    );
};

export default RequestFlag;