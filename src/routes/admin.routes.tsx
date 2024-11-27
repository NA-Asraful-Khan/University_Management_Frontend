import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/userManagement/student/CreateStudent";
import CreateFaculty from "../pages/admin/userManagement/faculty/CreateFaculty";
import CreateAdmin from "../pages/admin/userManagement/admin/CreateAdmin";
import {
  DashboardOutlined,
  MacCommandFilled,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CreateAcademicSemester from "../pages/admin/academicManagement/academicSemester/CreateAcademicSemester";
import AcademicSemester from "../pages/admin/academicManagement/academicSemester/AcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/CreateAcademicFaculty";
import AcademicFaculty from "../pages/admin/academicManagement/academicFaculty/AcademicFaculty";
import AcademicDepertment from "../pages/admin/academicManagement/academicDepertment/AcademicDepertment";
import CreateAcademicDepertment from "../pages/admin/academicManagement/academicDepertment/CreateAcademicDepertment";
import StudentList from "../pages/admin/userManagement/student/StudentList";
import FacultyList from "../pages/admin/userManagement/faculty/FacultyList";
import AdminList from "../pages/admin/userManagement/admin/AdminList";
import StudentDetails from "../pages/admin/userManagement/student/StudentDetails";
import UpdateStudent from "../pages/admin/userManagement/student/UpdateStudent";
import RegisteredSemister from "../pages/admin/courseManagement/semesterRegistration/RegisteredSemester";
import Courses from "../pages/admin/courseManagement/course/Courses";
import CreateCourses from "../pages/admin/courseManagement/course/CreateCourses";
import UpdateRegisteredSemester from "../pages/admin/courseManagement/semesterRegistration/UpdateRegisteredSemester";
import UpdateAcademicSemester from "../pages/admin/academicManagement/academicSemester/UpdateAcademicSemester";
import UpdateAcademicDepertment from "../pages/admin/academicManagement/academicDepertment/UpdateAcademicDepertment";
import UpdateAcademicFaculty from "../pages/admin/academicManagement/academicFaculty/UpdateAcademicFaculty";
import FacultyDetails from "../pages/admin/userManagement/faculty/FacultyDetails";
import UpdateFaculty from "../pages/admin/userManagement/faculty/UpdateFaculty";
import AdminDetails from "../pages/admin/userManagement/admin/AdminDetails";
import UpdateAdmin from "../pages/admin/userManagement/admin/UpdateAdmin";
import CreateSemesterRegistration from "../pages/admin/courseManagement/semesterRegistration/CreateSemesterRegistration";
import UpdateCourse from "../pages/admin/courseManagement/course/UpdateCourse";
import AssaignedFacultyList from "../pages/admin/courseManagement/course/assaignedFaculty/AssaignedFacultyList";
import CreateAssaignFaculty from "../pages/admin/courseManagement/course/assaignedFaculty/CreateAssaignFaculty";
import OfferedCourseList from "../pages/admin/courseManagement/offeredCourse/OfferedCourseList";
import CreateOfferedCourse from "../pages/admin/courseManagement/offeredCourse/CreateOfferedCourse";
import DetailOfferedCourse from "../pages/admin/courseManagement/offeredCourse/DetailOfferedCourse";
import UpdateOfferedCourse from "../pages/admin/courseManagement/offeredCourse/UpdateOfferedCourse";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardOutlined />,
    element: <AdminDashboard />,
  },
  //! Academic Routes
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
            name: "Create A. Semester",
            path: ":semesterId/edit",
            element: <UpdateAcademicSemester />,
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
          {
            name: "Update A. Faculty",
            path: ":academicFacultyId/edit",
            element: <UpdateAcademicFaculty />,
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
          {
            name: "Update A. Depertment",
            path: ":academicDepertmentId/edit",
            element: <UpdateAcademicDepertment />,
          },
        ],
      },
    ],
  },
  //! User Routes
  {
    name: "User Management",
    path: "",
    icon: <UserOutlined />,
    children: [
      {
        name: "Admin List",
        path: "admin-list",
        children: [
          {
            name: "admin-list",
            path: "",
            element: <AdminList />,
          },
          {
            name: "Create Admin",
            path: "create-admin",
            element: <CreateAdmin />,
          },
          {
            name: "Admin Details",
            path: ":adminID",
            element: <AdminDetails />,
          },
          {
            name: "Admin Update",
            path: ":adminID/edit",
            element: <UpdateAdmin />,
          },
        ],
      },
      {
        name: "Faculty List",
        path: "faculty-list",
        children: [
          {
            name: "faculty-list",
            path: "",
            element: <FacultyList />,
          },
          {
            name: "Create Faculty",
            path: "create-faculty",
            element: <CreateFaculty />,
          },
          {
            name: "Faculty Details",
            path: ":facultyID",
            element: <FacultyDetails />,
          },
          {
            name: "Faculty Update",
            path: ":facultyID/edit",
            element: <UpdateFaculty />,
          },
        ],
      },
      {
        name: "Student List",
        path: "student-list",
        children: [
          {
            name: "student-list",
            path: "",
            element: <StudentList />,
          },
          {
            name: "Create Student",
            path: "create-student",
            element: <CreateStudent />,
          },
          {
            name: "Student Details",
            path: ":studentId",
            element: <StudentDetails />,
          },
          {
            name: "Student Update",
            path: ":studentId/edit",
            element: <UpdateStudent />,
          },
        ],
      },
    ],
  },
  //! Course Routes
  {
    name: "Course Management",
    path: "",
    icon: <SettingOutlined />,
    children: [
      {
        name: "Registerd Semester",
        path: "registered-semester",
        children: [
          {
            name: "registered-semester",
            path: "",
            element: <RegisteredSemister />,
          },
          {
            name: "Create Semester Registration",
            path: "create-semester-registration",
            element: <CreateSemesterRegistration />,
          },
          {
            name: "Update Semester Registration",
            path: ":registrationId/edit",
            element: <UpdateRegisteredSemester />,
          },
        ],
      },
      {
        name: "Course",
        path: "courses",
        children: [
          {
            name: "courses",
            path: "",
            element: <Courses />,
          },
          {
            name: "Create Course",
            path: "create-course",
            element: <CreateCourses />,
          },
          {
            name: "Update Course",
            path: ":courseId/edit",
            element: <UpdateCourse />,
          },
          {
            name: "Update Course",
            path: ":courseId/assaignedFaculty",
            element: <AssaignedFacultyList />,
          },
          {
            name: "Create Assaign Faculty",
            path: ":courseId/assaignedFaculty/create-assaign-faculty",
            element: <CreateAssaignFaculty />,
          },
        ],
      },
      {
        name: "Offered Course",
        path: "offered-course-list",
        children: [
          {
            name: "Offered Course",
            path: "",
            element: <OfferedCourseList />,
          },
          {
            name: "Create Offered Course",
            path: "create-offered-course",
            element: <CreateOfferedCourse />,
          },
          {
            name: "Offered Course Details",
            path: ":offeredCourseId",
            element: <DetailOfferedCourse />,
          },
          {
            name: "Offered Course Update",
            path: ":offeredCourseId/edit",
            element: <UpdateOfferedCourse />,
          },
        ],
      },
    ],
  },
];
