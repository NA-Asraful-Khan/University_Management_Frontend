import { TAcademicSemester } from "./academicManagement.type";

export interface TSemesterRegistration {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TCourse {
  _id: string;
  title: string;
  prefix: string;
  code: string;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TAssaignFaculty {
  _id: string;
  course: string;
  __v: number;
  faculties: any[];
}
