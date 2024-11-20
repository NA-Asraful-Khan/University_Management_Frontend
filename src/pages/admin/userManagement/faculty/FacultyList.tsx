import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const FacultyList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> All Faculty</h1>
        <Link to={`${pathname}/create-faculty`}>
          <Button>Create Faculty</Button>
        </Link>
      </div>
    </div>
  );
};

export default FacultyList;
