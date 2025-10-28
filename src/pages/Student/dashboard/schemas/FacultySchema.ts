import { z } from "zod";

export const FacultySchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string(),
    courses: z.array(CourseSchema)
});

export type Faculty = z.infer<typeof FacultySchema>;