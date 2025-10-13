import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../components/Navbar";
import { Toast } from "../common_Functions/common_function";
import { resetPasswordApi } from "../Endpoints/endpoints";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("email");

  const { mutate } = useMutation({
    mutationFn: (data) => resetPasswordApi(data),
    onSuccess: () => {
      Toast.fire({
        icon: "success",
        title: "Password reset successfully",
      });
      navigate("/login");
    },
    onError: (err) => {
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message || "Something went wrong",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      mutate({ email, password: values.password });
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-8 flex items-center justify-center bg-gradient-to-tr from-black via-purple-600 to-purple-400">
        <div className="w-80 rounded-xl bg-gray-900 px-8 py-6 text-gray-100">
          {/* Header */}
          <p className="text-center text-2xl font-bold">Reset Password</p>
          <p className="text-center text-sm text-gray-400 mt-2">
            Enter and confirm your new password to regain access.
          </p>

          {/* New Password */}
          <div className="mt-6 text-sm">
            <label htmlFor="password" className="block text-gray-400 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-purple-400 focus:outline-none"
              placeholder="Enter new password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-red-600 text-xs mt-1">
              {formik.touched.password && formik.errors.password}
            </p>
          </div>

          {/* Confirm Password */}
          <div className="mt-4 text-sm">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-400 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:border-purple-400 focus:outline-none"
              placeholder="Confirm new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-red-600 text-xs mt-1">
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={formik.handleSubmit}
            className="mt-6 w-full rounded-md bg-purple-400 py-3 font-semibold text-gray-900 hover:bg-purple-500 transition"
          >
            Set Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
