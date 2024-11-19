export interface TAcademicSemester {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
}

export interface TAcademicFaculty {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TAcademicDepertment {
  _id: string;
  name: string;
  academicFaculty: Partial<TAcademicFaculty>;
  createdAt: string;
  updatedAt: string;
}
