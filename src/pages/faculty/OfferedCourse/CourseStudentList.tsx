import { useParams } from "react-router-dom";
import { TQueryParam, TResponse } from "../../../types";
import { useState } from "react";
import {
  useGetFacultyScheduleQuery,
  useUpdateCourseMarksMutation,
} from "../../../redux/features/faculty/facultyCourseManagement";
import {
  Button,
  Modal,
  Pagination,
  PaginationProps,
  Table,
  TableColumnsType,
} from "antd";
import CustomInput from "../../../components/form/CustomInput";
import CustomForm from "../../../components/form/CustomForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CourseStudentList = () => {
  const { offeredCourseId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowItem, setRowItem] = useState<any>({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const { pathname } = useLocation();

  // Call Update Marks Hook
  const [updateMark] = useUpdateCourseMarksMutation();
  // Get Faculty Schedule Data Data
  const {
    data: facultySchedule,
    isLoading,
    isFetching,
  } = useGetFacultyScheduleQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  //pagination Data
  const pagination = facultySchedule?.pagination;

  //Modal Function
  //const handleMarksUpdate
  const handleMarksUpdate = (item: any) => {
    setRowItem(item);
    setIsModalOpen(true);
  };

  const handleOk = async (data: FieldValues) => {
    const updateMarksData = {
      semesterRegistration: rowItem?.semesterRegistration,
      offeredCourse: rowItem?.offeredCourse,
      student: rowItem?.student?._id,
      courseMarks: {
        classTest1: Number(data?.classTest1),
        midTerm: Number(data?.midTerm),
        classTest2: Number(data?.classTest2),
        finalTerm: Number(data?.finalTerm),
      },
    };

    const toastId = toast.loading("Updating... ");

    try {
      const res = (await updateMark(updateMarksData)) as TResponse<any>;

      if (!res.error) {
        toast.success(`Marks Updated successfully`, {
          id: toastId,
        });

        setIsModalOpen(false);
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

  //Table Data
  const tableData: any[] =
    facultySchedule?.data?.reduce(
      (
        acc,
        { _id, student, offeredCourse, semesterRegistration, courseMarks }
      ) => {
        // Only process entries where offeredCourse._id matches offeredCourseId
        if (offeredCourse?._id === offeredCourseId) {
          // Check if offeredCourse._id is already in the accumulator
          if (
            !acc.some((item: any) => item.offeredCourseId === offeredCourseId)
          ) {
            acc.push({
              key: _id,
              student,
              offeredCourse: offeredCourseId,
              semesterRegistration: semesterRegistration?._id,
              courseMarks,
            });
          }
        }
        return acc;
      },
      []
    ) || [];

  // Table Columns
  const columns: TableColumnsType<any> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: any, index: number) => index + 1, // Generate index
    },
    {
      title: "ID",
      dataIndex: ["student", "id"], // Access nested field
      key: "student.id",
    },
    {
      title: "Name",
      dataIndex: ["student", "fullName"], // Access nested field
      key: "student.fullName",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div className="flex gap-2">
            <Button onClick={() => handleMarksUpdate(item)}>Marks</Button>
          </div>
        );
      },
    },
  ];

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPageSize(pageSize);
  };
  return (
    <div>
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />

      <Pagination
        showQuickJumper
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultCurrent={1}
        total={pagination?.total}
        pageSize={pagination?.limit}
        // onChange={onChange}
        onChange={(page) => {
          setPage(page);
        }}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
      />

      <Modal
        title="Marks"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <CustomForm
            onSubmit={handleOk}
            defaultValues={rowItem?.courseMarks ? rowItem?.courseMarks : {}}
          >
            <CustomInput type="number" label="Class Test 1" name="classTest1" />
            <CustomInput type="number" label="Mid Term" name="midTerm" />
            <CustomInput type="number" label="Class Test 2" name="classTest2" />
            <CustomInput type="number" label="Final Term" name="finalTerm" />
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </CustomForm>
        </div>
      </Modal>
    </div>
  );
};

export default CourseStudentList;
