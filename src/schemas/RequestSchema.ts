import Zod from "zod";

export enum RequestStatus {
    CANCELLATION = "CANCELLATION",
    SWAP = "SWAP",
    JOIN = "JOIN"
}

export const RequestSchema = Zod.object({
    requestId: Zod.string(),
    studentId: Zod.string(),
    createdAt: Zod.string().transform(str => new Date(str)),
    status: Zod.string(),
    type: Zod.enum(RequestStatus),
    isExceptional: Zod.boolean(),
    destinationGroupId: Zod.string().nullable().optional(),
    originGroupId: Zod.string().nullable().optional(),
    description: Zod.string(),
    gestedBy: Zod.string().nullable().optional(),
    answerAt: Zod.date().nullable().optional(),
    answer: Zod.string().nullable().optional(),
});

export type Request = Zod.infer<typeof RequestSchema>
