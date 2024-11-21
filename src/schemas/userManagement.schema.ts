import { z } from "zod";

const contactNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

export const studentSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  }),
  gender: z.enum(["male", "female", "other"]),

  dateOfBirth: z.any(),
  email: z.string().email("Invalid email address"),
  contactNo: z
    .string()
    .regex(
      contactNumberRegex,
      "Contact number must be in the format (XXX) XXX-XXXX"
    ),
  emergencyContactNo: z
    .string()
    .regex(
      contactNumberRegex,
      "Emergency contact number must be in the format (XXX) XXX-XXXX"
    ),
  bloodGroup: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  gurdian: z.object({
    fatherName: z.string().min(1, "Father's name is required"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z
      .string()
      .regex(
        contactNumberRegex,
        "Father's contact number must be in the format (XXX) XXX-XXXX"
      ),
    motherName: z.string().min(1, "Mother's name is required"),
    motherOccupation: z.string().min(1, "Mother's occupation is required"),
    motherContactNo: z
      .string()
      .regex(
        contactNumberRegex,
        "Mother's contact number must be in the format (XXX) XXX-XXXX"
      ),
  }),
  localGuardians: z.object({
    name: z.string().min(1, "Local guardian's name is required"),
    contactNo: z
      .string()
      .regex(
        contactNumberRegex,
        "Local guardian's contact number must be in the format (XXX) XXX-XXXX"
      ),
    occupation: z.string().min(1, "Local guardian's occupation is required"),
    address: z.string().min(1, "Local guardian's address is required"),
  }),
  admissionSemester: z
    .string()
    .length(24, "Admission semester ID must be a valid MongoDB ObjectId"),

  academicDepartment: z
    .string()
    .length(24, "Academic department ID must be a valid MongoDB ObjectId"),
});

export const facultySchema = z.object({
  designation: z.string().min(1, "Designation is required"),
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  }),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.any(),
  email: z.string().email("Invalid email address"),
  contactNo: z
    .string()
    .regex(
      contactNumberRegex,
      "Contact number must be in the format (XXX) XXX-XXXX"
    ),
  emergencyContactNo: z
    .string()
    .regex(
      contactNumberRegex,
      "Emergency contact number must be in the format (XXX) XXX-XXXX"
    ),
  bloodGroup: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  academicDepartment: z
    .string()
    .length(24, "Academic department ID must be a valid MongoDB ObjectId"),
});

export const adminSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  }),
  gender: z.enum(["male", "female", "other"]),
  bloodGroup: z.enum(["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]),
  dateOfBirth: z.any(),
  email: z.string().email("Invalid email address"),
  contactNo: z
    .string()
    .regex(
      contactNumberRegex,
      "Contact number must be in the format (XXX) XXX-XXXX"
    ),
  emergencyContactNo: z
    .string()
    .regex(
      contactNumberRegex,
      "Emergency contact number must be in the format (XXX) XXX-XXXX"
    ),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  designation: z.string().min(1, "Designation is required"),
});
