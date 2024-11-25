import { useParams } from "react-router-dom";
import { useGetSinglelRegisteredSemesterQuery } from "../../../../redux/features/admin/courseManagement.api";
import { LoadingOutlined } from "@ant-design/icons";
import SemesterRegistrationForm from "./SemesterRegistrationForm";
import { TSemesterRegistration } from "../../../../types";

const UpdateRegisteredSemester = () => {
  const { registrationId } = useParams();

  // Get Registered Semester Data
  const {
    data: registeredSemesterData,
    isFetching,
    isLoading,
  } = useGetSinglelRegisteredSemesterQuery(registrationId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { startDate, endDate, ...rest } =
    (registeredSemesterData?.data as TSemesterRegistration) || {};

  const defaultDate = {
    startDate: startDate,
    endDate: endDate,
  };
  const defaultData = {
    ...rest,
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingOutlined className="text-7xl" />
      </div>
    );
  }

  return (
    <SemesterRegistrationForm
      defaultValues={defaultData}
      id={registrationId}
      defaultDate={defaultDate}
    />
  );
};

export default UpdateRegisteredSemester;
