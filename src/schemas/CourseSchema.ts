import Zod from "zod";


export const CourseSchema = Zod.object({
    abbreviation: Zod.string(),
    courseName: Zod.string(),
    credits: Zod.number(),
    semester: Zod.string(),
    requisites: Zod.array(Zod.string()),
});

export type Course = Zod.infer<typeof CourseSchema>;