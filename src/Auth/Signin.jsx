import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../components/Navbar";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "../common_Functions/common_function";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../Endpoints/endpoints";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducer";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: async (val) => await loginUserApi(val),
    onSuccess: (res) => {
      
      setLoading(false);
      if (res?.data?.user?.isVerified === false) {
         Toast.fire({
        icon: "warning",
        title: "Please verify Your EMail..",
      });
      localStorage.setItem("email", res?.data?.user?.email)
         return navigate('/verify/otp')
      }
      Toast.fire({
        icon: "success",
        title: "Login Successfull..",
      });

      dispatch(login(res?.data));
      navigate("/");
    },
    onError: (error) => {
      console.log("error---", error.message);
      Toast.fire({
        icon: "error",
        title: error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required().min(4),
    }),
    onSubmit: (val) => {
      setLoading(true);
      mutate(val);
    },
  });
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-black to-[#020353]">
        <div className="w-80 rounded-xl border-2 border-blue-600 bg-gray-900 p-8 text-gray-100  shadow-2xl shadow-blue-500 hover:scale-110 ease-in-out duration-500">
          <p className="text-center text-2xl font-bold">Login</p>
          <div className="mt-6">
            <div className="mt-1 text-sm">
              <label htmlFor="email" className="block text-white mb-1">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-400 bg-gray-900 px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                value={formik?.values?.email}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
              />
              <p className="text-red-600">
                {formik?.touched?.email && formik?.errors?.email}
              </p>
            </div>
            <div className="mt-4 text-sm">
              <label htmlFor="password" className="block text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full rounded-md border border-gray-400 bg-gray-900 px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                value={formik?.values?.password}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
              />
              <p className="text-red-600">
                {formik?.touched?.password && formik?.errors?.password}
              </p>
              <div className="flex justify-end text-xs text-gray-400 mt-2 mb-3">
                <Link
                  to={"/forgot/pass"}
                  className="hover:underline hover:text-purple-400"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-blue-700 py-3 font-semibold text-gray-900 hover:bg-blue-800 transition"
              onClick={formik?.handleSubmit}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-gray-100 hover:underline hover:text-purple-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
