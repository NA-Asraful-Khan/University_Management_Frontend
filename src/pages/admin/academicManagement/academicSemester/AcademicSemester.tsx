import { Link, useLocation } from "react-router-dom";
import { useGetAllSemestersQuery } from "../../../../redux/features/academicSemester/academicSemester.api";
import { Button } from "antd";

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
