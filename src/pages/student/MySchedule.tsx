import {
  Button,
  Divider,
  Modal,
  Pagination,
  PaginationProps,
  Table,
  TableColumnsType,
} from "antd";
import { useGetAllEnrolledCourseQuery } from "../../redux/features/student/studentCourseManagement";
import { useState } from "react";
import { TQueryParam } from "../../types";

const MySchedule = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //for Modal
  const [rowItem, setRowItem] = useState<any>({});
  //For Modal

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item: any) => {
    setRowItem({
      courseMarks: item?.courseMarks,
      grade: item?.grade,
      gradePoints: item?.gradePoints,
    });
    setIsModalOpen(true);
  };
  console.log(rowItem);

  // Get My Enrolled Course Data
  const {
    data: myEnrolledCourse,
    isLoading,
    isFetching,
  } = useGetAllEnrolledCourseQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  console.log(myEnrolledCourse);
  //pagination Data
  const pagination = myEnrolledCourse?.pagination;

  // Table Data
  const tableData: any[] =
    myEnrolledCourse?.data?.map(
      ({
        _id,
        faculty,
        offeredCourse,
        course,
        academicSemester,
        courseMarks,
        grade,
        gradePoints,
        isCompleted,
      }) => ({
        key: _id,
        faculty,
        offeredCourse,
        course,
        academicSemester,
        courseMarks,
        grade,
        gradePoints,
        isCompleted,
      })
    ) || [];

  const columns: TableColumnsType<any> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: any, index: number) => index + 1, // Generate index
    },
    {
      title: "Semester",
      key: "academicSemester",
      render: (item) => {
        const semester = `${item?.academicSemester?.name} - ${item?.academicSemester?.year}`;
        return <div className="flex gap-2">{semester}</div>;
      },
    },
    {
      title: "Name",
      dataIndex: ["course", "title"],
      key: "course.title",
    },
    {
      title: "Code",
      dataIndex: ["course", "code"],
      key: "course.code",
    },
    {
      title: "Faculty",
      dataIndex: ["faculty", "fullName"],
      key: "faculty.fullName",
    },
    {
      title: "Section",
      dataIndex: ["offeredCourse", "section"],
      key: "offeredCourse.section",
    },
    {
      title: "Days",
      key: "offeredCourse.days",
      render: (item) => {
        const days = item?.offeredCourse?.days;
        return <div className="flex gap-2">{days.join(",")}</div>;
      },
    },
    {
      title: "Time",
      key: "offeredCourse.time",
      render: (item) => {
        const days = `${item?.offeredCourse?.startTime} - ${item?.offeredCourse?.endTime}`;
        return <div className="flex gap-2">{days}</div>;
      },
    },
    {
      title: "Status",
      key: "isCompleted",
      render: (item) => {
        const status = `${item?.isCompleted ? "Completed" : "Pending"}`;
        return (
          <div
            className={`flex gap-2 font-bold ${
              item?.isCompleted ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {status}
          </div>
        );
      },
      filters: [
        {
          text: "Completed",
          value: true,
        },
        {
          text: "Pending",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isCompleted === value,
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div className="flex gap-2">
            <Button onClick={() => showModal(item)}>Marks</Button>
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
    <div className="overflow-y-hidden">
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
        <div className="">
          <div className="flex items-center justify-around gap-5 w-full">
            <h1 className="font-bold text-xl">Class Text 1:</h1>
            <p className="text-xl"> {rowItem?.courseMarks?.classTest1}</p>
          </div>
          <Divider style={{ borderColor: "#7cb305" }}></Divider>
          <div className="flex items-center justify-around gap-5 w-full">
            <h1 className="font-bold text-xl">MidTerm:</h1>
            <p className="text-xl"> {rowItem?.courseMarks?.midTerm}</p>
          </div>
          <Divider style={{ borderColor: "#7cb305" }}></Divider>
          <div className="flex items-center justify-around gap-5 w-full">
            <h1 className="font-bold text-xl">Class Test 2:</h1>
            <p className="text-xl"> {rowItem?.courseMarks?.classTest2}</p>
          </div>
          <Divider style={{ borderColor: "#7cb305" }}></Divider>
          <div className="flex items-center justify-around gap-5 w-full">
            <h1 className="font-bold text-xl">Final Term:</h1>
            <p className="text-xl"> {rowItem?.courseMarks?.finalTerm}</p>
          </div>
          <Divider style={{ borderColor: "#7cb305" }}></Divider>
          <div className="flex items-center justify-around gap-5 w-full">
            <h1 className="font-bold text-xl">Grade:</h1>
            <p className="text-xl"> {rowItem?.grade}</p>
          </div>
          <Divider style={{ borderColor: "#7cb305" }}></Divider>
          <div className="flex items-center justify-around gap-5 w-full">
            <h1 className="font-bold text-xl">Grade Points:</h1>
            <p className="text-xl"> {rowItem?.gradePoints}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MySchedule;
