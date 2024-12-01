import { CustomerServiceFilled, DashboardOutlined } from "@ant-design/icons";
import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";
import MySchedule from "../pages/student/MySchedule";

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
  {
    name: "Schedule",
    path: "schedule",
    icon: <CustomerServiceFilled />,
    element: <MySchedule />,
  },
];
