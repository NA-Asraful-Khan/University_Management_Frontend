import { useParams } from "react-router-dom";

const UpdateRegisteredSemester = () => {
  const { registrationId } = useParams();
  return (
    <div>
      <h1> This is UpdateRegisteredSemester Component - {registrationId} </h1>
    </div>
  );
};

export default UpdateRegisteredSemester;
