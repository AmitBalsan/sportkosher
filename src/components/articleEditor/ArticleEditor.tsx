import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function ArticleEditor() {
  const [content, setContent] = useState("");

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const handleSubmit = () => {
    console.log("תוכן לשמירה:", content);
    // כאן תוכל לשלוח לשרת או לשמור בכל דרך שתרצה
  };

  return (
    <div>
      <h1>הוסף מאמר</h1>
      <Editor
        apiKey="no-api-key" // ניתן להירשם ב-TinyMCE ולקבל API Key אמיתי
        value={content}
        init={{
          directionality: "rtl",
          plugins: "lists link image code",
          toolbar:
            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
          menubar: false,
          language: "he_IL", // לשפה בעברית תצטרך גם להוריד קובץ שפה מ-TinyMCE
        }}
        onEditorChange={handleEditorChange}
      />
      <button onClick={handleSubmit}>שמור</button>
    </div>
  );
}

export default ArticleEditor;
