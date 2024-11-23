import { Button, Col, Row, Space } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../../../components/form/CustomSelect";

import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/admin/courseManagement.api";
import { TCourse, TResponse, TSelectOptions } from "../../../../types";
import { toast } from "sonner";

const CreateCourses = () => {
  const navigate = useNavigate();
  // Call Add Course Hook
  const [addCourse] = useAddCourseMutation();

  // Get Course Data
  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  // Refactor Select Options from Course Data
  const coursesOption: TSelectOptions[] =
    coursesData?.data?.map(({ _id, title }) => ({
      value: String(_id),
      label: String(title),
    })) || [];
  // Form Submit Handler
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Creating... ");

    // Refactor Submitted Data
    const submittedData = {
      ...data,
      credits: Number(data?.credits),
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: string) => ({
            course: item,
          }))
        : [],
    };
    try {
      const res = (await addCourse(submittedData)) as TResponse<TCourse>;

      if (!res.error) {
        toast.success("Course created successfully", {
          id: toastId,
        });
        navigate(`/admin/courses`);
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
    <CustomForm
      onSubmit={onSubmit}
      // resolver={zodResolver(academicDepertmentSchema)}
    >
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput type={"text"} name={"title"} label={"Title"} />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput type={"text"} name={"prefix"} label={"Prefix"} />
        </Col>
      </Row>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput type={"text"} name={"code"} label={"Code"} />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput type={"number"} name={"credits"} label={"Credits"} />
        </Col>
      </Row>
      <Row gutter={16} justify="center" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomSelect
            mode="multiple"
            options={coursesOption}
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
          />
        </Col>
      </Row>

      <Space>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
      </Space>
    </CustomForm>
  );
};

export default CreateCourses;
