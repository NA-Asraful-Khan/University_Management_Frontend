import { Button, Table, TableColumnsType } from "antd";
import { Link, useLocation } from "react-router-dom";
import { TStudent } from "../../../../types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetAllStudentsByPaginationQuery } from "../../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TStudent, "name" | "id">;
const StudentList = () => {
  const { pathname } = useLocation();

  // Get Student Data
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsByPaginationQuery(undefined);
  console.log(isLoading, isFetching, studentData);

  // Table Data
  const tableData: TTableData[] =
    studentData?.data?.map(({ _id, name, id }) => ({
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
        <h1 className="text-xl"> All Student</h1>
        <Link to={`${pathname}/create-student`}>
          <Button>Create Student</Button>
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

export default StudentList;
