import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const OfferedCourseList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl">Offered Course List</h1>
        <Link to={`${pathname}/create-offered-course`}>
          <Button>Create Offered Course</Button>
        </Link>
      </div>
    </div>
  );
};

export default OfferedCourseList;
