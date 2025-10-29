import {CourseSchema} from "@/schemas/CourseSchema.ts";
import {z} from "zod";


export const CourseWithStatusSchema = z.object({
    course: CourseSchema,
    status: z.string(),
});

export type CourseWithStatusSchema = z.infer<typeof CourseWithStatusSchema>;