import { TCourse } from "./courseManagement.type";

export interface TMyOfferedCourse {
  _id: string;
  semesterRegistration: string;
  academicFaculty: string;
  academicDepartment: string;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  academicSemester: string;
  __v: number;
  enrolledcourses: any[];
  completedCourses: any[];
  completedCourseIds: any;
  isPreRequisitesFulFilled: boolean;
  isAlreadyEnrolled: boolean;
}
