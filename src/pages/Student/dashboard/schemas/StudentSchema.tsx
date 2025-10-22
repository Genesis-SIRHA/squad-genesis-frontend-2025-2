import Zod from "zod";

export const StudentSchema = Zod.object({
    id: Zod.string(),
    userId: Zod.string(),
    identityDocument: Zod.string(),
    email: Zod.string(),
    fullName: Zod.string(),
    plan: Zod.string(),
    facultyName: Zod.string(),
    generalAverage: Zod.string(),
    academicGrade: Zod.string(),
})

export type Student = Zod.infer<typeof StudentSchema>