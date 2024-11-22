import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const Courses = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> All Courses</h1>
        <Link to={`${pathname}/create-course`}>
          <Button>Create Course</Button>
        </Link>
      </div>
    </div>
  );
};

export default Courses;
