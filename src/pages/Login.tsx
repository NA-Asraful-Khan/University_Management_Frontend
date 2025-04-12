import React from "react";
import { Button, Row, List, Avatar } from "antd";
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
import { GraduationCap, UserCircle, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const CurrentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (CurrentUser) {
      if (CurrentUser?.needsPasswordChange) {
        navigate("/change-password");
      } else {
        navigate(
          `/${
            CurrentUser?.role === "super-admin" ? "admin" : CurrentUser?.role
          }/dashboard`
        );
      }
    }
  }, [CurrentUser, navigate]);

  const defaultValues = {
    userId: "A-0001",
    password: "defaultPass!@",
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
      dispatch(
        setUser({
          user: user,
          token: res?.data?.accessToken,
          needsPasswordChange: res?.data?.needsPasswordChange,
        })
      );

      toast.success("Successfully Log In", { id: toastId, duration: 2000 });

      if (res?.data?.needsPasswordChange === true) {
        navigate("/change-password");
      } else {
        navigate(
          `/${user?.role === "super-admin" ? "admin" : user?.role}/dashboard`
        );
      }
    } catch (err) {
      const error = err as { data: { message: string } };
      toast.error(
        error.data.message ? error.data.message : "Something went wrong",
        { id: toastId, duration: 2000 }
      );
    }
  };

  const credentials = [
    {
      title: "Admin",
      description: "ID: A-0001, Password: adminpass",
    },
    {
      title: "Faculty",
      description: "ID: F-0001, Password: facultypass",
    },
    {
      title: "Student-1",
      description: "ID: 2025020001, Password: studentpass",
    },
    {
      title: "Student-2",
      description: "ID: 2025020003, Password: studentpass",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000" />

      <Row justify="center" align="middle" className="min-h-screen px-4 py-8">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center">
          {/* Left side - Illustration and Welcome Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="max-w-md mx-auto md:mx-0">
              <div className="mb-8 floating-image">
                <img
                  src={`/login_bg.avif`}
                  alt="University Campus"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to University Portal
              </h2>
              <p className="text-gray-600 text-lg">
                Access your academic resources, manage courses, and stay
                connected with your university community.
              </p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full md:w-1/2">
            <div className="glass-effect rounded-2xl shadow-xl p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
                  <GraduationCap className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
                <p className="text-gray-600 mt-2">Access your account</p>
              </div>

              {/* Login Form */}
              <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <div className="space-y-5">
                  <div className="relative">
                    <CustomInput
                      type="text"
                      name="userId"
                      label="User ID"
                      className="w-full"
                      prefix={<UserCircle className="w-5 h-5 text-gray-400" />}
                    />
                  </div>
                  <div className="relative">
                    <CustomInput
                      type="password"
                      name="password"
                      label="Password"
                      className="w-full"
                      prefix={<Lock className="w-5 h-5 text-gray-400" />}
                    />
                  </div>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="w-full h-12 text-lg"
                  >
                    Sign In
                  </Button>
                </div>
              </CustomForm>

              {/* Credentials Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Demo Credentials
                </h3>
                <div className="max-h-48 overflow-y-auto custom-scrollbar">
                  <List
                    itemLayout="horizontal"
                    dataSource={credentials}
                    className="demo-credentials"
                    renderItem={(item, index) => (
                      <List.Item className="px-0 border-b last:border-b-0">
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                              className="bg-blue-100"
                              size="large"
                            />
                          }
                          title={
                            <span className="text-sm font-medium text-gray-800">
                              {item.title}
                            </span>
                          }
                          description={
                            <span className="text-xs text-gray-500">
                              {item.description}
                            </span>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Login;
