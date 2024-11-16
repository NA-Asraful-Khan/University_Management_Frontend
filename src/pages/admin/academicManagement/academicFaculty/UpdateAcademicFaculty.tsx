import { useParams } from "react-router-dom";

const UpdateAcademicFaculty = () => {
  const { academicFacultyId } = useParams();
  return (
    <div>
      <h1> This is UpdateAcademicFaculty Component {academicFacultyId} </h1>
    </div>
  );
};

export default UpdateAcademicFaculty;
