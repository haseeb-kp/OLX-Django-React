import React from "react";
import { useState } from "react";
import axios from "../../utils/axios";
import { signUpPost } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const body = JSON.stringify({
      username,
      email,
      password,
    });

    e.preventDefault();
    axios
      .post(signUpPost, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data.status)
        if (response.data.status === "ok") {
          navigate("/login");
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: response.data.error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: err.data.error,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      {/* Section: Design Block */}
      <section className="text-center overflow-hidden" >
        
        <div className="container px-2 py-5 px-md-5  text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <h2>Sign Up</h2>
                  <form onSubmit={handleSubmit}>
                    {/* 2 column grid layout with text inputs for the first and last names */}
                    <div className="row">
                      <div className=" mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value);
                            }}
                          />
                          <label className="form-label" htmlFor="form3Example1">
                            User name
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>
                    {/* Checkbox */}
                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        defaultValue=""
                        id="form2Example33"
                        defaultChecked=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example33"
                      >
                        Subscribe to our newsletter
                      </label>
                    </div>
                    {/* Submit button */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>
                    {/* Register buttons */}
                    <div className="text-center">
                      <p>
                        Already have an account?{" "}
                        <h6
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </h6>{" "}
                      </p>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-facebook-f" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-google" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-twitter" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-github" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section: Design Block */}
    </div>
  );
}

export default SignUp;
