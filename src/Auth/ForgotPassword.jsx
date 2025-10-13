import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { sendForgetPasswordOtpApi } from "../Endpoints/endpoints";
import { Toast } from "../common_Functions/common_function";
import { useMutation } from "@tanstack/react-query";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async (values) => await sendForgetPasswordOtpApi(values),
    onSuccess: (res) => {
      console.log(res?.data);
      Toast.fire({
        icon: "success",
        title: "OTP has been sent to your email",
      });

      setLoading(false);
      navigate("/verify/otp", { state: { flow: "forgotPassword" } });
    },
    onError: (error) => {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: error?.response?.data?.message || "Something went wrong",
      });
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      localStorage.setItem("email", values?.email);
      mutate(values);
      if (!loading) {
        resetForm();
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-8 flex items-center justify-center bg-gradient-to-tr from-black via-purple-600 to-purple-400">
        <div className="w-80 rounded-xl bg-gray-900 px-8 py-6 text-gray-100">
          <p className="text-center text-2xl font-bold">Forgot Password</p>
          <p className="text-center text-sm text-gray-400 mt-1">
            Enter your registered email to receive a verification code.
          </p>

          <div className="mt-6 text-sm">
            <label htmlFor="email" className="block text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-purple-400 focus:outline-none"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
            />
            <p className="text-red-600">
              {formik.touched.email && formik.errors.email}
            </p>
          </div>

          <button
            type="button"
            onClick={formik.handleSubmit}
            className="mt-6 w-full rounded-md bg-purple-400 py-3 font-semibold text-gray-900 hover:bg-purple-500 transition"
          >
            {loading ? "Loading...." : "Send Verification Code"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
