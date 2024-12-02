import { useParams } from "react-router-dom";
import { TQueryParam } from "../../../types";
import { useState } from "react";
import { useGetFacultyScheduleQuery } from "../../../redux/features/faculty/facultyCourseManagement";
import {
  Button,
  Pagination,
  PaginationProps,
  Table,
  TableColumnsType,
} from "antd";

const CourseStudentList = () => {
  const { offeredCourseId } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const { pathname } = useLocation();

  // Get Adacemic DepertmentData Data
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

  //const handleMarksUpdate
  const handleMarksUpdate = (item: any) => {
    console.log(item);
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
      <h1> This is CourseStudentList Component {offeredCourseId}</h1>
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
    </div>
  );
};

export default CourseStudentList;
