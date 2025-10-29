import React from 'react';
import {type Course} from '@/schemas/CourseSchema.ts';

const CourseModule: React.FC<{ course: Course, state: string }> = ({ course, state }) => {

    const stateColor = {
        "failed": {
            bg: 'bg-secondary-failed',
            text: 'text-white',
            dot: 'bg-secondary-failed'
        },
        "cancelled": {
            bg: 'bg-secondary-failed',
            text: 'text-white',
            dot: 'bg-secondary-failed'
        },
        "pending": {
            bg: 'bg-primary-smoke',
            text: 'text-primary-mate',
            dot: 'bg-primary-light'
        },
        "success": {
            bg: 'bg-secondary-success',
            text: 'text-white',
            dot: 'bg-secondary-success'
        }
    };
    console.log(state);
    return (
        <div className="group relative flex flex-col h-full w-full p-1 rounded-lg cursor-pointer transition duration-200 border border-primary-smoke hover:shadow-md hover:border-primary-light">
            {/* Punto indicador de estado */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white z-10">
                <div className={`w-full h-full rounded-full ${stateColor[state]?.dot || 'bg-gray-400'}`}></div>
            </div>
            <div className={`h-1/2 w-full p-3 flex flex-row rounded-t ${stateColor[state].bg} ${stateColor[state].text}`}>
                <div className="w-2/3 font-medium">{course.abbreviation}</div>
                <div className="w-1/3 text-right">{course.credits} CR</div>
            </div>

            <div className="h-1/2 w-full bg-white p-3 text-primary-mate rounded-b text-sm flex items-center">
                {course.courseName}
            </div>

            {/* Tooltip */}
            <div className="absolute z-10 hidden group-hover:block bg-primary-smoke text-xs p-3 rounded-2xl top-full mt-1 left-1/2 -translate-x-1/2 w-48 break-words whitespace-normal shadow-lg">
                <div className="font-medium mb-1">{course.courseName}</div>
                <div>Créditos: {course.credits}</div>
                {Array.isArray(course.requisites) && course.requisites.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-primary-light/30">
                        <div className="font-medium text-xs text-primary-light mb-1">Requisitos:</div>
                        <div className="text-xs text-primary-smoke/80">{course.requisites.join(', ')}</div>
                    </div>
                )}
            </div>
        </div>
    );
    };

export default CourseModule;
