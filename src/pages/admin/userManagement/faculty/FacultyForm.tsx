import { Controller, FieldValues } from "react-hook-form";
import { useGetAllAcademicDepertmentQuery } from "../../../../redux/features/admin/academicManagement.api";
import { TFaculty, TResponse, TSelectOptions } from "../../../../types";
import CustomForm from "../../../../components/form/CustomForm";
import { Button, Col, Divider, Form, Input, Row, Space } from "antd";
import CustomInput from "../../../../components/form/CustomInput";
import CustomSelect from "../../../../components/form/CustomSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import CustomDatePicker from "../../../../components/form/CustomDatePicker";
import { facultyDefaultValues } from "../../../../constants/default";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useAddFacultyMutation,
  useUpdateFacultyMutation,
} from "../../../../redux/features/admin/userManagement.api";
import { DefaultFacultyData } from "./UpdateFaculty";
import { facultySchema } from "../../../../schemas/userManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type TFacultyProps = {
  id?: string;
  defaultValues?: DefaultFacultyData | null | undefined;
  defaultDate?: string;
};
const FacultyForm = ({ id, defaultValues, defaultDate }: TFacultyProps) => {
  const navigate = useNavigate();

  // Call Hooks
  const [addFaculty] = useAddFacultyMutation();
  const [updateFaculty] = useUpdateFacultyMutation();

  //Get Depertment Options
  const { data: depertmentData, isLoading: dIsLoading } =
    useGetAllAcademicDepertmentQuery(undefined);
  const depertmentOptions: TSelectOptions[] =
    depertmentData?.data?.map(({ _id, name }) => ({
      value: String(_id),
      label: String(name),
    })) || [];

  // Form Submit Handler
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating... ");
    try {
      const facultyData = {
        faculty: data,
      };
      const formData = new FormData();

      formData.append("data", JSON.stringify(facultyData));
      formData.append("file", data.image);

      let res: TResponse<TFaculty>;

      if (id) {
        // Update operation
        res = (await updateFaculty({
          data: formData,
          id: id,
        })) as TResponse<TFaculty>;
      } else {
        // Add operation
        res = (await addFaculty(formData)) as TResponse<TFaculty>;
      }

      if (!res.error) {
        toast.success(`Faculty ${id ? "updated" : "created"} successfully`, {
          id: toastId,
        });
        navigate(`/admin/faculty-list`);
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
      defaultValues={defaultValues ? defaultValues : facultyDefaultValues}
      resolver={zodResolver(facultySchema)}
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
          <CustomDatePicker
            name="dateOfBirth"
            label="Date Of Birth"
            defaultValue={defaultDate}
          />
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

      <Divider orientation="left">Academic Information</Divider>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomSelect
            name="academicDepartment"
            options={depertmentOptions}
            label="Academic Department"
            disabled={dIsLoading}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput type="text" label="Designation" name="designation" />
        </Col>
      </Row>

      <Space>
        <Button type="primary" htmlType="submit">
          {id ? "Update" : "Create"}
        </Button>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </Space>
    </CustomForm>
  );
};

export default FacultyForm;
