import { Button, Table, TableColumnsType } from "antd";
import { Link, useLocation } from "react-router-dom";
import { TAcademicFaculty } from "../../../../types";
import { useGetAllAcademicFacultyQuery } from "../../../../redux/features/admin/academicManagement.api";

export type TTableData = Pick<TAcademicFaculty, "name">;
const AcademicFaculty = () => {
  const { pathname } = useLocation();

  // Get Faculty Data
  const {
    data: academicFacultyData,
    isLoading,
    isFetching,
  } = useGetAllAcademicFacultyQuery(undefined);
  console.log(academicFacultyData, isFetching, isLoading);

  // Table Data
  const tableData = academicFacultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

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
          <div>
            <Button>Update</Button>
            <Button>Delete</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1> This is AcademicFaculty Component </h1>
      <Link to={`${pathname}/create-academic-faculty`}>
        <Button>Create Faculty</Button>
      </Link>
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
