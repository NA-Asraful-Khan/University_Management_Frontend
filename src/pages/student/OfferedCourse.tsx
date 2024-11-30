import { useState } from "react";
import { useGetMyOfferedCourseQuery } from "../../redux/features/student/studentCourseManagement";
import { TQueryParam } from "../../types";
import { Button, Col, Row } from "antd";

const OfferedCourse = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: OfferedCourseData } = useGetMyOfferedCourseQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  const singleObject = OfferedCourseData?.data?.reduce((acc, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections?.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item) => {
        return (
          <Col span={24} className="border border-2 border-gray-400">
            <div className="p-2 text-2xl font-bold">
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              <Row
                justify="space-between"
                align="middle"
                className="border-t-2 border-gray-400 p-2 text-xl font-bold"
              >
                <Col span={5}>Section</Col>
                <Col span={5}>days</Col>
                <Col span={5}>Start Time</Col>
                <Col span={5}>End Time</Col>
                <Col>Action</Col>
              </Row>
              {item.sections.map((section) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    className="border-t-2 border-gray-400 p-2"
                  >
                    <Col span={5}>{section.section}</Col>
                    <Col span={5}>
                      {section.days.map((day) => (
                        <span>{day}</span>
                      ))}
                    </Col>
                    <Col span={5}>{section.startTime}</Col>
                    <Col span={5}>{section.endTime}</Col>
                    <Button>Enroll</Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
