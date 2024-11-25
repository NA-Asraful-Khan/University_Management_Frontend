import { useParams } from "react-router-dom";
import { useGetSinglelCourseQuery } from "../../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../../types";
import { LoadingOutlined } from "@ant-design/icons";
import CourseForm from "./CourseForm";

const UpdateCourse = () => {
  const { courseId } = useParams();

  // Get Registered Semester Data
  const {
    data: courseData,
    isFetching,
    isLoading,
  } = useGetSinglelCourseQuery(courseId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { preRequisiteCourses, ...rest } = (courseData?.data as TCourse) || {};

  const courseIds = preRequisiteCourses?.map((item) => item?.course);

  const defaultData = {
    ...rest,
    preRequisiteCourses: courseIds,
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }

  return <CourseForm defaultValues={defaultData} id={courseId} />;
};

export default UpdateCourse;
