import {z} from "zod";
import {CourseSchema} from "@/schemas/CourseSchema.ts";

export const PensumSchema = z.object({
    studentId: z.string(),
    studentName: z.string(),
    facultyName: z.string(),
    facultyPlan: z.string(),
    approvedCredits: z.number(),
    totalCredits: z.number(),
    courses: z.map(CourseSchema,z.string())
});

export type Pensum = z.infer<typeof PensumSchema>;
