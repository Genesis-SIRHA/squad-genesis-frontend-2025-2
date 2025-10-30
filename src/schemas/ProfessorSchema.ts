import { z } from "zod";

export const ProfessorSchema = z.object({
    id: z.string(),
    userId: z.string(),
    identityDocument: z.string(),
    email: z.string(),
    fullName: z.string(),
    facultyName: z.string()
});

export type Professor = z.infer<typeof ProfessorSchema>;
