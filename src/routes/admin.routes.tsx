import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/CreateStudent";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateAdmin from "../pages/admin/CreateAdmin";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type TRoute = {
  path: string;
  element: ReactNode;
};
type TLayoutChild = {
  key: string;
  label: ReactNode;
};
type TLayout = {
  key: string;
  label: ReactNode;
  icon: ReactNode;
  children?: TLayoutChild[];
};

const adminPaths = [
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

export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);

export const adminSidebarItems = adminPaths.reduce((acc: TLayout[], item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.path,
      icon: item.icon,
      label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      icon: item.icon,
      children: item.children.map((child) => ({
        key: child.path,
        label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
      })),
    });
  }
  return acc;
}, []);
