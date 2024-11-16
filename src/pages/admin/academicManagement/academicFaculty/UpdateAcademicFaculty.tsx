import { useParams } from "react-router-dom";

const UpdateAcademicFaculty = () => {
  const { academicFacultyId: id } = useParams();
  return (
    <div>
      <h1> This is UpdateAcademicFaculty Component {id} </h1>
    </div>
  );
};

export default UpdateAcademicFaculty;
