import { Button, Col, Row, Space } from "antd";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import CustomSelect from "../../../../components/form/CustomSelect";
import { FieldValues } from "react-hook-form";
import { TSelectOptions } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { useGetAllSemestersQuery } from "../../../../redux/features/admin/academicManagement.api";
import { SemesterStatusOption } from "../../../../constants/semester";
import CustomDatePicker from "../../../../components/form/CustomDatePicker";

const SemesterRegistration = () => {
  const navigate = useNavigate();

  // Call Add Depertment Hook
  // const [addAcademicDepertment] = useAddAcademicDepertmentMutation();

  // Get Faculty Data
  const { data: academicSemester } = useGetAllSemestersQuery(undefined);

  // Refactor Select Options from Faculty Data
  const semesterOption: TSelectOptions[] =
    academicSemester?.data?.map(({ _id, name, year }) => ({
      value: String(_id),
      label: `${name} - ${year}`,
    })) || [];

  // Form Submit Handler
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // const toastId = toast.loading("Creating... ");

    // try {
    //   const res = (await addAcademicDepertment(
    //     data
    //   )) as TResponse<TAcademicDepertment>;

    //   if (!res.error) {
    //     toast.success("Academic Depertment created successfully", {
    //       id: toastId,
    //     });
    //     navigate(`/admin/academic-depertment`);
    //   } else {
    //     toast.error(res.error.data.message, {
    //       id: toastId,
    //     });
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong", {
    //     id: toastId,
    //   });
    //   console.error(error);
    // }
  };
  return (
    <CustomForm
      onSubmit={onSubmit}
      // resolver={zodResolver(academicDepertmentSchema)}
    >
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomSelect
            name="academicSemester"
            options={semesterOption}
            label="Faculties"
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomSelect
            name="status"
            options={SemesterStatusOption}
            label="Status"
          />
        </Col>
      </Row>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomDatePicker name={"startDate"} label={"Start Date"} />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomDatePicker name={"endDate"} label={"End Date"} />
        </Col>
      </Row>
      <Row gutter={16} justify="start" align="middle">
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput
            type={"number"}
            name={"minCredit"}
            label={"Min Credit"}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInput
            type={"number"}
            name={"maxCredit"}
            label={"Max Credit"}
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

export default SemesterRegistration;
