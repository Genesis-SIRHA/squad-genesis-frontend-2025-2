import Zod from "zod";


export const CourseSchema = Zod.object({
    abbreviation: Zod.string(),
    courseName: Zod.string(),
    credits: Zod.number()
});

export type Course = Zod.infer<typeof CourseSchema>;