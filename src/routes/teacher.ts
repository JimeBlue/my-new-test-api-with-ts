// Bring in Express so I can use its routing tools
import express from "express";
// Bring in the controller functions 
import { getAllTeachers, getOneTeacher, createTeacher, updateTeacher, deleteTeacher } from "#controllers/teacher";

// Create a mini Express app (a "router") that just handles teacher-related routes
const api = express.Router();

// For the "/"  (base) path:
//   GET  → run getAllTeachers (list every teacher)
//   POST → run createTeacher  (add a new teacher)
api.route("/").get(getAllTeachers).post(createTeacher);

// For the "/:id" path (":id" is a placeholder for a specific teacher's id):
//   GET    → run getOneTeacher  (fetch that one teacher)
//   PUT    → run updateTeacher  (change that teacher's details)
//   DELETE → run deleteTeacher  (remove that teacher)
api.route("/:id").get(getOneTeacher).put(updateTeacher).delete(deleteTeacher);


// Export this router so the main app file can plug these routes in
export default api;