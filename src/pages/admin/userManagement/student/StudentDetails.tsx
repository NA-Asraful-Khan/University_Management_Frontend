import { ArrowLeftOutlined } from "@ant-design/icons";
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

  console.log(studentData?.data, isLoading, isFetching);
  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </Button>
      <h1> This is StudentDetails Component {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
