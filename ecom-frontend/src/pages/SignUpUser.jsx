import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../apiClient";
import toast, { Toaster } from "react-hot-toast";
import useForm from "../customeHooks/useForm";
import '../publicres/stylelog.css'; 
  
const SignUpUser = ({ userType }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
  };

  const { formData, handleChange } = useForm(initialValues);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
      address,
      role: "user",
    };

    const adminData = {
      ...formData,
      address,
      role: "admin",
    };

    try {
      let res;
      if (userType === "user") {
        res = await apiClient.post(`/register`, userData);
        console.log(res.data);
        toast.success("You are registered successfully");
      } else {
        res = await apiClient.post(`/register`, adminData);
        console.log(res.data);
      }
    } catch (error) {
      toast.error("cant register");

      console.log(error.message);
    }
  };

  return (
    <section class="ftco-section">
      <div class="container">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          {userType === "admin" ? "Admin Sign Up" : "Sign Up"}
        </h2>
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <div class="wrap d-md-flex">
              <div
                class="img"
                style={{
                  backgroundImage: `url('/static/img/bg-1.jpg')`,
                }}
              ></div>
              <div class="login-wrap p-4 p-md-5">
                <div class="d-flex">
                  <div class="w-100">
                    <h3 class="mb-4">Sign Up</h3>
                  </div>
                </div>
                <form class="signin-form" onSubmit={handleSubmit}>
                  <div class="form-group mb-3">
                    <label class="label" for="name">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="name">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="Email">Email</label>
                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </div>
                  <div id="password-error" class="error-message"></div>
                  <div class="form-group mb-3">
                    <label class="label" for="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label class="label" for="name">Mobile Number</label>
                    <input
                      type="text"
                      class="form-control"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      class="form-control btn btn-primary rounded submit px-3"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <p className="mt-4 text-center text-gray-600">
          Have an account?{" "}
          {userType === "admin" ? (
            <Link to="/admin-login" className="text-blue-500  ">
              Click here
            </Link>
          ) : (
            <Link to="/user-login" className="text-blue-500  ">
              Click here
            </Link>
          )}
        </p>
        <p className="mt-2 text-center text-gray-700">
          {userType === "admin" ? (
            <span>
              Not an admin?{" "}
              <Link to="/" className="text-purple-500 hover:underline">
                User Sign Up
              </Link>
            </span>
          ) : (
            <span>
              Are you an admin?{" "}
              <Link
                to="/admin-signup"
                className="text-purple-500 hover:underline"
              >
                Admin Sign Up
              </Link>
            </span>
          )}
        </p>
              </div>
            </div>
          </div>
        </div>
        <Toaster />

      </div>
    </section>

  );
};

export default SignUpUser;
