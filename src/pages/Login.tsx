import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/auth.api";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/auth.slice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    userId: "A-0001",
    password: "pherowebsite!@",
  };

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
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type={"text"} name={"userId"} label={"Id"} />
        <PHInput type={"text"} name={"password"} label={"Password"} />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
