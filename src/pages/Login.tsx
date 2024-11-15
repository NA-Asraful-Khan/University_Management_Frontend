import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/auth.api";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/auth.slice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "2024020001",
      password: "pherowebsite!@",
    },
  });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input
          className="border border-1 border-black"
          type="text"
          id="id"
          {...register("userId")}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          className="border border-1 border-black"
          type="text"
          id="password"
          {...register("password")}
        />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
