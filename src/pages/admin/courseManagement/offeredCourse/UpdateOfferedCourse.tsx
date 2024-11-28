import { useParams } from "react-router-dom";
import OfferedCourseForm from "./OfferedCourseForm";
import { TOfferedCourse } from "../../../../types";
import { useGetSinglelOfferedCourseQuery } from "../../../../redux/features/admin/courseManagement.api";
import { LoadingOutlined } from "@ant-design/icons";

export type DefaultOfferedCourseData = Omit<
  TOfferedCourse,
  | "maxCapacity"
  | "section"
  | "days"
  | "startTime"
  | "endTime"
  | "semesterRegistration"
  | "faculty"
  | "course"
  | "academicFaculty"
  | "academicDepartment"
> & {
  semesterRegistration?: string;
  faculty?: string;
  course?: string;
  academicFaculty?: string;
  academicDepartment?: string;
};
const UpdateOfferedCourse = () => {
  const { offeredCourseId } = useParams();

  // Get Single Offered Course Data
  const {
    data: offeredCourseData,
    isFetching,
    isLoading,
  } = useGetSinglelOfferedCourseQuery(offeredCourseId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { startTime, endTime, ...rest } =
    (offeredCourseData?.data as TOfferedCourse) || {};

  const defaultData: DefaultOfferedCourseData = {
    ...rest,
    semesterRegistration: rest?.semesterRegistration?._id,
    faculty: rest?.faculty?._id,
    course: rest?.course?._id,
    academicFaculty: rest?.academicFaculty?._id,
    academicDepartment: rest?.academicDepartment?._id,
    // startTime: [startTime, endTime],
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }

  return (
    <div>
      <OfferedCourseForm id={offeredCourseId} defaultValues={defaultData} />
      <h1>{offeredCourseId}</h1>
    </div>
  );
};

export default UpdateOfferedCourse;
