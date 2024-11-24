import {
  Button,
  Pagination,
  PaginationProps,
  Table,
  TableColumnsType,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { useGetAllAcademicDepertmentByPaginationQuery } from "../../../../redux/features/admin/academicManagement.api";
import {
  TAcademicDepertment,
  TAcademicFaculty,
  TQueryParam,
} from "../../../../types";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

export type TTableData = Pick<TAcademicDepertment, "name"> & {
  academicFaculty: Pick<TAcademicFaculty, "name"> & {
    name: string | undefined;
  };
};
const AcademicDepertment = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { pathname } = useLocation();

  // Get Adacemic DepertmentData Data
  const {
    data: academicDepertmentData,
    isLoading,
    isFetching,
  } = useGetAllAcademicDepertmentByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  //pagination Data
  const pagination = academicDepertmentData?.pagination;

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
      render: (item) => {
        return (
          <div className="flex gap-2">
            <Link to={`/admin/academic-depertment/${item.key}/edit`}>
              <EditOutlined />
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
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> Academic Depertment </h1>
        <Link to={`${pathname}/create-academic-depertment`}>
          <Button>Create Semester</Button>
        </Link>
      </div>
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

export default AcademicDepertment;
