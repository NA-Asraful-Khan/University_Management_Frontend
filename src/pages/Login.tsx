import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/auth.api";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/auth.slice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "2024020001",
      password: "pherowebsite!@",
    },
  });
  const [login, { error }] = useLoginMutation();
  console.log(error);
  const onSubmit = async (data: { userId: string; password: string }) => {
    const submitInfo = {
      id: data.userId,
      password: data.password,
    };

    const res = await login(submitInfo).unwrap();
    const user = verifyToken(res?.data?.accessToken);

    dispatch(setUser({ user: user, token: res?.data?.accessToken }));
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
