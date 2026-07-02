import { z } from "zod";

// validates req.body before it reaches Mongoose, mirroring the same rules as the Teacher Mongoose schema
export const teacherSchema = z.strictObject({
  first_name: z.string().min(2, "min length is 2 chars").max(50, "max length is 50 chars"),
  last_name: z.string().min(2, "min length is 2 chars").max(50, "max length is 50 chars"),
  email: z.email("Please use a valid email address"),
  subject: z.string().min(2, "min length is 2 chars").max(50, "max length is 50 chars"),
});

export type TeacherInput = z.infer<typeof teacherSchema>;