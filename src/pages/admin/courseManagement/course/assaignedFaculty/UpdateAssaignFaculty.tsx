import { useParams } from "react-router-dom";
import AssaignFacultyForm from "./AssaignFacultyForm";

const UpdateAssaignFaculty = () => {
  const { courseId, assaignFacultyId } = useParams();

  console.log(courseId, assaignFacultyId);
  return <AssaignFacultyForm />;
};

export default UpdateAssaignFaculty;
