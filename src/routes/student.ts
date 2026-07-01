// Bring in Express so I can use its routing tools
import express from "express";
// Bring in the controller functions 
import { getAllStudents, getOneStudent, createStudent, updateStudent, deleteStudent } from "#controllers/student";

// Create a mini Express app (a "router") that just handles student-related routes
const api = express.Router();

// For the "/"  (base) path:
//   GET  → run getAllStudents (list every student)
//   POST → run createStudent  (add a new student)
api.route("/").get(getAllStudents).post(createStudent);

// For the "/:id" path (":id" is a placeholder for a specific student's id):
//   GET    → run getOneStudent  (fetch that one student)
//   PUT    → run updateStudent  (change that student's details)
//   DELETE → run deleteStudent  (remove that student)
api.route("/:id").get(getOneStudent).put(updateStudent).delete(deleteStudent);


// Export this router so the main app file can plug these routes in
export default api;