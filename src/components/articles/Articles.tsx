import { useEffect } from "react";
import "./articles.scss";
import axios from "axios";
// import { getUserDataFromToken } from "../../contexts/AuthoProvider";
// import { useNavigate } from "react-router-dom";

function Articles() {
  // const [articles, setArticles] = useState<Array<any>>([]);

  // const navigate = useNavigate();

  useEffect(() => {
    console.log("entered useEffect");
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/articles`;
        console.log("axios URL-  is:", url);
        console.log("axios URL-.env is:", import.meta.env.VITE_API_URL);
        const response = await axios.get(url);
        console.log("fetched data successfully");
        console.log("response data:", response.data);

        // setArticles(response.data);
      } catch (error) {
        console.log("error with getting data :", error);
      }
    };
    fetchData();
  }, []);
  // function readTheArticle(article: any) {
  //   navigate("/read-article", { state: { article } });
  // }

  // if (userDetails.isLoggedIn == true) {
  return (
    <>
      {/* <div className="articles">
        {articles?.map((article: any) => (
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
      </div> */}
      <h1>working?</h1>
      <h2>{}</h2>
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
