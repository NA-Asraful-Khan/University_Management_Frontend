import { Button, Table, TableColumnsType } from "antd";
import { Link, useLocation } from "react-router-dom";
import { TAcademicFaculty } from "../../../../types";
import { useGetAllAcademicFacultyByPaginationQuery } from "../../../../redux/features/admin/academicManagement.api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type TTableData = Pick<TAcademicFaculty, "name">;
const AcademicFaculty = () => {
  const { pathname } = useLocation();

  // Get Faculty Data
  const {
    data: academicFacultyData,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultyByPaginationQuery(undefined);

  // Table Data
  const tableData = academicFacultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  // Table Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: TTableData, index: number) => index + 1, // Generate index
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => a.name.length - b.name.length,
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
        <h1 className="text-xl"> Academic Faculty </h1>
        <Link to={`${pathname}/create-academic-faculty`}>
          <Button>Create Faculty</Button>
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

export default AcademicFaculty;
