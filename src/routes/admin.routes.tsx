import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/userManagement/student/CreateStudent";
import CreateFaculty from "../pages/admin/userManagement/faculty/CreateFaculty";
import CreateAdmin from "../pages/admin/userManagement/admin/CreateAdmin";
import {
  DashboardOutlined,
  MacCommandFilled,
  UserOutlined,
} from "@ant-design/icons";
import CreateAcademicSemester from "../pages/admin/academicManagement/academicSemester/CreateAcademicSemester";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester/AcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/CreateAcademicFaculty";
import AcademicFaculty from "../pages/admin/academicManagement/academicFaculty/AcademicFaculty";
import UpdateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/UpdateAcademicFaculty";
import AcademicDepertment from "../pages/admin/academicManagement/academicDepertment/AcademicDepertment";
import CreateAcademicDepertment from "../pages/admin/academicManagement/academicDepertment/CreateAcademicDepertment";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardOutlined />,
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    path: "",
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
  {
    name: "Academic Management",
    path: "",
    icon: <MacCommandFilled />,
    children: [
      {
        name: "Academic Semester",
        path: "academic-semester",
        children: [
          {
            name: "academic-semester",
            path: "",
            element: <AcademicSemester />,
          },
          {
            name: "Create A. Semester",
            path: "create-academic-semester",
            element: <CreateAcademicSemester />,
          },
          {
            name: "Update A. Semester",
            path: ":id",
            element: <UpdateAcademicFaculty />,
          },
        ],
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        children: [
          {
            name: "academic-faculty",
            path: "",
            element: <AcademicFaculty />,
          },
          {
            name: "Create A. Faculty",
            path: "create-academic-faculty",
            element: <CreateAcademicFaculty />,
          },
        ],
      },
      {
        name: "Academic Depertment",
        path: "academic-depertment",
        children: [
          {
            name: "academic-depertment",
            path: "",
            element: <AcademicDepertment />,
          },
          {
            name: "Create A. Depertment",
            path: "create-academic-depertment",
            element: <CreateAcademicDepertment />,
          },
        ],
      },
    ],
  },
];
