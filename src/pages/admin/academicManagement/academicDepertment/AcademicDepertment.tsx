import { Button, Table, TableColumnsType } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useGetAllAcademicDepertmentByPaginationQuery } from "../../../../redux/features/admin/academicManagement.api";
import { TAcademicDepertment, TAcademicFaculty } from "../../../../types";

export type TTableData = Pick<TAcademicDepertment, "name"> & {
  academicFaculty: Pick<TAcademicFaculty, "name"> & {
    name: string | undefined;
  };
};
const AcademicDepertment = () => {
  const { pathname } = useLocation();

  // Get Faculty Data
  const {
    data: academicDepertmentData,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepertmentByPaginationQuery(undefined);
  console.log(isLoading, isFetching, academicDepertmentData);

  // Table Data
  const tableData: TTableData[] =
    academicDepertmentData?.data?.map(({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: { name: academicFaculty?.name || "" }, // Provide a fallback
    })) || [];

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
      title: "Faculty",
      dataIndex: ["academicFaculty", "name"], // Access nested field
      key: "academicFaculty.name",
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
      <h1> This is AcademicDepertment Component </h1>
      <Link to={`${pathname}/create-academic-depertment`}>
        <Button>Create Semester</Button>
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

export default AcademicDepertment;