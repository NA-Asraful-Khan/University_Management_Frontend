import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglelStudentQuery } from "../../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  // Get Single Student Data
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetSinglelStudentQuery(studentId);

  // Destructure with a default value to avoid errors
  const { id } = studentData?.data ?? {};

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }

  // Ensure studentData exists before rendering details
  if (!studentData || !studentData.data) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Student not found or an error occurred.</p>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </Button>
      <h1> This is StudentDetails Component {studentId}</h1>
      <p>ID: {id} </p>
    </div>
  );
};

export default StudentDetails;
