import { useParams } from "react-router-dom";
import { useGetSinglelStudentQuery } from "../../../../redux/features/admin/userManagement.api";

import StudentForm from "./StudentForm";
import { LoadingOutlined } from "@ant-design/icons";

const UpdateStudent = () => {
  const { studentId } = useParams();

  // Get Single Student Data
  const {
    data: studentData,
    isFetching,
    isLoading,
  } = useGetSinglelStudentQuery(studentId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dateOfBirth, ...defaultData } = studentData?.data || {};

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }
  return (
    <StudentForm
      id={studentId}
      defaultValues={defaultData}
      defaultDate={dateOfBirth}
    />
  );
};

export default UpdateStudent;
