import { CustomerServiceFilled, DashboardOutlined } from "@ant-design/icons";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse/OfferedCourse";
import CourseStudentList from "../pages/faculty/OfferedCourse/CourseStudentList";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardOutlined />,
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Course",
    path: "",
    icon: <CustomerServiceFilled />,
    children: [
      {
        name: "Offered Course",
        path: "offered-course",
        children: [
          {
            name: "offered-course",
            path: "",
            element: <OfferedCourse />,
          },
          {
            name: "Student List",
            path: ":offeredCourseId",
            element: <CourseStudentList />,
          },
        ],
      },
    ],
  },
];
