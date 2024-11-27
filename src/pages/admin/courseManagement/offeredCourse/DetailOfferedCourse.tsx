import { useParams } from "react-router-dom";

const DetailOfferedCourse = () => {
  const { offeredCourseId } = useParams();
  return (
    <div>
      <h1> This is DetailOfferedCourse Component {offeredCourseId} </h1>
    </div>
  );
};

export default DetailOfferedCourse;
