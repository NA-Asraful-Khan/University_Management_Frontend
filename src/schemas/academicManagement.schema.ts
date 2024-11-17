import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please Select Semester" }),
  year: z.string({ required_error: "Please Select Year" }),
});
