import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"])
})