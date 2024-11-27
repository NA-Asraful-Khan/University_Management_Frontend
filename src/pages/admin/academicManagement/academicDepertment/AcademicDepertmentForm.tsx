import { Button, Col, Flex, Space } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import { FieldValues } from "react-hook-form";
import { academicDepertmentSchema } from "../../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "../../../../components/form/CustomSelect";
import {
  useAddAcademicDepertmentMutation,
  useUpdateAcademicDepertmentMutation,
} from "../../../../redux/features/admin/academicManagement.api";
import CustomInput from "../../../../components/form/CustomInput";
import { TAcademicDepertment, TResponse } from "../../../../types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAcademicFacultyOptions } from "../../../../constants/AllOptions";

type TAcademicDepertmentProps = {
  id?: string;
  defaultValues?: Partial<TAcademicDepertment>;
};
const AcademicDepertmentForm = ({
  id,
  defaultValues,
}: TAcademicDepertmentProps) => {
  const navigate = useNavigate();

  // Call Add Depertment Hook
  const [addAcademicDepertment] = useAddAcademicDepertmentMutation();
  const [updateAcademicDepertment] = useUpdateAcademicDepertmentMutation();

  // Refactor Select Options from Faculty Data
  const facultiesOptions = useAcademicFacultyOptions();

  // Form Submit Handler
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating... ");

    try {
      let res: TResponse<TAcademicDepertment>;

      if (id) {
        // Update operation
        res = (await updateAcademicDepertment({
          data,
          id,
        })) as TResponse<TAcademicDepertment>;
      } else {
        // Add operation
        res = (await addAcademicDepertment(
          data
        )) as TResponse<TAcademicDepertment>;
      }

      if (!res.error) {
        toast.success(
          `Academic Department ${id ? "updated" : "created"} successfully`,
          {
            id: toastId,
          }
        );
        navigate(`/admin/academic-depertment`);
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
          resolver={zodResolver(academicDepertmentSchema)}
          defaultValues={defaultValues ? defaultValues : {}}
        >
          <CustomInput type={"text"} name={"name"} label={"Depertment Name"} />
          <CustomSelect
            name="academicFaculty"
            options={facultiesOptions}
            label="Faculties"
          />
          <Space>
            <Button type="primary" htmlType="submit">
              {id ? "Update" : "Create"}
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </Space>
        </CustomForm>
      </Col>
    </Flex>
  );
};

export default AcademicDepertmentForm;
