import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/CreateStudent";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateAdmin from "../pages/admin/CreateAdmin";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "",
    icon: <DashboardOutlined />,
    element: <Navigate to="admin/dashboard" replace />,
  },
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardOutlined />,
    element: <AdminDashboard />,
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
