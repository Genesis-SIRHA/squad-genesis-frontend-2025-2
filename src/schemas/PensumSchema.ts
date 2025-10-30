import {z} from "zod";
import {CourseWithStatusSchema} from "@/schemas/CourseWithStatusSchema.ts";

export const PensumSchema = z.object({
    studentId: z.string(),
    studentName: z.string(),
    facultyName: z.string(),
    facultyPlan: z.string(),
    approvedCredits: z.number(),
    totalCredits: z.number(),
    courses: z.array(CourseWithStatusSchema)
});

export type Pensum = z.infer<typeof PensumSchema>;
