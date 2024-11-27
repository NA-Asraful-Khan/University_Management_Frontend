import { useParams } from "react-router-dom";
import OfferedCourseForm from "./OfferedCourseForm";

const UpdateOfferedCourse = () => {
  const { offeredCourseId } = useParams();
  return (
    <div>
      <OfferedCourseForm />
      <h1>{offeredCourseId}</h1>
    </div>
  );
};

export default UpdateOfferedCourse;
