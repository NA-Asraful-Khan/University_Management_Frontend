import { Button, Col, Flex } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import { FieldValues } from "react-hook-form";
import { academicDepertmentSchema } from "../../../../schemas/academicManagement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "../../../../components/form/CustomSelect";
import {
  useAddAcademicDepertmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import CustomInput from "../../../../components/form/CustomInput";
import {
  TAcademicDepertment,
  TResponse,
  TSelectOptions,
} from "../../../../types";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const CreateAcademicDepertment = () => {
  const navigate = useNavigate();

  // Call Add Depertment Hook
  const [addAcademicDepertment] = useAddAcademicDepertmentMutation();

  // Get Faculty Data
  const { data: academicFacultyData } =
    useGetAllAcademicFacultyQuery(undefined);

  // Refactor Select Options from Faculty Data
  const facultiesOptions: TSelectOptions[] =
    academicFacultyData?.data?.map(({ _id, name }) => ({
      value: String(_id),
      label: String(name),
    })) || [];

  // Form Submit Handler
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating... ");

    try {
      const res = (await addAcademicDepertment(
        data
      )) as TResponse<TAcademicDepertment>;

      if (!res.error) {
        toast.success("Academic Depertment created successfully", {
          id: toastId,
        });
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
        >
          <CustomInput type={"text"} name={"name"} label={"Depertment Name"} />
          <CustomSelect
            name="academicFaculty"
            options={facultiesOptions}
            label="Faculties"
          />
          <Button htmlType="submit">Create</Button>
          <Link className="ml-2" to={`/admin/academic-depertment`}>
            <Button>Cancel</Button>
          </Link>
        </CustomForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepertment;
