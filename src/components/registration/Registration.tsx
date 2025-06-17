import { useContext, useEffect, useState } from "react";
import "./registration.scss";
import axios from "axios";
import {
  AuthContext,
  getUserDataFromToken,
} from "../../contexts/AuthoProvider";
import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../pages/main/MainPage";

function Registration() {
  interface FormData {
    fullName: string;
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
  });
  const { state: userDetails, dispatch: setUserDetails } =
    useContext(AuthContext);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      setUserDetails(getUserDataFromToken(accessToken));
    }
  }, []);
  const navigate = useNavigate();
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmitReg = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password.length < 8) {
      alert("הסיסמא חייבת להיות מורכבת לפחות מ-8 תווים.");
      return;
    }
    try {
      await axios.put(
        `https://sportkosher-server.up.railway.app/api/register-user`,
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      console.log("registered succeed");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  if (userDetails.isLoggedIn == false) {
    return (
      <div className="register">
        <form onSubmit={handleSubmitReg} className="register__regForm">
          <input
            type="text"
            name="fullName"
            placeholder="שם מלא"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="כתובת הדואר האלקטרוני שלך"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="סיסמא"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">הירשם</button>
        </form>
      </div>
    );
  } else if (userDetails.isLoggedIn == true) {
    navigate("/");
  }
}

export default Registration;
