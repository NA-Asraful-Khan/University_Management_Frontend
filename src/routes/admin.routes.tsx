import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/CreateStudent";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateAdmin from "../pages/admin/CreateAdmin";
import {
  DashboardOutlined,
  MacCommandFilled,
  UserOutlined,
} from "@ant-design/icons";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardOutlined />,
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    icon: <MacCommandFilled />,
    children: [
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
    ],
  },
  {
    name: "User Management",
    icon: <UserOutlined />,
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
