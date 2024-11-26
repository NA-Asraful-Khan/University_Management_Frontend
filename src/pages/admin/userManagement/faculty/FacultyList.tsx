import {
  Button,
  Pagination,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  useChangeUserStatusMutation,
  useDeleteFacultyMutation,
  useGetAllFacultyByPaginationQuery,
} from "../../../../redux/features/admin/userManagement.api";
import { TFaculty, TQueryParam, TUser } from "../../../../types";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

export type TTableData = Pick<
  TFaculty,
  "fullName" | "id" | "email" | "contactNo"
> & {
  user: Pick<TUser, "status"> & {
    status: string | undefined;
  };
};
const FacultyList = () => {
  //Pagination State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { pathname } = useLocation();

  //  Hook
  const [changeStatus] = useChangeUserStatusMutation();
  const [deleteFaculty] = useDeleteFacultyMutation();

  // Get Faculty Data
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllFacultyByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  //pagination Data
  const pagination = facultyData?.pagination;

  // Table Data
  const tableData: TTableData[] =
    facultyData?.data?.map(({ _id, fullName, id, email, contactNo, user }) => {
      return {
        key: _id,
        fullName,
        id,
        email,
        contactNo,
        user: {
          status: user?.status === "in-progress" ? "Active" : "Blocked",
          id: user.id,
        },
      };
    }) || [];

  // Table Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: TTableData, index: number) => index + 1, // Generate index
    },
    {
      title: "ID",
      dataIndex: ["id"], // Access nested field
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Contact",
      dataIndex: "contactNo",
      key: "contactNo",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex: ["user"], // Access nested field

      render: (user) => {
        return (
          <button
            onClick={() => changeStatus(user?.id)}
            className={`${
              user?.status === "Active"
                ? "bg-green-500"
                : user?.status === "Blocked" && "bg-red-500 "
            } text-center rounded-full px-4 py-1 text-white font-bold bg-opacity-75`}
          >
            {user?.status}
          </button>
        );
      },
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/faculty-list/${item.id}`}>
              <EyeOutlined />
            </Link>
            <Link to={`/admin/faculty-list/${item.id}/edit`}>
              <EditOutlined />
            </Link>
            <DeleteOutlined onClick={() => deleteFaculty(item?.id)} />
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
        <h1 className="text-xl"> All Faculty</h1>
        <Link to={`${pathname}/create-faculty`}>
          <Button>Create Faculty</Button>
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
      </div>
    </div>
  );
};

export default FacultyList;
