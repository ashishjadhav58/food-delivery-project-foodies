import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../assets/style.css";


export default function Signin() {
  const [email, setEmail] = useState(""); // ✅ Updated setemail to setEmail
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setIsLoggedIn] = useState(false);
  const [Tosignup, setsp] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("email", email);
        setIsLoggedIn(true);
        localStorage.setItem("userId", JSON.stringify(response.data.userId));
        localStorage.setItem(
          "userName",
          JSON.stringify(response.data.userName)
        );
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed! Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      {/* ✅ Fixed State Passing in Navigate */}
      {done && <Navigate to="/" replace state={{ isLoggedIn: done }} />}
      {Tosignup && <Navigate to="/Signup" replace={true} />}

      <div className="container-fluid bg bg-grey pd-5">
        <div className="row justify-content-center">
          <div className="col-sm-8 text-center mt-5">
            <div className="row">
              <div className="col-sm-1">
                <img className="ms-5" src="logo.png" alt="Logo" id="logo" />
              </div>
            </div>
            <br />
            <h1 className="mt-5">LOGIN TO YOUR ACCOUNT</h1>
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <form onSubmit={handleLogin}>
                  <hr />
                  <br />
                  <input
                    id="log"
                    type="text"
                    className="bg bg-grey border border-grey form-control"
                    name="email"
                    placeholder="Email" // ✅ Capitalized for consistency
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <br />
                  <input
                    id="log"
                    type="password"
                    className="bg bg-grey border border-grey form-control"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <br />
                  {error && <p className="text-danger">{error}</p>}
                  <br />
                  <button
                    id="signin"
                    type="submit"
                    className="btn pt-2 pb-2 ps-4 pe-4"
                  >
                    <b>Sign In</b>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sign Up Section */}
          <div id="signin" className="col-sm-4 text-center"><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h1 className="text text-light">Welcome to Sign In</h1>
            <h6 className="text text-light">Don't have an account?</h6>
            <button
              id="log-submit"
              onClick={() => setsp(true)}
              className="bg bg-light border border-light pt-2 pb-2 ps-4 pe-4"
            >
              <b>Sign Up</b>
            </button><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </div>
        </div>
      </div>
    </div>
  );
}
