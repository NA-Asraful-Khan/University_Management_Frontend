import { FieldValues } from "react-hook-form";
import {
  useAcademicDepartmentOptions,
  useAcademicFacultyOptions,
  useCourseOptions,
  useDaysOfWeek,
  useSemesterRegistrationOptions,
} from "../../../../constants/AllOptions";
import { Button, Col, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../../../components/form/CustomSelect";
import CustomForm from "../../../../components/form/CustomForm";
import CustomInput from "../../../../components/form/CustomInput";
import CustomTimePicker from "../../../../components/form/CustomTimePicker";
import { toast } from "sonner";
import { TResponse, TSelectOptions } from "../../../../types";
import {
  useAddOfferedCourseMutation,
  useGetFacultyWCourseQuery,
  useUpdateOfferedCourseMutation,
} from "../../../../redux/features/admin/courseManagement.api";
import dayjs from "dayjs";
import { DefaultOfferedCourseData } from "./UpdateOfferedCourse";
import CustomWatchSelect from "../../../../components/form/CustomWatchSelect";
import { useState } from "react";

type TOfferedCourseProps = {
  id?: string;
  defaultValues?: DefaultOfferedCourseData | null | undefined;
  defaultDate?: string;
};
const OfferedCourseForm = ({ id, defaultValues }: TOfferedCourseProps) => {
  const [courseId, setCourseId] = useState<string>("");
  const navigate = useNavigate();

  //Call Hooks
  const [addOfferedCourse] = useAddOfferedCourseMutation();
  const [UpdateOfferedCourse] = useUpdateOfferedCourseMutation();

  //Call Options
  const semesterOptions = useSemesterRegistrationOptions();
  const academicFacultyOptions = useAcademicFacultyOptions();
  const academicDepartmentOptions = useAcademicDepartmentOptions();
  const courseOptions = useCourseOptions();
  const daysOptions = useDaysOfWeek();

  //Conditional FacultyOptions
  const { data: courseFaculty } = useGetFacultyWCourseQuery(courseId, {
    skip: !courseId,
  });

  const FacultyOptions: TSelectOptions[] =
    courseFaculty?.data?.faculties?.map(({ _id, fullName }) => ({
      value: String(_id),
      label: String(fullName),
    })) || [];

  // Form Submit Handler
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating... ");
    try {
      const finalData = {
        ...data,
        maxCapacity: Number(data?.maxCapacity),
        section: Number(data?.section),
        startTime: dayjs(data?.startTime[0]).format("HH:mm"),
        endTime: dayjs(data?.startTime[1]).format("HH:mm"),
      };

      let res: TResponse<any>;

      if (id) {
        // Update operation
        res = (await UpdateOfferedCourse({
          data: finalData,
          id: id,
        })) as TResponse<any>;
      } else {
        // Add operation
        res = (await addOfferedCourse(finalData)) as TResponse<any>;
      }

      if (!res.error) {
        toast.success(`Offered Course created successfully`, {
          id: toastId,
        });
        navigate(`/admin/offered-course-list`);
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
    <div>
      <h1 className="text-xl font-bold">Create Student</h1>
      <CustomForm
        onSubmit={onSubmit}
        defaultValues={defaultValues ? defaultValues : {}}
        // resolver={zodResolver(studentSchema)}
      >
        <Row gutter={16} justify="start" align="middle">
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <CustomSelect
              name="semesterRegistration"
              options={semesterOptions}
              label="Semester"
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <CustomSelect
              name="academicFaculty"
              options={academicFacultyOptions}
              label="Academic Faculty"
            />
          </Col>
        </Row>

        <Row gutter={16} justify="start" align="middle">
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <CustomSelect
              name="academicDepartment"
              options={academicDepartmentOptions}
              label="Academic Department"
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <CustomSelect
              mode="multiple"
              name="days"
              options={daysOptions}
              label="Day"
            />
          </Col>
        </Row>
        <Row gutter={16} justify="start" align="middle">
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <CustomWatchSelect
              name="course"
              options={courseOptions}
              label="Course"
              onValueChange={setCourseId}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            {courseId && (
              <CustomSelect
                name="faculty"
                options={FacultyOptions}
                label="Faculty"
              />
            )}
          </Col>
        </Row>
        <Row gutter={16} justify="start" align="middle">
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <CustomTimePicker label="Duration" name="startTime" />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <CustomInput
              type="number"
              label="Max Capacity"
              name="maxCapacity"
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <CustomInput type="number" label="Section" name="section" />
          </Col>
        </Row>

        <Space>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Space>
      </CustomForm>
    </div>
  );
};

export default OfferedCourseForm;
