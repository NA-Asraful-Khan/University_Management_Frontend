import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const RegisteredSemester = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> All Semester</h1>
        <Link to={`${pathname}/create-semester-registration`}>
          <Button>Create Semester</Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisteredSemester;
