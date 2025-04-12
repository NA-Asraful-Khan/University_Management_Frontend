import { Layout, Row, Col } from "antd";
import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  BookMarked,
  User,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import { useGetAdminDashboardStatsQuery } from "../../redux/features/admin/dashboardStats.api";
import { LoadingOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

function AdminDashboard() {
  // Get Single Admin Data
  const { data, isLoading, isFetching } = useGetAdminDashboardStatsQuery([]);
  const adminStats = data?.data;

  console.log(adminStats);

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
          <h1 className="text-xl font-bold ml-2">Admin Dashboard</h1>
        </div>
      </Header>
      <Content className="bg-gray-50 p-6">
        <div className="container mx-auto">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Academic Faculty"
                value={parseInt(adminStats?.academicFaculty || "0")}
                icon={<Building2 className="text-blue-600" size={24} />}
                color="blue"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Departments"
                value={parseInt(adminStats?.academicDepartment || "0")}
                icon={<BookMarked className="text-green-600" size={24} />}
                color="green"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Faculty"
                value={parseInt(adminStats?.facultyCount || "0")}
                icon={<User className="text-yellow-600" size={24} />}
                // trend={3.4}
                color="yellow"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Student"
                value={parseInt(adminStats?.studentCount || "0")}
                icon={<Users className="text-purple-600" size={24} />}
                color="purple"
              />
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Total Course"
                value={parseInt(adminStats?.totalCourse || "0")}
                icon={<BookOpen className="text-blue-600" size={24} />}
                color="blue"
              />
            </Col>
          </Row>

          {/* <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Student Performance Overview
            </h2>
            <Table
              dataSource={students}
              columns={columns}
              pagination={false}
              className="w-full"
            />
          </div> */}
        </div>
      </Content>
    </Layout>
  );
}

export default AdminDashboard;
