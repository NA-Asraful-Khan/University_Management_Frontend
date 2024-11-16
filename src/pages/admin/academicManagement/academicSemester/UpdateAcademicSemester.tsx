import { useParams } from "react-router-dom";

const UpdateAcademicSemester = () => {
  const { id } = useParams();
  return (
    <div>
      <h1> This is UpdateAcademicSemester Component {id}</h1>
    </div>
  );
};

export default UpdateAcademicSemester;
