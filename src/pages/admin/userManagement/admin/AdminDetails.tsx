import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglelAdminQuery } from "../../../../redux/features/admin/userManagement.api";
import { Button } from "antd";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";

const AdminDetails = () => {
  const navigate = useNavigate();
  const { adminID } = useParams();

  // Get Single Admin Data
  const {
    data: adminData,
    isLoading,
    isFetching,
  } = useGetSinglelAdminQuery(adminID);

  // Destructure with a default value to avoid errors
  const { id } = adminData?.data ?? {};

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }

  // Ensure studentData exists before rendering details
  if (!adminData || !adminData.data) {
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
      <h1> This is AdminDetails Component {adminID}</h1>
      <p>ID: {id} </p>
    </div>
  );
};

export default AdminDetails;
