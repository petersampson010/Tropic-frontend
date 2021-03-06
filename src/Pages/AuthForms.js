import React, { useState } from "react";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const AuthForms = ({ login, signUp, error }) => {
  const [loginData, setLoginData] = useState({});
  const [signupData, setSignupData] = useState({});

  const handleLoginChange = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupChange = e => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
    console.log(signupData)
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    login(loginData);
  };

  const handleSignupSubmit = e => {
    e.preventDefault();
    signUp(signupData);
  };
  
  return (
    <div className="auth-background">
      <NavBar/>
      <div className="auth-forms">
        <div className="login">
          <form  onSubmit={handleLoginSubmit}>
            <h2>log in</h2>
            <input className="form"
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleLoginChange}
            />
            <input className="form"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLoginChange}
            />
            <input type="submit" className="form-button"/>
          </form>
        </div>
        <div className="sign-up">
          <form onSubmit={handleSignupSubmit}>
            <h2>sign up</h2>
            <input className="form"
              type="username"
              name="username"
              placeholder="Username"
              onChange={handleSignupChange}
            />
            <input className="form"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleSignupChange}
            />
            <input className="form"
              type="password"
              name="password_confirmation"
              placeholder="Password confirmation"
              onChange={handleSignupChange}
            />
            <input type="submit" className="form-button"/>
          </form>
        </div>
      </div>
        <p className="error">{error}</p>
    </div>
  );
};

export default AuthForms