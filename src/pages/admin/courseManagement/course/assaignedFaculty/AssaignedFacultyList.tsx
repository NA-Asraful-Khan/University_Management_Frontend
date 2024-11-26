import { Button, Space, Table, TableColumnsType } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteFacultyWCourseMutation,
  useGetFacultyWCourseQuery,
} from "../../../../../redux/features/admin/courseManagement.api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TFaculty, TResponse } from "../../../../../types";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";

export type TTableData = {
  key: string | undefined;
  faculties?: Partial<TFaculty>;
  course?: string | undefined;
};
const AssaignedFacultyList = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { courseId } = useParams();

  // Call Delete Course Hook
  const [deleteFaculty] = useDeleteFacultyWCourseMutation();
  // Get Assaigned Faculty Data
  const {
    data: facultyWCourseData,
    isLoading,
    isFetching,
  } = useGetFacultyWCourseQuery(courseId);

  //& Delete Handler
  const deleteHandler = async (data: string) => {
    const toastId = toast.loading("Deleting... ");
    // Refactor Submitted Data
    const submittedData = {
      data: {
        faculties: [data],
      },
      id: courseId,
    };
    try {
      const res = (await deleteFaculty(submittedData)) as TResponse<any>;

      if (!res.error) {
        toast.success(`Faculty Deleted successfully`, {
          id: toastId,
        });
      } else {
        toast.error(res.error.data.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
      });
      console.error(error);
    }
  };

  //& Table Data
  const tableData: TTableData[] =
    facultyWCourseData?.data?.faculties?.map(({ _id, fullName }) => {
      return {
        key: _id,
        faculties: {
          _id,
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
        return (
          <Space>
            <DeleteOutlined
              onClick={() => deleteHandler(item?.faculties?._id)}
            />
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
