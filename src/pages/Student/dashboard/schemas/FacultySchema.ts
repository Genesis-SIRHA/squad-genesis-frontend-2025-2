import { GroupSchema } from "@/pages/Student/dashboard/schemas/GroupSchema.ts";
import { z } from "zod";

export const FacultySchema = z.object({
    id: z.string(),
    name: z.string(),
    plan: z.string(),
    groups: z.array(GroupSchema)
});

export type Faculty = z.infer<typeof FacultySchema>;