import { z } from "zod";

export const GroupSchema = z.object({
    id: z.string().optional(),
    groupCode: z.string().optional(),
    abbreviation: z.string().optional(),
    year: z.string().optional(),
    period: z.string().optional(),
    professorId: z.string().optional(),
    lab: z.boolean().optional(),
    groupNum: z.string().optional(),
    enrolled: z.number().optional(),
    maxCapacity: z.number().optional(),
});

export type Group = z.infer<typeof GroupSchema> | null;