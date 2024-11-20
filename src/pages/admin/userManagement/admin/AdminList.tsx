import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const AdminList = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <div className="flex justify-between items-center font-bold">
        <h1 className="text-xl"> All Admin</h1>
        <Link to={`${pathname}/create-admin`}>
          <Button>Create Admin</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminList;
