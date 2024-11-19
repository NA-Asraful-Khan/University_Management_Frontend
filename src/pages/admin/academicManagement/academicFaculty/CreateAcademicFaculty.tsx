import { Button, Col, Flex } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import { FieldValues } from "react-hook-form";
import { academicFacultySchema } from "../../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../../../components/form/CustomInput";
import { toast } from "sonner";
import { TAcademicFaculty, TResponse } from "../../../../types";
import { useAddAcademicFacultyMutation } from "../../../../redux/features/admin/academicManagement.api";
import { Link, useNavigate } from "react-router-dom";

const CreateAcademicFaculty = () => {
  const navigate = useNavigate();
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
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
          <Button htmlType="submit">Create</Button>
          <Link className="ml-2" to={`/admin/academic-faculty`}>
            <Button>Cancel</Button>
          </Link>
        </CustomForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
