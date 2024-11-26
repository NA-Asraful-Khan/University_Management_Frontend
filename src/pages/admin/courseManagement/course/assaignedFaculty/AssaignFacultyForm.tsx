import { Button, Col, Flex, Space } from "antd";
import CustomForm from "../../../../../components/form/CustomForm";
import { useNavigate, useParams } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import CustomSelect from "../../../../../components/form/CustomSelect";
import { TResponse, TSelectOptions } from "../../../../../types";
import { useGetAllFacultyQuery } from "../../../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { useUpdateFacultyWCourseMutation } from "../../../../../redux/features/admin/courseManagement.api";

type TAssaignFacultyProps = {
  defaultValues?: {
    faculties?: string[] | undefined;
  };
};
const AssaignFacultyForm = ({ defaultValues }: TAssaignFacultyProps) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Call Add Course Hook
  const [assaignFaculty] = useUpdateFacultyWCourseMutation();

  // Get Faculty Data
  const { data: facultyData } = useGetAllFacultyQuery(undefined);

  // Refactor Select Options from Faculty Data
  const facultyOptions: TSelectOptions[] =
    facultyData?.data?.map(({ _id, fullName }) => ({
      value: String(_id),
      label: String(fullName),
    })) || [];

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating... ");
    // Refactor Submitted Data
    const submittedData = {
      data: data,
      id: courseId,
    };
    try {
      const res = (await assaignFaculty(submittedData)) as TResponse<any>;

      if (!res.error) {
        toast.success(`Faculty Updated successfully`, {
          id: toastId,
        });
        navigate(-1);
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
      <Col span={12}>
        <CustomForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(academicFacultySchema)}
          defaultValues={defaultValues ? defaultValues : {}}
        >
          <CustomSelect
            mode="multiple"
            options={facultyOptions}
            name="faculties"
            label="Select Faculty"
          />
          <Space>
            <Button type="primary" htmlType="submit">
              {/* {id ? "Update" : "Create"} */}
              Create
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </Space>
        </CustomForm>
      </Col>
    </Flex>
  );
};

export default AssaignFacultyForm;
