import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";


function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect =props.location.search ? props.location.search.split("=")[1]:'/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {};
  }, [userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h1>Create New Account</h1>
          </li>
          <li>
            {loading && <div className="error">LOading....</div>}
            {error && <div className="error">Invalid Credentials</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
            required
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password"> Password</label>
            <input
              required
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="rePassword">RE-Enter Password</label>
            <input
              required
              type="rePassword"
              name="rePassword"
              id="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" class="button primary">
              Register
            </button>
          </li>
          <li>
            Already have an Account?
            <Link to={redirect==='/' ? 'signin':'signin?redirect=' +redirect } className="button text-center secondary">Sign In</Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
