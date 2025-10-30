import { z } from "zod";

export const DeanSchema = z.object({
    id: z.string(),
    userId: z.string(),
    identityDocument: z.string(),
    email: z.string(),
    fullName: z.string(),
    facultyName: z.string()
});

export type Dean = z.infer<typeof DeanSchema>;
