import {
  TAcademicDepertment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";

export interface User {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
  id: string;
}

export interface Gurdian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
  id: string;
}

export interface LocalGuardians {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
  _id: string;
  id: string;
}

export interface TStudent {
  _id: string;
  id: string;
  user: User;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  gurdian: Gurdian;
  localGuardians: LocalGuardians;
  profileImg: string;
  admissionSemester: Partial<TAcademicSemester>;
  academicDepartment: Partial<TAcademicDepertment>;
  academicFaculty: Partial<TAcademicFaculty>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
}

export interface TFaculty {
  _id: string;
  id: string;
  user: User;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  designation: string;
  academicDepartment: Partial<TAcademicDepertment>;
  academicFaculty: Partial<TAcademicFaculty>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
}

export interface TAdmin {
  _id: string;
  id: string;
  user: User;
  name: Name;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  designation: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
}
