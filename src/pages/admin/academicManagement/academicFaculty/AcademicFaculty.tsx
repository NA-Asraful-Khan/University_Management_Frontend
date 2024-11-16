import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const AcademicFaculty = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <h1> This is AcademicFaculty Component </h1>
      <Link to={`${pathname}/create-academic-faculty`}>
        <Button>Create Faculty</Button>
      </Link>
    </div>
  );
};

export default AcademicFaculty;
