import { useParams } from "react-router-dom";
import { TFaculty } from "../../../../types";
import FacultyForm from "./FacultyForm";
import { useGetSinglelFacultyQuery } from "../../../../redux/features/admin/userManagement.api";
import { LoadingOutlined } from "@ant-design/icons";

export type DefaultFacultyData = Omit<
  TFaculty,
  "academicDepartment" | "dateOfBirth"
> & {
  academicDepartment?: string;
};
const UpdateFaculty = () => {
  const { facultyID } = useParams();

  // Get Single Faculty Data
  const {
    data: facultyData,
    isFetching,
    isLoading,
  } = useGetSinglelFacultyQuery(facultyID);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dateOfBirth, ...rest } = (facultyData?.data as TFaculty) || {};

  const defaultData: DefaultFacultyData = {
    ...rest,
    academicDepartment: rest?.academicDepartment?._id,
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }
  return (
    <FacultyForm
      id={facultyID}
      defaultValues={defaultData}
      defaultDate={dateOfBirth}
    />
  );
};

export default UpdateFaculty;
