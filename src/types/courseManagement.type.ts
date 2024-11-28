import {
  TAcademicDepertment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.type";
import { TFaculty } from "./userManagement.type";

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

export interface TOfferedCourse {
  _id: string;
  semesterRegistration: Partial<TSemesterRegistration>;
  academicFaculty: Partial<TAcademicFaculty>;
  academicDepartment: Partial<TAcademicDepertment>;
  course: Partial<TCourse>;
  faculty: Partial<TFaculty>;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  academicSemester: Partial<TAcademicSemester>;
}
