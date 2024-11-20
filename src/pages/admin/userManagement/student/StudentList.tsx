import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const StudentList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> All Student</h1>
        <Link to={`${pathname}/create-student`}>
          <Button>Create Student</Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentList;
