import { CustomerServiceFilled, DashboardOutlined } from "@ant-design/icons";
import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardOutlined />,
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    icon: <CustomerServiceFilled />,
    element: <OfferedCourse />,
  },
];
