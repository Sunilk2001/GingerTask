import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [getDetails, setGetDetails] = useState(null);

  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      dob: "",
      contact: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      age: yup
        .number()
        .required("Age is required")
        .typeError("Age must be a number"),
      dob: yup.date().required("Date of birth is required").nullable(),
      contact: yup
        .number()
        .required("Contact is required")
        .typeError("Contact must be a number"),
      email: yup
        .string()
        .required("Mail is reqired")
        .email("Invalid email address"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/[a-zA-Z0-9]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (value) => {
      console.log(value);
      axios
        .put("http://localhost:8000/updateDetails", {
          email: location.state.email,
          newName: value.name,
          newAge: value.age,
          newDob: value.dob,
          newContact: value.contact,
          newPassword: value.password,
        })
        .then((res) => {
          console.log("Update response:", res.data);
          if (res.data === "Success") {
            // Check res.data
            console.log("User details updated successfully");
          } else {
            console.log("Failed to update user details");
          }
        })
        .catch((err) => {
          console.error("Error updating user details:", err);
        });
    },
  });

  const getDetailsAPI = (details) => {
    axios
      .get("http://localhost:8000/details", {
        params: { email: details },
      })
      .then((res) => {
        if (res.data !== "Failed") {
          console.log("get user details", res.data);
          setGetDetails(res.data[0]);
        } else {
          console.log("Record not found");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("location", location, location.state.email);
    getDetailsAPI(location.state.email);
  }, []);

  useEffect(() => {
    if (getDetails) {
      const date = new Date(getDetails.dob || new Date());
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      formik.setFieldValue("name", getDetails.name);
      formik.setFieldValue("age", getDetails.age);
      formik.setFieldValue("dob", formattedDate);
      formik.setFieldValue("contact", getDetails.contact);
      formik.setFieldValue("email", getDetails.email);
      formik.setFieldValue("password", getDetails.password);
    }
  }, [getDetails]);

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Home</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control rounded-0"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="age">
              <b>Age</b>
            </label>
            <input
              type="text"
              placeholder="Enter Age"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control rounded-0"
            />
            {formik.errors.age && formik.touched.age && (
              <div className="text-danger">{formik.errors.age}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dob">
              <b>Dob</b>
            </label>
            <input
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control rounded-0"
            />
            {formik.errors.dob && formik.touched.dob && (
              <div className="text-danger">{formik.errors.dob}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="contact">
              <b>Contact</b>
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              name="contact"
              value={formik.values.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control rounded-0"
            />
            {formik.errors.contact && formik.touched.contact && (
              <div className="text-danger">{formik.errors.contact}</div>
            )}
          </div>
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
            <b>Update</b>
          </button>
        </form>
        {/* <Link to="/login" className="float-end mt-2">
          Update
        </Link> */}
      </div>
    </div>
  );
}
export default Home;
