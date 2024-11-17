import { FieldValues } from "react-hook-form";
import CustomForm from "../../../../components/form/CustomForm";
import { Button, Col, Flex } from "antd";
import CustomSelect from "../../../../components/form/CustomSelect";
import { SemesterOptions, yearOptions } from "../../../../constants/semester";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../../schemas/academicManagement.schema";

const CreateAcademicSemester = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <CustomForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <CustomSelect
            name="name"
            options={SemesterOptions}
            label="Semester"
          />
          <CustomSelect name="year" options={yearOptions} label="Year" />
          <Button htmlType="submit">Create</Button>
        </CustomForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
