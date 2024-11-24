import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglelFacultyQuery } from "../../../../redux/features/admin/userManagement.api";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";

const FacultyDetails = () => {
  const navigate = useNavigate();
  const { facultyID } = useParams();

  // Get Single Student Data
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetSinglelFacultyQuery(facultyID);

  // Destructure with a default value to avoid errors
  const { id } = facultyData?.data ?? {};

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }

  // Ensure studentData exists before rendering details
  if (!facultyData || !facultyData.data) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Faculty not found or an error occurred.</p>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </Button>
      <h1> This is StudentDetails Component {facultyID}</h1>
      <p>ID: {id} </p>
    </div>
  );
};

export default FacultyDetails;
