import { Layout, Row, Col } from "antd";
import { GraduationCap, BookMarked, User } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import { useGetFacultyDashboardStatsQuery } from "../../redux/features/admin/dashboardStats.api";
import { LoadingOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

function FacultyDashboard() {
  // Get Single Admin Data
  const { data, isLoading, isFetching } = useGetFacultyDashboardStatsQuery([]);
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
          <h1 className="text-xl font-bold ml-2">Faculty Dashboard</h1>
        </div>
      </Header>
      <Content className="bg-gray-50 p-6">
        <div className="container mx-auto">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Current Courses"
                value={parseInt(facultyStats?.totalOfferedCourse || "0")}
                icon={<BookMarked className="text-green-600" size={24} />}
                color="green"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Total Student"
                value={parseInt(facultyStats?.studentCount || "0")}
                icon={<User className="text-yellow-600" size={24} />}
                // trend={3.4}
                color="yellow"
              />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default FacultyDashboard;
