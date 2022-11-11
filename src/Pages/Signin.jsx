import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../Components/OAuth";
function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("bad user Credentials");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back</p>
      </header>
      <form onSubmit={Submit}>
        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <img
            src={visibilityIcon}
            alt="showPassword"
            className="showPassword"
            onClick={() => setShowPassword((prevstate) => !prevstate)}
          />
        </div>
        <Link to="/forgotpassword" className="forgotPasswordLink">
          Forgot Password
        </Link>
        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>
      {/* Google Aouth */}
      {/* <OAuth /> */}
      <Link to="/Signup" className="registerLink">
        Sign Up Instead
      </Link>
    </div>
  );
}

export default Signin;
