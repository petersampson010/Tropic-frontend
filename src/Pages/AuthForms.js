import React, { useState } from "react";

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
    <div className="auth-forms">
      <form onSubmit={handleLoginSubmit}>
        <h2>log in</h2>
        <input
          type="username"
          name="username"
          placeholder="Username"
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleLoginChange}
        />
        <input type="submit" />
      </form>
      or
      <form onSubmit={handleSignupSubmit}>
        <h2>sign up</h2>
        <input
          type="username"
          name="username"
          placeholder="Username"
          onChange={handleSignupChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password confirmation"
          onChange={handleLoginChange}
        />
        <input type="submit" />
      </form>
      <p>{error}</p>
    </div>
  );
};

export default AuthForms