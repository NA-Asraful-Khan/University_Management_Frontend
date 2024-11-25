import { Button } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetFacultyWCourseQuery } from "../../../../../redux/features/admin/courseManagement.api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TAssaignFaculty, TFaculty } from "../../../../../types";

export type TTableData = {
  faculties: Pick<TFaculty, "name"> & {
    name: string | undefined;
  };
};
const AssaignedFacultyList = () => {
  const { pathname } = useLocation();
  const { courseId } = useParams();

  // Get Assaigned Faculty Data
  const {
    data: facultyWCourseData,
    isLoading,
    isFetching,
  } = useGetFacultyWCourseQuery(courseId);

  console.log(isLoading, isFetching);
  //& Table Data
  const tableData: TTableData[] =
    facultyWCourseData?.data?.faculties?.map(({ _id, faculties }) => {
      return {
        key: _id,
        faculties,
      };
    }) || [];

  console.log(tableData);
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> Faculty List</h1>
        <Link to={`${pathname}/create-assaign-faculty`}>
          <Button>Assaign Faculty</Button>
        </Link>
      </div>

      <div>
        <h1>{courseId}</h1>
      </div>
    </div>
  );
};

export default AssaignedFacultyList;
