import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const AssaignedFacultyList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> Faculty List</h1>
        <Link to={`${pathname}/create-course`}>
          <Button>Assaign Faculty</Button>
        </Link>
      </div>
    </div>
  );
};

export default AssaignedFacultyList;
