import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import background from "../assets/image2.png";
import icon1 from "../assets/logoIcon.png";
import icon2 from "../assets/appIcon2.png";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      dispatch(setAuthToken(response.data.token));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        height: "100vh",
        // alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="xs" style={{ marginLeft: "0px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src={icon1} height="150px" />
          <img src={icon2} height="120px" style={{ marginTop: "21px" }} />
        </div>
      </Container>

      <Container
        maxWidth="xs"
        style={{ alignContent: "center", marginLeft: "40%" }}
      >
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h5" gutterBottom>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
