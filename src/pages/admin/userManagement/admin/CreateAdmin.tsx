import { FieldValues } from "react-hook-form";
import CustomForm from "../../../../components/form/CustomForm";
import { adminDefaultValues } from "../../../../constants/default";
import { Button, Col, Divider, Row } from "antd";
import CustomInput from "../../../../components/form/CustomInput";
import CustomSelect from "../../../../components/form/CustomSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import CustomDatePicker from "../../../../components/form/CustomDatePicker";
import { Link } from "react-router-dom";

const CreateAdmin = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    // const formData = new FormData();

    // formData.append("data", JSON.stringify(data));

    // //! This is for Development
    // console.log(Object.fromEntries(formData));
  };
  return (
    <CustomForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
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
          <CustomDatePicker name="dateOfBirth" label="Date Of Birth" />
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

      <Divider orientation="left">Academic Information</Divider>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput type="text" label="Designation" name="designation" />
        </Col>
      </Row>

      <Button type="primary" htmlType="submit">
        Create
      </Button>
      <Link className="ml-2" to={`/admin/admin-list`}>
        <Button>Cancel</Button>
      </Link>
    </CustomForm>
  );
};

export default CreateAdmin;
