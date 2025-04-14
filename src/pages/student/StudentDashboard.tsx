import { Layout, Row, Col } from "antd";
import { GraduationCap, BookMarked, User, Trophy } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import { useGetStudentDashboardStatsQuery } from "../../redux/features/admin/dashboardStats.api";
import { LoadingOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

function StudentDashboard() {
  // Get Single Admin Data
  const { data, isLoading, isFetching } = useGetStudentDashboardStatsQuery([]);
  const facultyStats = data?.data;

  console.log(facultyStats);

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 h-full flex items-center">
          <GraduationCap className="text-blue-600" size={32} />
          <h1 className="text-xl font-bold ml-2">Student Dashboard</h1>
        </div>
      </Header>
      <Content className="bg-gray-50 p-6">
        <div className="container mx-auto">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Current Offered Courses"
                value={parseInt(facultyStats?.totalOfferedCourse || "0")}
                icon={<BookMarked className="text-green-600" size={24} />}
                color="green"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Currently Enrolled Courses"
                value={parseInt(facultyStats?.myEnrolledCourses || "0")}
                icon={<User className="text-yellow-600" size={24} />}
                // trend={3.4}
                color="yellow"
              />
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Completed Credits"
                value={parseInt(facultyStats?.totalCompletedCredit || "0")}
                icon={<Trophy className="text-purple-600" size={24} />}
                // trend={3.4}
                color="purple"
              />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default StudentDashboard;
