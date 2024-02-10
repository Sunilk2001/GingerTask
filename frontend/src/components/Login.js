import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Mail is reqired")
        .email("Invalid email address"),
      password: yup
        .string()
        .required("")
        .min(6, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z0-9]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (value) => {
      console.log(value);
      axios
        .post("http://localhost:8000/login", value)
        .then((res) => {
          console.log("res---->123", res);
          if (res) {
            navigate("/home", {
              state: {
                email: res.data[0].email,
              },
            });
          } else {
            console.log("Record not found");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <Link to="/" className="text-decoration-none">
          <span style={{ fontSize: "50px" }}>&#8592;</span>
        </Link>
        <h2>Log-In</h2>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control rounded-0"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control rounded-0"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            <b>Log in</b>
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
