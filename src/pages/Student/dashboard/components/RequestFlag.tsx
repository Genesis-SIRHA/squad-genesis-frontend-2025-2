import React from 'react';
import type {Request} from '../schemas/RequestSchema';

const RequestFlag: = () => {

  const course = getCourseById(studentId);


  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-row p-4 border rounded-lg shadow-sm gap-8">
        <p className="text-primary-mate w-1/2">{course.name}</p>
        <p className="text-primary-mate w-1/4">{formatDate(createdAt)}</p>
        <div className="border rounded-lg p-2 w-1/4">
            <p className="text-primary-mate w-1/4">{status}</p>
        </div>
    </div>
  );
}

export default RequestFlag;