import React from "react";
import styles from "./login.module.css";




let Login = () => {
  return (
    <div className={styles["login-container"]}>
      <div className={styles["left-side"]}>
        <h1>Login Form</h1>
        <form>
          <div>
            <label htmlFor="username">Username *</label>
            <input type="text" id="username" required />
          </div>
          <div>
            <label htmlFor="password">Password *</label>
            <input type="password" id="password" required />
          </div>
          <div>
            <a href="/forgot-password">Forgot Password</a>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        {/* Add your login form components here */}
      </div>
      <div className={styles["right-side"]}>
        <img src="path_to_your_image" alt="Something" />
      </div>
    </div>
  );
};

export default Login;
