import { useParams } from "react-router-dom";
import { TAdmin } from "../../../../types";
import AdminForm from "./AdminForm";
import { useGetSinglelAdminQuery } from "../../../../redux/features/admin/userManagement.api";
import { LoadingOutlined } from "@ant-design/icons";

export type DefaultAdminData = Omit<TAdmin, "dateOfBirth">;
const UpdateAdmin = () => {
  const { adminID } = useParams();

  // Get Single Admin Data
  const {
    data: adminData,
    isFetching,
    isLoading,
  } = useGetSinglelAdminQuery(adminID);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dateOfBirth, ...rest } = (adminData?.data as TAdmin) || {};

  const defaultData: DefaultAdminData = {
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
    <AdminForm
      id={adminID}
      defaultValues={defaultData}
      defaultDate={dateOfBirth}
    />
  );
};

export default UpdateAdmin;
