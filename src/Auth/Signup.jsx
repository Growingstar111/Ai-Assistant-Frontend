import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../components/Navbar";
import { registerUserApi } from "../Endpoints/endpoints";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../common_Functions/common_function";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(4),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Password is not matching"),
    }),
    onSubmit: async (val, { resetForm }) => {
      setLoading(true);
      try {
        const response = await registerUserApi(val);
        resetForm();
        Toast.fire({
          title: "Check your email for OTP.",
          icon: "succeess",
        });
        localStorage.setItem("email", response?.data?.data?.email);
        navigate("/verify/otp");
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Signup failed: " + error.response?.data?.message || "Error");
        setLoading(false);
      }
    },
  });
  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-8 flex items-center justify-center bg-gradient-to-t from-black to-[#020353]">
        <div className="w-80 rounded-xl border-2 border-blue-600 bg-gray-900 p-8 text-gray-100  shadow-2xl shadow-blue-500">
          <p className="text-center text-2xl font-bold">Sign Up</p>
          <div className="mt-6">
            <div className="mt-1 text-sm">
              <label htmlFor="name" className="block text-white mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-md border border-gray-400 bg-gray-900 px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                value={formik?.values?.name}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
              />
              <p className="text-red-600">
                {formik?.touched?.name && formik?.errors?.name}
              </p>
            </div>
            <div className="mt-4 text-sm">
              <label htmlFor="email" className="block text-white mb-1">
                Email
              </label>
              <input
                type="email"
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
              <label htmlFor="password" className="block text-white mb-1">
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
            </div>
            <div className="mt-4 text-sm">
              <label
                htmlFor="confirmPassword"
                className="block text-white mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full rounded-md border border-gray-400 bg-gray-900 px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                value={formik?.values?.confirmPassword}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
              />
              <p className="text-red-600">
                {formik?.touched?.confirmPassword &&
                  formik?.errors?.confirmPassword}
              </p>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-md bg-blue-700 py-3 font-semibold text-gray-900 hover:bg-blue-800 transition"
              onClick={formik?.handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-gray-100 hover:underline hover:text-purple-400"
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
