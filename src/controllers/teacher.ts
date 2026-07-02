// TS: express has no built-in type info, so req/res need explicit types here (imported as types only, since they're never used as values at runtime)
import { type Request, type Response } from "express";
import Teacher from "#models/Teacher";
import { teacherSchema } from "#zod/teacherSchema";

// get all teachers
export const getAllTeacher = async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find();
    if (!teachers.length) {
      res.status(200).json({ msg: "No teacher in the DB" });
    } else {
      res.status(200).json({ teachers });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// get one teacher
export const getOneTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);

    if (teacher) {
      return res.status(200).json(teacher);
    }
    res.status(404).json({ msg: "I could not find that teacher :(" });
  } catch (error) {
    res.status(500).json(error);
  }
};


// create a teacher
export const createTeacher = async (req: Request, res: Response) => {
  try {
    // TS: validate req.body before trusting it, since req.body has no guaranteed shape at runtime
    const result = teacherSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ msg: "Invalid teacher data", errors: result.error.issues });
    }

    const { first_name, last_name, email, subject } = result.data;
    const teacher = await Teacher.create({ first_name, last_name, email, subject });
    res.status(201).json({ msg: "teacher created successfully", teacher });
  } catch (error) {
    res.status(500).json(error);
  }
};


// update a teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // TS: validate req.body before trusting it, since req.body has no guaranteed shape at runtime
    const result = teacherSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ msg: "Invalid teacher data", errors: result.error.issues });
    }

    const { first_name, last_name, email, subject } = result.data;

    const teacher = await Teacher.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        email,
        subject
      },
      {
        returnDocument: "after",
      },
    );

    if (!teacher) {
      res.status(404).json({ msg: "I could not find that teacher :(" });
    } else {
      res.status(200).json({ msg: "teacher updated!", teacher });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// delete a teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      res.status(404).json({ msg: "I could not find that teacher :(" });
    } else {
      res.status(200).json({ msg: "teacher deleted!", teacher });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
