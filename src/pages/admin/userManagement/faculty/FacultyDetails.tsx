import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglelFacultyQuery } from "../../../../redux/features/admin/userManagement.api";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, DescriptionsProps } from "antd";
import moment from "moment";
import UserInfoDetails from "../../../shared/UserInfoDetails";

const FacultyDetails = () => {
  const navigate = useNavigate();
  const { facultyID } = useParams();

  // Get Single Student Data
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetSinglelFacultyQuery(facultyID);

  console.log(facultyData?.data);
  // Destructure with a default value to avoid errors
  const {
    id,
    fullName,
    dateOfBirth,
    gender,
    bloodGroup,
    email,
    contactNo,
    emergencyContactNo,
    permanentAddress,
    presentAddress,
    designation,
    academicDepartment,
    academicFaculty,
  } = facultyData?.data ?? {};

  // Default to a fallback value
  const dob = dateOfBirth ? new Date(dateOfBirth) : new Date();
  const formattedDateOfBirth = moment(dob).format("LL");

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

  //Info Array
  const personalInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "First Name",
      children: fullName,
    },
    {
      key: "2",
      label: "ID",
      children: id,
    },
    {
      key: "3",
      label: "Date of Birth",
      children: moment(new Date(formattedDateOfBirth)).format("LL"),
    },
    {
      key: "4",
      label: "Gender",
      children: gender?.toUpperCase(),
    },
    {
      key: "5",
      label: "Blood Group",
      children: bloodGroup,
    },
  ];

  const contactInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Email",
      children: email,
    },
    {
      key: "2",
      label: "Contact Number",
      children: contactNo,
    },
    {
      key: "3",
      label: "Emergency Contact",
      children: emergencyContactNo,
    },
    {
      key: "4",
      label: "Present Address",
      children: presentAddress,
    },
    {
      key: "5",
      label: "Permanent Address",
      children: permanentAddress,
    },
  ];

  const academicInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Designation",
      children: designation,
    },
    {
      key: "2",
      label: "Academic Faculty",
      children: academicFaculty?.name,
    },
    {
      key: "3",
      label: "Academic Department",
      children: academicDepartment?.name,
    },
  ];

  const finalData = [
    { title: "Personal Info", data: personalInfo },
    { title: "Contact Info", data: contactInfo },
    { title: "Academic Info", data: academicInfo },
  ];
  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </Button>
      <UserInfoDetails userData={finalData} />
    </div>
  );
};

export default FacultyDetails;
