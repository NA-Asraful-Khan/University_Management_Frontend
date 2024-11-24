import { useParams } from "react-router-dom";
import { useGetSinglelAcademicFacultyQuery } from "../../../../redux/features/admin/academicManagement.api";
import { LoadingOutlined } from "@ant-design/icons";
import AcademicFacultyForm from "./AcademicFacultyForm";

const UpdateAcademicFaculty = () => {
  const { academicFacultyId } = useParams();

  // Get Academic Faculty Data
  const {
    data: academicFacultyData,
    isFetching,
    isLoading,
  } = useGetSinglelAcademicFacultyQuery(academicFacultyId);

  const { ...defaultData } = academicFacultyData?.data || {};

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }
  return (
    <AcademicFacultyForm defaultValues={defaultData} id={academicFacultyId} />
  );
};

export default UpdateAcademicFaculty;
