/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { Button, Row } from "antd";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { verifyToken } from "@/utils/veryfyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm();
  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    console.log("Login data:", data);
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login({ email: data.email, password: data.password }).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in successfully!", { id: toastId });

      window.location.href = "/"; // Redirect to homepage after login
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              />
            )}
          />

          <Button
            htmlType="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800"
          >
            Login
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      {/* Right Side Image */}
      <div
        className="w-1/2 h-full hidden md:block rounded-r-lg"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dh20zdtys/image/upload/v1723790098/aa0dd710d59f69addf9c35baedbd81af_sdm8wz.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
        }}
      ></div>
    </Row>
  );
};

export default Login;
