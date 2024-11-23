import { useParams } from "react-router-dom";
import AcademicSemesterForm from "./AcademicSemesterForm";
import { LoadingOutlined } from "@ant-design/icons";
import { useGetSinglelSemesterQuery } from "../../../../redux/features/admin/academicManagement.api";

const UpdateAcademicSemester = () => {
  const { semesterId } = useParams();
  // Get Single Student Data
  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetSinglelSemesterQuery(semesterId);
  const { ...defaultData } = semesterData?.data || {};

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }
  return <AcademicSemesterForm id={semesterId} defaultValues={defaultData} />;
};

export default UpdateAcademicSemester;
