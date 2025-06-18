import { useContext, useEffect } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import {
  AuthContext,
  getUserDataFromToken,
} from "../../contexts/AuthoProvider";
// import { ConnectedContext } from "../../contexts/ConnectedProvider";

function Header() {
  const { state: userDetails, dispatch: setUserDetails } =
    useContext(AuthContext);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      setUserDetails(getUserDataFromToken(accessToken));
    }
  }, []);
  // function test() {
  //   fetch("https://sportkosher-server.up.railway.app/", { credentials: "include" })
  //     .then((r) => r.text())
  //     .then((t) => alert("הצלחה: " + t))
  //     .catch((e) => alert("שגיאה: " + e));
  // }
  if (userDetails.isLoggedIn == false) {
    return (
      <>
        <div className="header">
          <div className="header__rightSide">
            <h1>
              כל ריצה,
              <br />
              <br /> מתחילה בצעד אחד ..
            </h1>
            <div className="header__rightSide--buttons">
              <button className="header__rightSide--buttons-register">
                <Link to="/register">
                  <h4>להרשמה tuuuuuu</h4>
                </Link>
              </button>
              <button className="header__rightSide--buttons-login">
                <Link to="/login">
                  <h4>להתחברות</h4>
                </Link>
              </button>
              {/* <button onClick={test}>בדוק</button> */}
            </div>
          </div>
        </div>
      </>
    );
  } else if (userDetails.isLoggedIn == true) {
    return (
      <>
        <div className="header">
          <div className="header__rightSide">
            <h1>
              כל ריצה,
              <br />
              <br /> מתחילה בצעד אחד ..
            </h1>
            <h2>ברוכים הבאים !</h2>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
