import {
  Button,
  Pagination,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { TOfferedCourse, TQueryParam } from "../../../../types";
import { useState } from "react";
import { useGetAllOfferedCourseByPaginationQuery } from "../../../../redux/features/admin/courseManagement.api";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

export type TTableData = Pick<
  TOfferedCourse,
  "maxCapacity" | "section" | "days" | "startTime" | "endTime"
> & {
  academicSemester: string; // Changed to string
  faculty: string; // Changed to string
  course: string; // Changed to string
  academicFaculty: string; // Changed to string
  academicDepartment: string; // Changed to string
};
const OfferedCourseList = () => {
  //Pagination State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { pathname } = useLocation();

  // Get OfferedCourse Data
  const {
    data: offeredCourseData,
    isLoading,
    isFetching,
  } = useGetAllOfferedCourseByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  //pagination Data
  const pagination = offeredCourseData?.pagination;

  // Table Data
  const tableData: TTableData[] =
    offeredCourseData?.data?.map(
      ({
        _id,
        maxCapacity,
        days,
        section,
        endTime,
        startTime,
        academicSemester,
        faculty,
        course,
        academicFaculty,
        academicDepartment,
      }) => {
        return {
          key: _id,
          maxCapacity,
          days,
          section,
          endTime,
          startTime,
          academicSemester: `${academicSemester?.name || ""} - ${
            academicSemester?.year || ""
          }`,
          faculty: faculty?.fullName || "",
          course: course?.title || "",
          academicFaculty: academicFaculty?.name || "",
          academicDepartment: academicDepartment?.name || "",
        };
      }
    ) || [];

  // Table Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: TTableData, index: number) => index + 1, // Generate index
    },
    {
      title: "Academic Semester",
      dataIndex: ["academicSemester"], // Access nested field
      key: "academicSemester",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
      key: "maxCapacity",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/offered-course-list/${item.key}`}>
              <EyeOutlined />
            </Link>
            <Link to={`/admin/offered-course-list/${item.key}/edit`}>
              <EditOutlined />
            </Link>
            {/* <DeleteOutlined onClick={() => handleDeleteStudent(item.id)} /> */}
          </Space>
        );
      },
      width: "1%",
    },
  ];

  //& Pagination Controller
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPageSize(pageSize);
  };

  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl">Offered Course List</h1>
        <Link to={`${pathname}/create-offered-course`}>
          <Button>Create Offered Course</Button>
        </Link>
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
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

        {/* <Modal
          title=""
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="flex flex-col justify-center items-center gap-5">
            <ExclamationCircleOutlined className="text-7xl text-red-300" />
            <p className="text-5xl">Are You Sure?</p>
            <p>You Will Not Be Able To Recover From This.</p>
          </div>
        </Modal> */}
      </div>
    </div>
  );
};

export default OfferedCourseList;
