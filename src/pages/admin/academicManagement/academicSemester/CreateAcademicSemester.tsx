import { FieldValues } from "react-hook-form";
import CustomForm from "../../../../components/form/CustomForm";
import { Button, Col, Flex, Space } from "antd";
import CustomSelect from "../../../../components/form/CustomSelect";
import { SemesterOptions, yearOptions } from "../../../../constants/semester";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TAcademicSemester, TResponse } from "../../../../types";

const CreateAcademicSemester = () => {
  const navigate = useNavigate();
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  // Form Submit Handler
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating... ");
    try {
      const res = (await addAcademicSemester(
        data
      )) as TResponse<TAcademicSemester>;

      if (!res.error) {
        toast.success("Academic Semester created successfully", {
          id: toastId,
        });
        navigate(`/admin/academic-semester`);
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
          <Space>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </Space>
        </CustomForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
