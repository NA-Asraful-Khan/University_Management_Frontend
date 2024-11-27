import {
  useGetAllAcademicDepertmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../redux/features/admin/academicManagement.api";
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
} from "../redux/features/admin/courseManagement.api";
import { useGetAllFacultyQuery } from "../redux/features/admin/userManagement.api";
import { TSelectOptions } from "../types";

// Semester Registration Options
const useSemesterRegistrationOptions = () => {
  const { data: semesterRegistrationData } =
    useGetAllRegisteredSemesterQuery(undefined);

  const Options: TSelectOptions[] =
    semesterRegistrationData?.data?.map(({ _id, academicSemester }) => ({
      value: String(_id),
      label: `${String(academicSemester?.name)} - ${String(
        academicSemester?.year
      )}`,
    })) || [];

  return Options;
};

// Academic Faculty Options
const useAcademicFacultyOptions = () => {
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  const Options: TSelectOptions[] =
    academicFacultyData?.data?.map(({ _id, name }) => ({
      value: String(_id),
      label: `${String(name)}`,
    })) || [];

  return Options;
};

// Academic Faculty Options
const useAcademicDepartmentOptions = () => {
  const { data: academicDepartmentData } =
    useGetAllAcademicDepertmentQuery(undefined);

  const Options: TSelectOptions[] =
    academicDepartmentData?.data?.map(({ _id, name }) => ({
      value: String(_id),
      label: `${String(name)}`,
    })) || [];

  return Options;
};

// Course Options
const useCourseOptions = () => {
  const { data: courseData } = useGetAllCoursesQuery(undefined);

  const Options: TSelectOptions[] =
    courseData?.data?.map(({ _id, title }) => ({
      value: String(_id),
      label: `${String(title)}`,
    })) || [];

  return Options;
};

// Faculty Options
const useFacultyOptions = () => {
  const { data: facultyData } = useGetAllFacultyQuery(undefined);

  const Options: TSelectOptions[] =
    facultyData?.data?.map(({ _id, fullName }) => ({
      value: String(_id),
      label: `${String(fullName)}`,
    })) || [];

  return Options;
};
const useDaysOfWeek = (): TSelectOptions[] => {
  const Options: TSelectOptions[] = [
    { label: "Saturday", value: "Sat" },
    { label: "Sunday", value: "Sun" },
    { label: "Monday", value: "Mon" },
    { label: "Tuesday", value: "Tue" },
    { label: "Wednesday", value: "Wed" },
    { label: "Thursday", value: "Thu" },
    { label: "Friday", value: "Fri" },
  ];

  return Options;
};

// Export both functions in an object
export {
  useSemesterRegistrationOptions,
  useAcademicFacultyOptions,
  useAcademicDepartmentOptions,
  useCourseOptions,
  useFacultyOptions,
  useDaysOfWeek,
};
