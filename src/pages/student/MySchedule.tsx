import { Col, Row } from "antd";
import { useGetAllEnrolledCourseQuery } from "../../redux/features/student/studentCourseManagement";

const MySchedule = () => {
  const { data } = useGetAllEnrolledCourseQuery(undefined);
  console.log(data);
  return (
    <Row gutter={[0, 20]}>
      <Col span={24} className="border-2 border-gray-400">
        <div>
          <Row
            justify="space-between"
            align="middle"
            className="border-t-2 border-gray-400 p-2 text-xl font-bold"
          >
            <Col span={5}>Title</Col>
            <Col span={5}>Offered Course</Col>
            <Col span={5}>Days</Col>
          </Row>
          {data?.data?.map((item: any) => {
            return (
              <Row
                justify="space-between"
                align="middle"
                className="border-t-2 border-gray-400 p-2"
              >
                <Col span={5}>{item.course.title}</Col>
                <Col span={5}>{item.offeredCourse.section}</Col>
                <Col span={5}>
                  {item.offeredCourse.days.map((day: string) => (
                    <span>{day}</span>
                  ))}
                </Col>
              </Row>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};

export default MySchedule;
