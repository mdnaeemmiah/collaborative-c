/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button, Row } from "antd";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/utils/veryfyToken";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const [register] = useRegisterMutation();

  const onSubmit = async (data: any) => {
    console.log("Registering user:", data);
    const toastId = toast.loading("Registering...");

    try {
      const res = await register({ name: data.name, email: data.email, password: data.password }).unwrap();

      if (!res?.data?.accessToken) {
        throw new Error("No accessToken received");
      }

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.success("Registration successful!", { id: toastId });
      router.push("/login"); // Redirect to homepage after registration
    } catch (error: any) {
      toast.error(error?.message || "Registration failed", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <div className="w-full max-w-md p-8 space-y-6 border-2 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              />
            )}
          />

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
            rules={{ required: "Password is required", minLength: 6 }}
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
            Register
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
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

export default RegisterForm;
