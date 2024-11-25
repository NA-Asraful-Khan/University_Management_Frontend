import {
  Button,
  Pagination,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { TCourse, TQueryParam } from "../../../../types";
import { useState } from "react";
import { useGetAllCoursesByPaginationQuery } from "../../../../redux/features/admin/courseManagement.api";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";

export type TTableData = Pick<TCourse, "title" | "prefix" | "code" | "credits">;
const Courses = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { pathname } = useLocation();

  //& Pagination Default State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //& Get Registered Semester Data
  const {
    data: courseData,
    isLoading,
    isFetching,
  } = useGetAllCoursesByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  //& Pagination Data
  const pagination = courseData?.pagination;

  //& Table Data
  const tableData: TTableData[] =
    courseData?.data?.map(({ _id, title, prefix, code, credits }) => {
      return {
        key: _id,
        title,
        prefix,
        code,
        credits,
      };
    }) || [];

  //& Table Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: TTableData, index: number) => index + 1, // Generate index
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/courses/${item.key}/edit`}>
              <EditOutlined />
            </Link>
            <Link to={`/admin/courses/${item.key}/assaignedFaculty`}>
              <MoreOutlined />
            </Link>
            <Button>
              <DeleteOutlined />
            </Button>
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
        <h1 className="text-xl"> All Courses</h1>
        <Link to={`${pathname}/create-course`}>
          <Button>Create Course</Button>
        </Link>
      </div>

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
      </div>
    </div>
  );
};

export default Courses;
