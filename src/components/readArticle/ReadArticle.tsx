import "./readArticle.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  AuthContext,
  getUserDataFromToken,
} from "../../contexts/AuthoProvider";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function ReadArticle() {
  const [articles, setArticles] = useState<any>([]);
  const { state: userDetails, dispatch: setUserDetails } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(location.state?.article || null);

  useEffect(() => {
    console.log("entered useEffect");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sportkosher-server.up.railway.app/api/articles"
        );
        setArticles(response.data);
        console.log(response.data);
        console.log(articles);
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
          setUserDetails(getUserDataFromToken(accessToken));
        }
        if (!article) {
          setArticle(location.state?.article); // שומר בסטייט אם קיים
        }
      } catch (error) {
        console.log("error with getting data :", error);
      }
    };
    fetchData();
  }, [location.state, article]);

  return (
    <>
      <div className="readArticle">
        <div className="readArticle__articlesCard" key={article._id}>
          <h3>{article.title}</h3>{" "}
          {userDetails.email == "admin@gmail.com" ? (
            <button
              onClick={() => navigate("/edit-article", { state: { article } })}
            >
              ערוך מאמר
            </button>
          ) : null}
          <img src={article.imgUrl} />
          <div
            className="readArticle__content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.text),
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ReadArticle;
