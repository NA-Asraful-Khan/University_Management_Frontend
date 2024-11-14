import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/auth.api";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "2024020001",
      password: "pherowebsite!@",
    },
  });
  const [login, { data: userInfo, error }] = useLoginMutation();
  console.log(userInfo);
  console.log(error);

  const onSubmit = (data) => {
    const submitInfo = {
      id: data.userId,
      password: data.password,
    };

    login(submitInfo);
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
