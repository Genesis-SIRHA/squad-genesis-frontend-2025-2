import React from 'react';
import {type Course} from '@/schemas/CourseSchema';

const CourseModule: React.FC<{ course: Course, state: string }> = ({ course, state }) => {

    const stateColor: Record<string, string> = {
        "FAILED": '#212121',
        "CANCELLED": 'bg-secondary-failed',
        "pending": '#ffffff',
        "SUCESS" : 'bg-secondary-success',
    };
    console.log(state);
    return (
        <div className="flex flex-col h-full w-full p-2 rounded-xl cursor-pointer transition duration-200 ">
            <div className={`h-1/2 w-full p-2 flex flex-row text-white ${stateColor[state]}`}>
                <div className="w-2/3 text-white">{course.abbreviation}</div>
                <div className="w-1/3">{course.credits}</div>
            </div>

            <div className="h-1/2 w-full bg-primary-smoke">{course.courseName}</div>

            <div className="absolute z-10 hidden group-hover:block bg-black text-white text-xs p-2 rounded top-full left-1/2 -translate-x-1/2 whitespace-nowrap">
                Requisitos: {course.requisites.length > 0 ? course.requisites.join(', ') : 'Ninguna'}
            </div>
        </div>
        );
    };

export default CourseModule;
