import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglelOfferedCourseQuery } from "../../../../redux/features/admin/courseManagement.api";
import { Button, DescriptionsProps } from "antd";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import UserInfoDetails from "../../../shared/UserInfoDetails";

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
  const {
    academicDepartment,
    academicFaculty,
    academicSemester,
    course,
    days,
    endTime,
    faculty,
    maxCapacity,
    section,
    semesterRegistration,
    startTime,
  } = offeredCourseData?.data ?? {};
  console.log(offeredCourseData?.data);
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

  //Info Array
  const Info: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Course Title",
      children: course?.title,
    },
    {
      key: "2",
      label: "Semester",
      children: `${academicSemester?.name} - ${academicSemester?.year}`,
    },
    {
      key: "3",
      label: "Academic Faculty",
      children: academicFaculty?.name,
    },
    {
      key: "4",
      label: "Academic Department",
      children: academicDepartment?.name,
    },
    {
      key: "5",
      label: "Faculty",
      children: faculty?.fullName,
    },
    {
      key: "6",
      label: "Semester Status",
      children: semesterRegistration?.status,
    },
    {
      key: "7",
      label: "Days",
      children: days.join(", "),
    },
    {
      key: "8",
      label: "Start Time",
      children: moment(startTime, "HH:mm").format("hh:mm A"),
    },
    {
      key: "9",
      label: "End Time",
      children: moment(endTime, "HH:mm").format("hh:mm A"),
    },
    {
      key: "10",
      label: "Max Capacity",
      children: maxCapacity,
    },
    {
      key: "11",
      label: "Section",
      children: section,
    },
  ];

  const finalData = [{ title: "Offered Course Info", data: Info }];
  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </Button>
      <UserInfoDetails userData={finalData} />
    </div>
  );
};

export default DetailOfferedCourse;
