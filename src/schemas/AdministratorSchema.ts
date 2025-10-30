import { z } from "zod";

export const AdministratorSchema = z.object({
    id: z.string(),
    userId: z.string(),
    identityDocument: z.string(),
    email: z.string(),
    fullName: z.string(),
});

export type Administrator = z.infer<typeof AdministratorSchema>;
