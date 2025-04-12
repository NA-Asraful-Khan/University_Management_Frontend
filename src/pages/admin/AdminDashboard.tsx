import React from "react";
import { Layout, Row, Col, Table, Progress } from "antd";
import {
  Users,
  GraduationCap,
  BookOpen,
  Trophy,
  Building2,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import { useGetAdminDashboardStatsQuery } from "../../redux/features/admin/dashboardStats.api";
import { LoadingOutlined } from "@ant-design/icons";

interface Student {
  id: number;
  name: string;
  course: string;
  attendance: number;
  performance: number;
}

const { Header, Content } = Layout;

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    course: "Computer Science",
    attendance: 92,
    performance: 88,
  },
  {
    id: 2,
    name: "Jane Smith",
    course: "Business Admin",
    attendance: 88,
    performance: 92,
  },
  {
    id: 3,
    name: "Mike Johnson",
    course: "Engineering",
    attendance: 95,
    performance: 85,
  },
  {
    id: 4,
    name: "Sarah Williams",
    course: "Psychology",
    attendance: 90,
    performance: 95,
  },
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Course", dataIndex: "course", key: "course" },
  {
    title: "Attendance",
    dataIndex: "attendance",
    key: "attendance",
    render: (attendance: number) => (
      <Progress
        percent={attendance}
        size="small"
        status={attendance < 85 ? "exception" : "success"}
      />
    ),
  },
  {
    title: "Performance",
    dataIndex: "performance",
    key: "performance",
    render: (performance: number) => (
      <Progress
        percent={performance}
        size="small"
        status={performance < 85 ? "exception" : "success"}
      />
    ),
  },
];

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
          <h1 className="text-xl font-bold ml-2">University Dashboard</h1>
        </div>
      </Header>
      <Content className="bg-gray-50 p-6">
        <div className="container mx-auto">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Total Students"
                value={15420}
                icon={<Users className="text-blue-600" size={24} />}
                trend={5.2}
                color="blue"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Courses Offered"
                value={142}
                icon={<BookOpen className="text-green-600" size={24} />}
                trend={2.1}
                color="green"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Graduation Rate"
                value={92}
                icon={<Trophy className="text-yellow-600" size={24} />}
                trend={3.4}
                color="yellow"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Departments"
                value={28}
                icon={<Building2 className="text-purple-600" size={24} />}
                color="purple"
              />
            </Col>
          </Row>

          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              Student Performance Overview
            </h2>
            <Table
              dataSource={students}
              columns={columns}
              pagination={false}
              className="w-full"
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default AdminDashboard;
