import { Button, Col, Flex, Space } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import { FieldValues } from "react-hook-form";
import { academicFacultySchema } from "../../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../components/form/CustomInput";
import { toast } from "sonner";
import { TAcademicFaculty, TResponse } from "../../../../types";
import { useAddAcademicFacultyMutation } from "../../../../redux/features/admin/academicManagement.api";
import { useNavigate } from "react-router-dom";

const CreateAcademicFaculty = () => {
  const navigate = useNavigate();
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  // Form Submit Handler
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating... ");

    try {
      const res = (await addAcademicFaculty(
        data
      )) as TResponse<TAcademicFaculty>;

      if (!res.error) {
        toast.success("Academic Faculty created successfully", {
          id: toastId,
        });
        navigate(`/admin/academic-faculty`);
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
          resolver={zodResolver(academicFacultySchema)}
        >
          <CustomInput type={"text"} name={"name"} label={"Academic Faculty"} />
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

export default CreateAcademicFaculty;
