import { useParams } from "react-router-dom";
import { useGetSinglelAcademicDepertmentQuery } from "../../../../redux/features/admin/academicManagement.api";
import { LoadingOutlined } from "@ant-design/icons";
import AcademicDepertmentForm from "./AcademicDepertmentForm";

const UpdateAcademicDepertment = () => {
  const { academicDepertmentId } = useParams();

  // Get Academic Depertment Data
  const {
    data: academicDepertmentData,
    isFetching,
    isLoading,
  } = useGetSinglelAcademicDepertmentQuery(academicDepertmentId);

  const { ...defaultData } = academicDepertmentData?.data || {};

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }
  return (
    <AcademicDepertmentForm
      defaultValues={defaultData}
      id={academicDepertmentId}
    />
  );
};

export default UpdateAcademicDepertment;
