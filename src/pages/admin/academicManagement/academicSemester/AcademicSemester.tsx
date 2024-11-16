import { useGetAllSemestersQuery } from "../../../../redux/features/academicSemester/academicSemester.api";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);
  return <div>This is AcademicSemester Component</div>;
};

export default AcademicSemester;
