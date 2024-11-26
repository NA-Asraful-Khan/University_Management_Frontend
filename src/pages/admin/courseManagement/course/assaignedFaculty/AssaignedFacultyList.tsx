import { Button, Space, Table, TableColumnsType } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetFacultyWCourseQuery } from "../../../../../redux/features/admin/courseManagement.api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TFaculty } from "../../../../../types";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";

export type TTableData = {
  key: string | undefined;
  faculties?: Partial<TFaculty>;
  course?: string | undefined;
};
const AssaignedFacultyList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { courseId } = useParams();

  // Get Assaigned Faculty Data
  const {
    data: facultyWCourseData,
    isLoading,
    isFetching,
  } = useGetFacultyWCourseQuery(courseId);

  //& Table Data
  const tableData: TTableData[] =
    facultyWCourseData?.data?.faculties?.map(({ fullName }) => {
      return {
        key: facultyWCourseData?.data?._id,
        faculties: {
          fullName,
        },
        course: facultyWCourseData?.data?.course,
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
      title: "Full Name",
      dataIndex: ["faculties", "fullName"],
      key: "faculties.fullName",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Button>
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <Button onClick={() => navigate("/admin/courses")}>
          <ArrowLeftOutlined />
        </Button>
        <h1 className="text-xl"> Faculty List</h1>
        <Link to={`${pathname}/create-assaign-faculty`}>
          <Button>Assaign Faculty</Button>
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
      </div>
    </div>
  );
};

export default AssaignedFacultyList;
