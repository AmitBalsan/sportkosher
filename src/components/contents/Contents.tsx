import "./contents.scss";
import proteinShake from "../../assets/protein-shake.jpg";
import run from "../../assets/run.jpg";
import dumbbells from "../../assets/dumbbells.jpg";
// import { BASE_URL } from "../../pages/main/MainPage";
import { Link } from "react-router-dom";

function Contents() {
  return (
    <>
      <div className="contents">
        <div className="contents__store--protein">
          <img src={proteinShake} alt="Protein Shake" />
          <div className="contents__store--card">
            <h2>תוספי תזונה</h2>
            <p>
              מגוון אבקות חלבון וגיינרים כשרים במחירים מצויינים . לקטלוג{" "}
              {/* המוצרים <a href={`${BASE_URL}/products`}>לחץ כאן</a> */}
              <Link to="/products">לחץ כאן</Link>
            </p>
          </div>
        </div>
        <div className="contents__articles">
          <div className="contents__articles--card">
            <h2>מאמרים , עצות וטיפים</h2>
            <p>
              לקריאת מאמרים בנושא כושר , עצות לאימונים ומגוון תוכניות אימון{" "}
              {/* <br /> <a href={`${BASE_URL}/articles`}>לחץ כאן</a> */}
              <Link to="/articles">לחץ כאן</Link>
            </p>
          </div>
          <img src={run} alt="nike" />
        </div>
        <div className="contents__store--equipment">
          <img src={dumbbells} alt="nike" />
          <div className="contents__store--card">
            <h2>ציוד כושר</h2>
            <p>
              מגוון ציוד כושר לבית, מוטות ,צלחות משקל, מתח ומקבילים <br />{" "}
              במחירים טובים , לביקור בחנות{" "}
              {/* <a href={`${BASE_URL}/products`}>לחץ כאן</a> */}
              <Link to="/products">לחץ כאן</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contents;
