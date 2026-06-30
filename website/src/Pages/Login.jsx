import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        navigate("/");
      }
    }

    checkUser();
  }, [navigate]);

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup Successful");
      navigate("/");
    }
  }

async function login() {
    console.log("Login page loaded");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("LOGIN DATA:", data);
  console.log("LOGIN ERROR:", error);

  if (error) {
    alert(error.message);
  } else {
    alert("Login Successful");

    console.log("Before navigate");

    navigate("/", { replace: true });

    console.log("After navigate");
  }
}


  return (
    <div className="login">

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>
        Login
      </button>

      <button onClick={signUp}>
        Sign Up
      </button>

    </div>
  );
}

export default Login;