import { useState } from "react";
import "./addArticle.scss";
import { Editor } from "@tinymce/tinymce-react";

import axios from "axios";

function AddArticle() {
  interface FormAddArticle {
    imgUrl?: string;
    imgFile?: File | null;
    title: string;
    summary: string;
    text: string;
  }

  const [formArticleData, setFormArticleData] = useState<FormAddArticle>({
    imgUrl: "",
    imgFile: null,
    title: "",
    summary: "",
    text: "",
  });

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormArticleData({ ...formArticleData, [name]: value });
  }

  async function handleSubmitArticle(event: React.FormEvent) {
    event.preventDefault();

    console.log("good push");
    try {
      await axios.post(
        "https://sportkosher-server.up.railway.app/api/add-article",
        {
          imgUrl: formArticleData.imgUrl,
          title: formArticleData.title,
          summary: formArticleData.summary,
          text: formArticleData.text,
        }
      );

      console.log("added article succeed");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="addArticle">
        <h2>פרסום מאמר</h2>
        <form onSubmit={handleSubmitArticle}>
          <input
            type="text"
            name="imgUrl"
            placeholder="כתובת תמונה"
            value={formArticleData.imgUrl}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="title"
            placeholder="כותרת"
            value={formArticleData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="summary"
            placeholder="תקציר "
            value={formArticleData.summary}
            onChange={handleInputChange}
            maxLength={340}
            required
          />
          <Editor
            apiKey="ebxnda1q1iqkyyf2dzlzvhynb23cmz8pyk53jaac7vf51k9a"
            value={formArticleData.text}
            init={{
              width: "100%",
              directionality: "rtl",
              plugins: "lists link image code",
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
              menubar: false,
              resize: true,
            }}
            onEditorChange={(newContent: any) =>
              setFormArticleData({ ...formArticleData, text: newContent })
            }
          />

          <button type="submit">לפירסום המאמר</button>
        </form>
      </div>
    </>
  );
}

export default AddArticle;
