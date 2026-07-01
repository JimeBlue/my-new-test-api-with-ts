import { z } from "zod";

// validates req.body before it reaches Mongoose, mirroring the same rules as the Student Mongoose schema
export const studentSchema = z.strictObject({
  first_name: z.string().min(2, "min length is 2 chars").max(50, "max length is 50 chars"),
  last_name: z.string().min(2, "min length is 2 chars").max(50, "max length is 50 chars"),
  age: z.number().min(6).max(30),
  email: z.email("Please use a valid email address"),
});

export type StudentInput = z.infer<typeof studentSchema>;
