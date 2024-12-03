import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, DescriptionsProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglelStudentQuery } from "../../../../redux/features/admin/userManagement.api";
import moment from "moment";
import UserInfoDetails from "../../../shared/UserInfoDetails";

const StudentDetails = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  // Get Single Student Data
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetSinglelStudentQuery(studentId);

  console.log(studentData?.data);
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
    admissionSemester,
    academicDepartment,
    gurdian,
    localGuardians,
  } = studentData?.data ?? {};

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
  if (!studentData || !studentData.data) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Student not found or an error occurred.</p>
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

  const gurdianInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Father Name",
      children: gurdian?.fatherName,
    },
    {
      key: "2",
      label: "Father Contact",
      children: gurdian?.fatherContactNo,
    },
    {
      key: "3",
      label: "Father Occupation",
      children: gurdian?.fatherOccupation,
    },
    {
      key: "4",
      label: "Mother Name",
      children: gurdian?.motherName,
    },
    {
      key: "5",
      label: "Mother Contact",
      children: gurdian?.motherContactNo,
    },
    {
      key: "6",
      label: "Mother Occupation",
      children: gurdian?.motherOccupation,
    },
  ];
  const localGurdianInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: localGuardians?.name,
    },
    {
      key: "2",
      label: "Contact",
      children: localGuardians?.contactNo,
    },
    {
      key: "3",
      label: "Occupation",
      children: localGuardians?.occupation,
    },
    {
      key: "4",
      label: "Address",
      children: localGuardians?.address,
    },
  ];

  const academicInfo: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Designation",
      children: admissionSemester?.name,
    },
    {
      key: "2",
      label: "Academic Faculty",
      children: academicDepartment?.academicFaculty?.name,
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
    { title: "Gurdian Info", data: gurdianInfo },
    { title: "Local Gurdian Info", data: localGurdianInfo },
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

export default StudentDetails;
