import { useState, useContext, useEffect } from "react";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AuthContext,
  getUserDataFromToken,
} from "../../contexts/AuthoProvider";
// import { BASE_URL } from "../../pages/main/MainPage";

function Login() {
  const { state: userDetails, dispatch: setUserDetails } =
    useContext(AuthContext);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      setUserDetails(getUserDataFromToken(accessToken));
    }
  }, []);
  interface FormLogin {
    email: string;
    password: string;
  }

  const navigate = useNavigate();

  const [formLoginData, setFormLoginData] = useState<FormLogin>({
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormLoginData({ ...formLoginData, [name]: value });
  }
  const handleSubmitLog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("entered login");
    try {
      const response = await axios.post(
        `https://sportkosher-server.up.railway.app/api/login-user`,
        {
          email: formLoginData.email,
          password: formLoginData.password,
        },
        { withCredentials: true }
      );
      const { accessToken, refreshToken } = response.data;
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      console.log("login succeed");
      // setConnected(true);
      setUserDetails(getUserDataFromToken(accessToken));
      console.log(userDetails);
      if (
        userDetails.isLoggedIn == true &&
        userDetails.email == "admin@gmail.com"
      ) {
        navigate("/admin");
      } else if (
        userDetails.isLoggedIn == true &&
        userDetails.email !== "admin@gmail.com"
      ) {
        console.log("connected now move to homePage");
        navigate("/");
      }
    } catch (error) {
      console.log("error login");
      console.error(error);
      // setConnected(false);
      alert("מייל או סיסמא אינם נכונים.");
    }
  };
  if (userDetails.isLoggedIn == false) {
    return (
      <>
        <div className="login">
          <form onSubmit={handleSubmitLog} className="login__logForm">
            <input
              type="email"
              name="email"
              placeholder="כתובת הדואר האלקטרוני שלך"
              value={formLoginData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="סיסמא"
              value={formLoginData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">התחבר</button>
          </form>
        </div>
      </>
    );
  } else if (userDetails.isLoggedIn == true) {
    navigate("/");
    return <div className="connected"></div>;
  }
}

export default Login;
