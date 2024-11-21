import { Controller, FieldValues } from "react-hook-form";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import CustomSelect from "../../../../components/form/CustomSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import CustomDatePicker from "../../../../components/form/CustomDatePicker";
import { studentDefaultValues } from "../../../../constants/default";
import {
  useGetAllAcademicDepertmentQuery,
  useGetAllSemestersQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import { TResponse, TSelectOptions, TStudent } from "../../../../types";
import { useAddStudentMutation } from "../../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "../../../../schemas/userManagement.schema";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [addStudent] = useAddStudentMutation();

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
    useGetAllAcademicDepertmentQuery(undefined, { skip: sIsLoading });
  const depertmentOptions: TSelectOptions[] =
    depertmentData?.data?.map(({ _id, name }) => ({
      value: String(_id),
      label: String(name),
    })) || [];
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating... ");
    console.log(data);
    try {
      const studentData = {
        student: data,
      };
      const formData = new FormData();

      formData.append("data", JSON.stringify(studentData));
      formData.append("file", data.image);

      const res = (await addStudent(formData)) as TResponse<TStudent>;

      if (!res.error) {
        toast.success("Academic Depertment created successfully", {
          id: toastId,
        });
        navigate(`/admin/student-list`);
      } else {
        toast.error(res.error.data.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
      console.error(error);
    }

    // //! This is for Development
    // console.log(Object.fromEntries(formData));
  };
  return (
    <CustomForm
      onSubmit={onSubmit}
      defaultValues={studentDefaultValues}
      resolver={zodResolver(studentSchema)}
    >
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
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Controller
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item label="Picture">
                <Input
                  type="file"
                  value={value?.fileName}
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              </Form.Item>
            )}
          />
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
      <Link className="ml-2" to={`/admin/student-list`}>
        <Button>Cancel</Button>
      </Link>
    </CustomForm>
  );
};

export default CreateStudent;
