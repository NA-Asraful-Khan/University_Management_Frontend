import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglelOfferedCourseQuery } from "../../../../redux/features/admin/courseManagement.api";
import { Button } from "antd";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";

const DetailOfferedCourse = () => {
  const navigate = useNavigate();
  const { offeredCourseId } = useParams();

  // Get Single Student Data
  const {
    data: offeredCourseData,
    isLoading,
    isFetching,
  } = useGetSinglelOfferedCourseQuery(offeredCourseId);

  // Destructure with a default value to avoid errors
  const { maxCapacity } = offeredCourseData?.data ?? {};
  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }

  // Ensure studentData exists before rendering details
  if (!offeredCourseData || !offeredCourseData.data) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Offered Course not found or an error occurred.</p>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </Button>
      <h1>
        {" "}
        This is Offered COurse Details Component {offeredCourseId}-{" "}
        {maxCapacity}
      </h1>
    </div>
  );
};

export default DetailOfferedCourse;
