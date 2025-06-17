import "./navBar.scss";
import SportKosher from "../../assets/SportKosher.png";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import {
  AuthContext,
  getUserDataFromToken,
} from "../../contexts/AuthoProvider";

function NavBar() {
  const {
    state: userDetails,
    dispatch: setUserDetails,
    logout: logOut,
  } = useContext(AuthContext);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      setUserDetails(getUserDataFromToken(accessToken));
    }
  }, []);

  try {
    if (
      userDetails.isLoggedIn == true &&
      userDetails.email == "admin@gmail.com"
    ) {
      return (
        <div className="navBar">
          <img src={SportKosher} alt="Logo" />
          <Link to="/">
            <h3>דף הבית</h3>
          </Link>
          <Link to="/articles">
            <h3>מאמרים</h3>
          </Link>
          <Link to="/products">
            <h3>חנות</h3>
          </Link>
          <Link to="/admin">
            <h3>ניהול</h3>
          </Link>
          <Link to="/contact">
            <h3>צור קשר</h3>
          </Link>
          <h3 onClick={logOut}>יציאה</h3>
        </div>
      );
    } else if (
      userDetails.isLoggedIn == true &&
      userDetails.email !== "admin@gmail.com"
    ) {
      return (
        <div className="navBar">
          <img src={SportKosher} alt="Logo" />
          <Link to="/">
            <h3>דף הבית</h3>
          </Link>
          <Link to="/articles">
            <h3>מאמרים</h3>
          </Link>
          <Link to="/products">
            <h3>חנות</h3>
          </Link>
          <Link to="/workout">
            <h3>תוכנית האימון</h3>
          </Link>
          <Link to="/contact">
            <h3 className="navBar__contact">צור קשר</h3>
          </Link>
          <h3 onClick={logOut}>יציאה</h3>
        </div>
      );
    } else if (userDetails.isLoggedIn == false) {
      return (
        <div className="navBar">
          <img src={SportKosher} alt="Logo" />
          <Link to="/">
            <h3>דף הבית</h3>
          </Link>
          <Link to="/articles">
            <h3>מאמרים</h3>
          </Link>
          <Link to="/products">
            <h3>חנות</h3>
          </Link>
          <Link to="/contact">
            <h3 className="navBar__contact">צור קשר</h3>
          </Link>
          <Link to="/login">
            <h3>התחברות</h3>
          </Link>
        </div>
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export default NavBar;
