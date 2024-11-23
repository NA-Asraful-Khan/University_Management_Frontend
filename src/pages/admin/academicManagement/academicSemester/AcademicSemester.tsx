import { Link, useLocation } from "react-router-dom";
import { Button, Table } from "antd";
import { useGetAllSemestersByPaginationQuery } from "../../../../redux/features/admin/academicManagement.api";

import type { TableColumnsType, TableProps } from "antd";
import { TAcademicSemester, TQueryParam } from "../../../../types";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

export type TTableData = Pick<
  TAcademicSemester,
  "name" | "startMonth" | "endMonth" | "year"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { pathname } = useLocation();

  //& Get Semester Data
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersByPaginationQuery(params);

  //& Table Data
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  //& Table Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: TTableData, index: number) => index + 1, // Generate index
    },
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        // {
        //   text: "Submenu",
        //   value: "Submenu",
        //   children: [
        //     {
        //       text: "Fall",
        //       value: "Fall",
        //     },
        //   ],
        // },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Year",
      dataIndex: "year",
      defaultSortOrder: "descend",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
      ],
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Start",
      dataIndex: "startMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      // onFilter: (value, record) =>
      //   record.address.indexOf(value as string) === 0,
    },
    {
      title: "End",
      key: "endMonth",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div className="flex gap-2">
            <Link to={`/admin/academic-semester/${item.key}/edit`}>
              <EditOutlined />
            </Link>
          </div>
        );
      },
    },
  ];

  //& Filter Colum
  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);

    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> Academic Semester </h1>
        <Link to={`${pathname}/create-academic-semester`}>
          <Button>Create Semester</Button>
        </Link>
      </div>
      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicSemester;
