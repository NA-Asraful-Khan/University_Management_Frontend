import { Button, Table, TableColumnsType } from "antd";
import { Link, useLocation } from "react-router-dom";
import { TAdmin } from "../../../../types";
import { useGetAllAdminByPaginationQuery } from "../../../../redux/features/admin/userManagement.api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type TTableData = Pick<TAdmin, "name" | "id">;
const AdminList = () => {
  const { pathname } = useLocation();

  // Get Admin Data
  const {
    data: adminData,
    isLoading,
    isFetching,
  } = useGetAllAdminByPaginationQuery(undefined);
  console.log(isLoading, isFetching, adminData);

  // Table Data
  const tableData: TTableData[] =
    adminData?.data?.map(({ _id, name, id }) => ({
      key: _id,
      name,
      id,
    })) || [];

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
      dataIndex: "name",
      key: "name",
      showSorterTooltip: { target: "full-header" },
      // sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div className="flex gap-2">
            <Button>
              <EditOutlined />
            </Button>
            <Button>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> All Admin</h1>
        <Link to={`${pathname}/create-admin`}>
          <Button>Create Admin</Button>
        </Link>
      </div>

      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AdminList;
