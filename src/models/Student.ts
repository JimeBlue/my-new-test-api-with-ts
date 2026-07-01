//use mongoose to create the schema
import mongoose from "mongoose";

// TS 1) this interphase describes the shape of a Student document, so it can be passed as a generic to Schema/model and give typed results everywhere the model is used (e.g. controllers)
export interface IStudent {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
}

// name should be: topic + wording Schema
// TS 2) passing IStudent here makes TypeScript check that these fields actually match the interface
const StudentSchema = new mongoose.Schema<IStudent>({
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
  age: {
    type: Number,
    required: true,
    min: 6,
    max: 30,
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
});

// Build a "Student" model from the schema above and export it so other files to use it to create, read, update, and delete student records in MongoDB.
// TS 3) passing IStudent here means anywhere this model is used, TypeScript knows the shape of a Student document instead of treating it as any
export default mongoose.model<IStudent>("Student", StudentSchema);
