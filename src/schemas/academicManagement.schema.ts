import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please Select Semester" }),
  year: z.string({ required_error: "Please Select Year" }),
});
export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Please Provide Faculty Name" }),
});
export const academicDepertmentSchema = z.object({
  name: z.string({ required_error: "Please Provide Depertment Name" }),
  academicFaculty: z.string({
    required_error: "Please Select Academic Faculty Name",
  }),
});
