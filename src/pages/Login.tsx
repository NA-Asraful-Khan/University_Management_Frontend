import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/auth.api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectCurrentUser,
  setUser,
  TUser,
} from "../redux/features/auth/auth.slice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomForm from "../components/form/CustomForm";
import CustomInput from "../components/form/CustomInput";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const CurrentUser = useAppSelector(selectCurrentUser);

  // Redirect to  DashBoard If Already Login
  useEffect(() => {
    if (CurrentUser) {
      navigate(`/${CurrentUser?.role}/dashboard`);
    }
  }, [CurrentUser, navigate]);

  const defaultValues = {
    userId: "A-0001",
    password: "pherowebsite!@",
  };

  // Login Mutation Hook
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const submitInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(submitInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res?.data?.accessToken }));

      toast.success("Successfully Log In", { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} className="h-[100vh]">
      <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <CustomInput type={"text"} name={"userId"} label={"Id"} />
        <CustomInput type={"text"} name={"password"} label={"Password"} />
        <Button htmlType="submit">Login</Button>
      </CustomForm>
    </Row>
  );
};

export default Login;
