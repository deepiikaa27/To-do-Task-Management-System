import React, { useEffect, useState } from "react";
import "./Login.css";
import fb from "../../../Assets/f_logo_RGB-Blue_1024.svg";
import google from "../../../Assets/search.svg";
import { fetchUser } from "../../redux/Slice/slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { displayToast } from "../../../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let { isLoading, data, isError } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const formSubmitHandler = () => {
    const apiParams = { username: email, password: password };
    dispatch(fetchUser(apiParams));
  };
  useEffect(() => {
    if (data) {
      navigate("/todo");
    }
    if (isError) {
      displayToast("error", "invalid credentials");
    }
  }, [data, navigate, isError]);

  return (
    <Grid container justifyContent="center" alignItems="center" className="bd">
      <div className="login-page">
        <Grid item xs={12} sm={8} className="login-detail">
          <Grid container>
            <Grid
              md={6}
              className="side-1"
              sx={{
                display: { xs: "none", md: "block" },
              }}
            ></Grid>
            <Grid xs={12} md={6} className="side-2">
              <div>
                <h2>Welcome Back!</h2>
                <p className="title-p">
                  Start managing your task easily and efficently.
                </p>
                <div className="">
                  <div>
                    <TextField
                      type="email"
                      placeholder="Enter your username"
                      value={email}
                      label="Username"
                      variant="outlined"
                      color="primary"
                      size="small"
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div style={{ margin: "20px 0px" }}>
                    <TextField
                      type="password"
                      placeholder="At least 8 character"
                      value={password}
                      label="Password"
                      variant="outlined"
                      color="primary"
                      size="small"
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={formSubmitHandler}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Login"}
                  </Button>
                </div>
                <div className="seperator">or</div>
                <div className="social-app">
                  <div>
                    <img src={google} alt="google-icon" />
                    Google
                  </div>
                  <div>
                    <img src={fb} alt="fb-icon" />
                    facebook
                  </div>
                </div>
                <p>
                  Don't have an account? <Link>sign up</Link>
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default Login;
