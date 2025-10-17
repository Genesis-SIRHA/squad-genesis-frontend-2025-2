import Zod from "zod";

export const RequestSchema = Zod.object({
    requestId: Zod.string(),
    studentId: Zod.string(),
    createdAt: Zod.date(),
    status: Zod.string(),
    type: Zod.string(),
    isExceptional: Zod.boolean(),
    destinationGroupId: Zod.string(),
    originGroupId: Zod.string(),
    decription: Zod.string(),
    gestedBy: Zod.string(),
    answerAt: Zod.date(),
    answer: Zod.string(),
})

export type Request = Zod.infer<typeof RequestSchema>

