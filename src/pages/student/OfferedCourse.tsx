import { useState } from "react";
import { useGetMyOfferedCourseQuery } from "../../redux/features/student/studentCourseManagement";
import { TQueryParam } from "../../types";

const OfferedCourse = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data } = useGetMyOfferedCourseQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-id" },
    ...params,
  ]);

  console.log(data);
  return <div>This is OfferedCourse Component</div>;
};

export default OfferedCourse;
