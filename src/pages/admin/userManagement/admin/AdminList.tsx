import {
  Button,
  Modal,
  Pagination,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { TAdmin, TQueryParam, TUser } from "../../../../types";
import {
  useChangeUserStatusMutation,
  useDeleteAdminMutation,
  useGetAllAdminByPaginationQuery,
} from "../../../../redux/features/admin/userManagement.api";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export type TTableData = Pick<
  TAdmin,
  "fullName" | "id" | "email" | "contactNo"
> & {
  user: Pick<TUser, "status"> & {
    status: string | undefined;
  };
};
const AdminList = () => {
  //Pagination State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletedId, setIsDeletedId] = useState("0");

  const { pathname } = useLocation();

  //  Hook
  const [changeStatus] = useChangeUserStatusMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  //Delete Handler
  const handleDeleteStudent = (id: string) => {
    setIsModalOpen(true);
    setIsDeletedId(id);
  };

  const handleOk = () => {
    deleteAdmin(isDeletedId);
    setIsModalOpen(false);
  };

  // Get Admin Data
  const {
    data: adminData,
    isLoading,
    isFetching,
  } = useGetAllAdminByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  //pagination Data
  const pagination = adminData?.pagination;

  // Table Data
  // Table Data
  const tableData: TTableData[] =
    adminData?.data?.map(({ _id, fullName, id, email, contactNo, user }) => {
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

  //& Table Columns
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
        return (
          <Space>
            <Link to={`/admin/admin-list/${item.id}`}>
              <EyeOutlined />
            </Link>
            <Link to={`/admin/admin-list/${item.id}/edit`}>
              <EditOutlined />
            </Link>
            <DeleteOutlined onClick={() => handleDeleteStudent(item.id)} />
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
        <h1 className="text-xl"> All Admin</h1>
        <Link to={`${pathname}/create-admin`}>
          <Button>Create Admin</Button>
        </Link>
      </div>
      <div className="overflow-x-auto overflow-y-hidden">
        <Table
          loading={isFetching || isLoading}
          columns={columns}
          dataSource={tableData}
          showSorterTooltip={{ target: "sorter-icon" }}
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

      <Modal
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
      </Modal>
    </div>
  );
};

export default AdminList;
