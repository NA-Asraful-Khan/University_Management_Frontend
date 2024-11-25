import { Button, Col, Flex, Space } from "antd";
import CustomForm from "../../../../../components/form/CustomForm";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import CustomSelect from "../../../../../components/form/CustomSelect";
import { TSelectOptions } from "../../../../../types";
import { useGetAllFacultyQuery } from "../../../../../redux/features/admin/userManagement.api";

const AssaignFacultyForm = () => {
  const navigate = useNavigate();

  // Get Faculty Data
  const { data: facultyData } = useGetAllFacultyQuery(undefined);

  // Refactor Select Options from Faculty Data
  const facultyOptions: TSelectOptions[] =
    facultyData?.data?.map(({ _id, fullName }) => ({
      value: String(_id),
      label: String(fullName),
    })) || [];

  console.log(facultyData);
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <CustomForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(academicFacultySchema)}
          //   defaultValues={defaultValues ? defaultValues : {}}
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
