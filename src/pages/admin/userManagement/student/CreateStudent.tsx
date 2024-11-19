import { FieldValues } from "react-hook-form";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import { Button, Col, Divider, Row } from "antd";
import CustomSelect from "../../../../components/form/CustomSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import CustomDatePicker from "../../../../components/form/CustomDatePicker";
import { studentDefaultValues } from "../../../../constants/default";
import {
  useGetAllAcademicDepertmentQuery,
  useGetAllSemestersQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import { TSelectOptions } from "../../../../types";

const CreateStudent = () => {
  //Get Semester Options
  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);
  const semesterOptions: TSelectOptions[] =
    semesterData?.data?.map(({ _id, name, year }) => ({
      value: String(_id),
      label: `${String(name)} - ${String(year)}`,
    })) || [];

  //Get Depertment Options
  const { data: depertmentData, isLoading: dIsLoading } =
    useGetAllAcademicDepertmentQuery(undefined);
  const depertmentOptions: TSelectOptions[] =
    depertmentData?.data?.map(({ _id, name }) => ({
      value: String(_id),
      label: String(name),
    })) || [];
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    // const formData = new FormData();

    // formData.append("data", JSON.stringify(data));

    // //! This is for Development
    // console.log(Object.fromEntries(formData));
  };
  return (
    <CustomForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
      <Divider orientation="left">Personal Info</Divider>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomInput type="text" label="First Name" name="name.firstName" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomInput type="text" label="Middle Name" name="name.middleName" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomInput type="text" label="Last Name" name="name.lastName" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomSelect
            name="bloodGroup"
            label="Blood Group"
            options={bloodGroupOptions}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomDatePicker name="dateOfBirth" label="Date Of Birt" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomSelect name="gender" label="Gender" options={genderOptions} />
        </Col>
      </Row>

      <Divider orientation="left">Contact Info</Divider>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomInput type="email" label="Email" name="email" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomInput type="text" label="Contact Number" name="contactNo" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomInput
            type="text"
            label="Emergency Contact"
            name="emergencyContactNo"
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomInput
            type="text"
            label="Present Address"
            name="presentAddress"
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <CustomInput
            type="text"
            label="Permanent Address"
            name="permanentAddress"
          />
        </Col>
      </Row>

      <Divider orientation="left">Gurdian</Divider>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Father Name"
            name="gurdian.fatherName"
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Mother Name"
            name="gurdian.motherName"
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Father Occupation"
            name="gurdian.fatherOccupation"
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Mother Occupation"
            name="gurdian.motherOccupation"
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Father Contact No"
            name="gurdian.fatherContactNo"
          />
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Mother Contact No"
            name="gurdian.motherContactNo"
          />
        </Col>
      </Row>

      <Divider orientation="left">Local Guardian</Divider>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <CustomInput type="text" label="Name" name="localGuardians.name" />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Contact Number"
            name="localGuardians.contactNo"
          />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Occupation"
            name="localGuardians.occupation"
          />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <CustomInput
            type="text"
            label="Address"
            name="localGuardians.address"
          />
        </Col>
      </Row>
      <Divider orientation="left">Academic Information</Divider>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomSelect
            name="admissionSemester"
            options={semesterOptions}
            label="Admission Semester"
            disabled={sIsLoading}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomSelect
            name="academicDepartment"
            options={depertmentOptions}
            label="Academic Department"
            disabled={dIsLoading}
          />
        </Col>
      </Row>

      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </CustomForm>
  );
};

export default CreateStudent;
