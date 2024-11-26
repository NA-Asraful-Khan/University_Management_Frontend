import { useParams } from "react-router-dom";
import AssaignFacultyForm from "./AssaignFacultyForm";
import { useGetFacultyWCourseQuery } from "../../../../../redux/features/admin/courseManagement.api";
import { LoadingOutlined } from "@ant-design/icons";

const UpdateAssaignFaculty = () => {
  const { courseId } = useParams();
  // Get Assaigned Faculty Data
  const {
    data: facultyWCourseData,
    isLoading,
    isFetching,
  } = useGetFacultyWCourseQuery(courseId);

  const FacultyIds =
    facultyWCourseData?.data?.faculties?.map((item) => item?._id as string) ||
    undefined;

  const defaultData = { faculties: FacultyIds };
  console.log(defaultData);
  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }
  return <AssaignFacultyForm defaultValues={defaultData} />;
};

export default UpdateAssaignFaculty;
