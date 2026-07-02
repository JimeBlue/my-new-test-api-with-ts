//use mongoose to create the schema
import mongoose from "mongoose";

// TS 1) this interface describes the shape of a Teacher document. It's passed as the type argument to Schema<T>/model<T> (which are generic),
// so TypeScript gives typed results everywhere the model is used (e.g. controllers)
export interface ITeacher {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
}

// name should be: topic + wording Schema
// TS 2) passing ITeacher here makes TypeScript check that these fields actually match the interface
const TeacherSchema = new mongoose.Schema<ITeacher>({
  first_name: {
    type: String,
    required: true,
    minLength: [2, "min length is 2 chars"],
    maxLength: [50, "max length is 50 chars"],
  },
  last_name: {
    type: String,
    required: true,
    minLength: [2, "min length is 2 chars"],
    maxLength: [50, "max length is 50 chars"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email address",
    ],
  },
  subject: {
    type: String,
    required: true,
    minLength: [2, "min length is 2 chars"],
    maxLength: [50, "max length is 50 chars"],
  },
});

// Build a "Teacher" model from the schema above and export it so other files to use it to create, read, update, and delete teacher records in MongoDB.
// TS 3) passing ITeacher here means anywhere this model is used, TypeScript knows the shape of a Teacher document instead of treating it as any
export default mongoose.model<ITeacher>("Teacher", TeacherSchema);