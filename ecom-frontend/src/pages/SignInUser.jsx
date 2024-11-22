import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import { loginSuccess } from "../app/reducers/LoginUserSlice";
import '../publicres/stylelog.css'; 


const SignInUser = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    role: userType,
  };

  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (userType === "user") {
        res = await apiClient.post(`/login`, formData);
        // console.log(res.data);
        toast.success("Login Successfully !");
        setTimeout(() => {
          navigate("/products");
        }, 1000);
        dispatch(loginSuccess(res.data));
      } else {
        res = await apiClient.post(`/login`, formData);
        // console.log(res.data);
        toast.success("Login Successfully !");
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
        dispatch(loginSuccess(res.data));
      }
    } catch (error) {
      if (userType === "user") {
        toast.error("Invalid credentials for user");
      } else {
        toast.error("Invalid credentials for admin");
      }
      // console.log(error.message);
    }
  };

  return (
    <section class="ftco-section">
      <div class="container">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          {userType === "admin" ? "Admin Login" : "User Login"}
        </h2>
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <div class="wrap d-md-flex">
              <div
                class="img"
                style={{
                  backgroundImage: `url('/static/img/bg-1.jpg')`,
                }}
              >
              </div>
              <div class="login-wrap p-4 p-md-5">
                <div class="d-flex">
                  <div class="w-100">
                    <h3 class="mb-4">Log In</h3>
                  </div>
                </div>
                <form class="signin-form" onSubmit={handleSubmit}>

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
                  <button
                    type="submit"
                    className="w-full py-3 mt-6 text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    {userType === "admin" ? "Admin Login" : "User Login"}
                  </button>
                </form>
              </div>
            </div>
          <div className="mt-6 text-center text-gray-600">
            <p>
              Don't have an account?{" "}
              {userType === "admin" ? (
                <Link
                  to={"/admin-signup"}
                  className="text-blue-500 hover:underline"
                >
                  Sign up here
                </Link>
              ) : (
                <Link to={"/"} className="text-blue-500 hover:underline">
                  Sign up here
                </Link>
              )}
            </p>
          </div>
        </div>
      <Toaster />
        </div>
      </div>
    </section>
  );
};

export default SignInUser;
