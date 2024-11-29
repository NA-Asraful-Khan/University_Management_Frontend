import { Button, Row } from "antd";
import CustomForm from "../components/form/CustomForm";
import CustomInput from "../components/form/CustomInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/features/auth/auth.api";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { TResponse } from "../types";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing Password");
    let finalData = {};
    if (data) {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("New Password is Not Matched with Confirm Password", {
          id: toastId,
          duration: 2000,
        });
      } else {
        finalData = {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        };
        try {
          const res = (await changePassword(finalData)) as TResponse<any>;
          console.log(res);
          if (res.error) {
            return toast.error(res.error?.data?.message, {
              id: toastId,
              duration: 2000,
            });
          }

          if (res.data.success) {
            dispatch(logout());
            navigate("/login");
            toast.success("Password Change Succesfully", {
              id: toastId,
              duration: 2000,
            });
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong", { id: toastId, duration: 2000 });
        }
      }
    }
    console.log(finalData);
  };
  return (
    <Row justify={"center"} align={"middle"} className="h-[100vh]">
      <CustomForm onSubmit={onSubmit}>
        <CustomInput
          type={"text"}
          name={"oldPassword"}
          label={"Old Password"}
        />
        <CustomInput
          type={"text"}
          name={"newPassword"}
          label={"New Password"}
        />
        <CustomInput
          type={"text"}
          name={"confirmPassword"}
          label={"Confirm Password"}
        />
        <Button htmlType="submit">Change Password</Button>
      </CustomForm>
    </Row>
  );
};

export default ChangePassword;
