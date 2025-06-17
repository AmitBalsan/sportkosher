import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const existingArticle = location.state?.article;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [formArticleData, setFormArticleData] = useState({
    imgUrl: "",
    title: "",
    summary: "",
    text: "",
  });

  // שלב המילוי עם נתונים קיימים
  useEffect(() => {
    apiClient
      .get("https://sportkosher-server.up.railway.app/api/admin/data")
      .then((res) => {
        // אם השרת החזיר תשובה – המשתמש מאומת כאדמין
        console.log("Admin verified:", res.data);
        setIsAdmin(true);
      })
      .catch((err) => {
        console.error("Access denied:", err.response?.data || err.message);
        setIsAdmin(false);
      });
    if (existingArticle) {
      setFormArticleData({
        imgUrl: existingArticle.imgUrl,
        title: existingArticle.title,
        summary: existingArticle.summary,
        text: existingArticle.text,
      });
    }
  }, [existingArticle]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormArticleData({ ...formArticleData, [name]: value });
  }

  async function handleSubmitArticle(event: React.FormEvent) {
    event.preventDefault();
    try {
      await axios.put(
        `https://sportkosher-server.up.railway.app/api/edit-article`,
        {
          ...formArticleData,
          _id: existingArticle._id,
        }
      );
      console.log("Article updated successfully");
      navigate("/articles");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  }
  if (isAdmin == null) {
    return <h1>Loading...</h1>;
  }
  if (isAdmin == true) {
    return (
      <div className="editArticle">
        <h2>עריכת מאמר</h2>
        <form onSubmit={handleSubmitArticle}>
          <input
            type="text"
            name="imgUrl"
            value={formArticleData.imgUrl}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="title"
            value={formArticleData.title}
            onChange={handleInputChange}
          />
          <textarea
            name="summary"
            value={formArticleData.summary}
            onChange={handleInputChange}
            maxLength={340}
          />
          <Editor
            apiKey="ebxnda1q1iqkyyf2dzlzvhynb23cmz8pyk53jaac7vf51k9a"
            value={formArticleData.text}
            init={{
              directionality: "rtl",
              plugins: "lists link image code",
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
              menubar: false,
            }}
            onEditorChange={(newContent: any) =>
              setFormArticleData({ ...formArticleData, text: newContent })
            }
          />
          <button type="submit">עדכן מאמר</button>
        </form>
      </div>
    );
  } else {
    return <h2>Error , you are not allowed for this page.</h2>;
  }
}

export default EditArticle;
