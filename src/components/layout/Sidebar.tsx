import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/auth.slice";
const { Sider } = Layout;

type TSidebarType = {
  collapsed: boolean;
};

const userRole = {
  ADMIN: "admin",
  STUDENT: "student",
  FACULTY: "faculty",
};

const Sidebar = ({ collapsed }: TSidebarType) => {
  const user = useAppSelector(selectCurrentUser);
  let sidebarItems;
  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;

    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />

      <div
        className={`text-white text-center text-xl font-bold h-[4rem] flex justify-center items-center `}
      >
        <h1>{!collapsed ? "University Management" : "UM"}</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
