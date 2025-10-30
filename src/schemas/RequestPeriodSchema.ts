import { z } from 'zod';

export const RequestPeriodSchema = z.object({
    id: z.string(),
    initialDate: z.coerce.date(),
    finalDate: z.coerce.date(),
    year: z.string(),
    period: z.string(),
    isActive: z.boolean(),
});

export type RequestPeriod = z.infer<typeof RequestPeriodSchema>;

