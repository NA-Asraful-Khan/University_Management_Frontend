import { useState } from "react";
import {
  useEnrollCourseMutation,
  useGetMyOfferedCourseQuery,
} from "../../redux/features/student/studentCourseManagement";
import { TQueryParam } from "../../types";
import { Button, Col, Row } from "antd";

type TCourse = {
  [index: string]: any;
};
const OfferedCourse = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);

  // Get OfferedCourse Data
  const { data: OfferedCourseData } = useGetMyOfferedCourseQuery([
    { name: "limit", value: 20 },
    { name: "page", value: 1 },
    { name: "sort", value: "-id" },
    ...params,
  ]);
  //Enroll Course
  const [enroll] = useEnrollCourseMutation();

  //Modify Object
  const singleObject = OfferedCourseData?.data?.reduce((acc: TCourse, item) => {
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

  //enroll Handler

  const handleEnroll = async (id: string) => {
    const res = await enroll({ offeredCourse: id });

    console.log(res);
  };

  if (modifiedData.length <= 0) {
    return <h2 className="text-3xl">No Available Courses</h2>;
  }
  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item) => {
        return (
          <Col span={24} className="border-2 border-gray-400">
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
              {item.sections.map((section: any) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    className="border-t-2 border-gray-400 p-2"
                  >
                    <Col span={5}>{section.section}</Col>
                    <Col span={5}>
                      {section.days.map((day: string) => (
                        <span>{day}</span>
                      ))}
                    </Col>
                    <Col span={5}>{section.startTime}</Col>
                    <Col span={5}>{section.endTime}</Col>
                    <Button onClick={() => handleEnroll(section?._id)}>
                      Enroll
                    </Button>
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
