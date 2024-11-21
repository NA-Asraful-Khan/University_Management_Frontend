import {
  TAcademicDepertment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";

export interface TUser {
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

export interface TName {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
  id: string;
}

export interface TGurdian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
  id: string;
}

export interface TLocalGuardians {
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
  user: TUser;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGuardians: TLocalGuardians;
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
  user: TUser;
  name: TName;
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
  user: TUser;
  name: TName;
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
