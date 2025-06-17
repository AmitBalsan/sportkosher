import { useEffect, useState } from "react";
import "./articles.scss";
import axios from "axios";
// import { getUserDataFromToken } from "../../contexts/AuthoProvider";
import { useNavigate } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState<any>([]);
  // const { state: userDetails, dispatch: setUserDetails } =
  //   useContext(AuthContext);

  const navigate = useNavigate();

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
        // const accessToken = window.localStorage.getItem("accessToken");
        // if (accessToken) {
        //   setUserDetails(getUserDataFromToken(accessToken));
        // }
      } catch (error) {
        console.log("error with getting data :", error);
      }
    };
    fetchData();
  }, []);
  function readTheArticle(article: any) {
    navigate("/read-article", { state: { article } });
  }

  console.log("articles array : ", articles);
  // if (userDetails.isLoggedIn == true) {
  return (
    <>
      <div className="articles">
        {articles.map((article: any) => (
          <div
            className="articles__articlesCard"
            key={article._id}
            onClick={() => readTheArticle(article)}
          >
            <div className="articles__articlesCard-summary">
              <h3>{article.title}</h3>
              <h4>{article.summary}</h4>
            </div>
            <img src={article.imgUrl} />
          </div>
        ))}
      </div>
    </>
  );
  // } else if (userDetails.isLoggedIn == false) {
  //   return (
  //     <div className="notConnected">
  //       <h1>
  //         Error - You are not connected , you are not allowed for this page.
  //       </h1>
  //     </div>
  //   );
  // }
}

export default Articles;
