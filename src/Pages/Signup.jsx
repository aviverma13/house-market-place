import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { db } from "../firebase.config";

import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import OAuth from "../Components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { name, email, password } = formData;
  // console.log(formData);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  //---------------------------------------------(fireBase registration and store data)---------------------------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      // console.log(updateProfile);

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("Something  went wrong with registration");
    }
  };
  //-----------------------------------------------------------------------------------------------------------------
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="nameInput"
          placeholder="Name"
          id="name"
          value={name}
          onChange={onChange}
        />

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
        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signUpButton">
            <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>

      {/* <OAuth /> */}
      <Link to="/Signin" className="registerLink">
        Sign In Instead
      </Link>
    </div>
  );
}

export default SignUp;
