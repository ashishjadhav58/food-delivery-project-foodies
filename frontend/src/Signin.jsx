import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { API_URL } from "./apiPath.js";

export default function Signin() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [email, setEmail] = useState(""); // ✅ Updated setemail to setEmail
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setIsLoggedIn] = useState(false);
  const [Tosignup, setsp] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
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
                <img className="ms-5" src="logo.png" alt="Logo" id="logo" style={{ width: "50px",height: "50px"}} />
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
                    style={{width: "100%",
                      height: "50px",
                      borderRadius: "25px"}}
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
                    style={{width: "100%",
                      height: "50px",
                      borderRadius: "25px"}}
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
                    style={{ backgroundColor: "rgb(255, 136, 0)" }}
                    type="submit"
                    className="btn pt-2 pb-2 ps-4 pe-4"
                  >
                    <b>Sign In</b>
                  </button>
                </form>
                {isMobile?<><button
              id="log-submit"
              style={{borderRadius: "25px"}}
              onClick={() => setsp(true)}
              className="bg bg-light border border-light pt-2 pb-2 ps-4 pe-4"><b>Don't Have an Account</b></button></>:""}
              </div>
            </div>
          </div>

          {/* Sign Up Section */}
          {
            !isMobile ? <div id="signin" style={{ backgroundColor: "rgb(255, 136, 0)" }} className="col-sm-4 text-center"><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h1 className="text text-light">Welcome to Sign In</h1>
            <h6 className="text text-light">Don't have an account?</h6>
            <button
              id="log-submit"
              style={{borderRadius: "25px"}}
              onClick={() => setsp(true)}
              className="bg bg-light border border-light pt-2 pb-2 ps-4 pe-4"
            >
              <b>Sign Up</b>
            </button><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          </div>:""
          }
        </div>
      </div>
    </div>
  );
}
