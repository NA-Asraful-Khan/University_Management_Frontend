import {
  Button,
  Dropdown,
  MenuProps,
  message,
  Pagination,
  PaginationProps,
  Space,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  TAcademicSemester,
  TQueryParam,
  TResponse,
  TSemesterRegistration,
} from "../../../../types";
import { useState } from "react";
import {
  useGetAllRegisteredSemesterByPaginationQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../../redux/features/admin/courseManagement.api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

export type TTableData = Pick<
  TSemesterRegistration,
  "status" | "startDate" | "endDate" | "minCredit" | "maxCredit"
> & {
  key: string; // Add this line if 'key' exists on your data
  academicSemester: Pick<TAcademicSemester, "name" | "year"> & {
    name: string;
    year: string;
  };
};

const items: MenuProps["items"] = [
  {
    key: "UPCOMING",
    label: "UPCOMING",
  },
  {
    key: "ONGOING",
    label: "ONGOING",
  },
  {
    key: "ENDED",
    label: "ENDED",
  },
];
const RegisteredSemester = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { pathname } = useLocation();

  //& Pagination Default State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //& Update Semester Hook
  const [UpdateRegisteredSemester] = useUpdateSemesterRegistrationMutation();

  //& Get Registered Semester Data
  const {
    data: registeredSemesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemesterByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  //& Pagination Data
  const pagination = registeredSemesterData?.pagination;

  //& Table Data
  const tableData: TTableData[] =
    registeredSemesterData?.data?.map(
      ({
        _id,
        status,
        startDate,
        endDate,
        minCredit,
        maxCredit,
        academicSemester,
      }) => {
        return {
          key: _id,
          status,
          startDate: moment(new Date(startDate)).format("LL"),
          endDate: moment(new Date(endDate)).format("LL"),
          minCredit,
          maxCredit,
          academicSemester: academicSemester,
        };
      }
    ) || [];

  //& Table Columns
  const columns: TableColumnsType<TTableData> = [
    {
      title: "#",
      dataIndex: "index",
      render: (_: any, __: TTableData, index: number) => index + 1, // Generate index
    },
    {
      title: "Semester",
      dataIndex: ["academicSemester"], // Access nested field
      render: (academicSemester) => {
        return (
          <div>
            {academicSemester?.name} - {academicSemester?.year}
          </div>
        );
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Min Credit",
      dataIndex: "minCredit",
      key: "minCredit",
    },
    {
      title: "Max Credit",
      dataIndex: "maxCredit",
      key: "maxCredit",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, item) => {
        const handleMenuClick = ({ key }: any) => {
          // Pass the id to the onClick handler
          onClick({ key, id: item?.key });
        };
        return (
          <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <Tag
              color={`${
                status === "UPCOMING"
                  ? "blue"
                  : status === "ONGOING"
                  ? "green"
                  : status === "ENDED" && "red"
              }`}
              className={` font-bold`}
            >
              {status}
            </Tag>
          </Dropdown>
        );
      },
      filters: [
        {
          text: "ONGOING",
          value: "ONGOING",
        },
        {
          text: "UPCOMING",
          value: "UPCOMING",
        },
        {
          text: "ENDED",
          value: "ENDED",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/registered-semester/${item.key}/edit`}>
              <EditOutlined />
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

  //& Status Handler
  const onClick = async ({ key, id }: any) => {
    const data = {
      id: id,
      status: { status: key },
    };
    const res = (await UpdateRegisteredSemester(
      data
    )) as TResponse<TSemesterRegistration>;
    if (!res.error) {
      message.info(`Status Changed To ${key}`);
    } else if (res.error) {
      message.error(res.error.data.message);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> All Semester</h1>
        <Link to={`${pathname}/create-semester-registration`}>
          <Button>Create Semester</Button>
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

export default RegisteredSemester;
