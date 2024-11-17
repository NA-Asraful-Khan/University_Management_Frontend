import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";
import { useGetAllSemestersQuery } from "../../../../redux/features/admin/academicManagement.api";

const AcademicSemester = () => {
  const { pathname } = useLocation();
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>This is AcademicSemester Component </h1>
      <Link to={`${pathname}/create-academic-semester`}>
        <Button>Create Semester</Button>
      </Link>
    </div>
  );
};

export default AcademicSemester;
