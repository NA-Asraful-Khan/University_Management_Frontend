import { useState } from "react";
import { useGetFacultyScheduleQuery } from "../../../redux/features/faculty/facultyCourseManagement";
import { TQueryParam } from "../../../types";
import { Pagination, PaginationProps, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";

const OfferedCourse = () => {
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

  //Table Data
  const tableData: any[] =
    facultySchedule?.data?.reduce((acc, { _id, course, offeredCourse }) => {
      // Check if offeredCourse._id is already in the Map
      if (
        !acc.some((item: any) => item.offeredCourse._id === offeredCourse._id)
      ) {
        acc.push({ key: _id, course, offeredCourse });
      }
      return acc;
    }, []) || [];

  // Table Columns
  const columns: TableColumnsType<any> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: any, index: number) => index + 1, // Generate index
    },
    {
      title: "Course",
      dataIndex: ["course", "title"], // Access nested field
      key: "course.title",
    },
    {
      title: "Course",
      dataIndex: ["course", "code"], // Access nested field
      key: "course.code",
    },
    {
      title: "Start",
      dataIndex: ["offeredCourse", "startTime"], // Access nested field
      key: "offeredCourse.startTime",
    },
    {
      title: "End",
      dataIndex: ["offeredCourse", "endTime"], // Access nested field
      key: "offeredCourse.endTime",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <div className="flex gap-2">
            <Link to={`/faculty/offered-course/${item.offeredCourse._id}`}>
              <MoreOutlined />
            </Link>
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
    </div>
  );
};

export default OfferedCourse;
