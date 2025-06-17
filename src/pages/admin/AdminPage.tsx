import { useEffect, useState } from "react";
import AddArticle from "../../components/addArticle/AddArticle";
import AddProduct from "../../components/addProduct/AddProduct";
import NavBar from "../../components/navBar/NavBar";
// import {
//   AuthContext,
//   getUserDataFromToken,
// } from "../../contexts/AuthoProvider";
import "./adminPage.scss";
// import { parseJwt } from "../../utils/token";
import apiClient from "../../utils/apiClient";

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

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
  }, []);

  if (isAdmin === null) return <h1>Loading...</h1>;
  if (isAdmin == true) {
    return (
      <>
        <NavBar />
        <div className="addContent">
          <AddProduct />
          <AddArticle />
        </div>
      </>
    );
  } else {
    return (
      <h1 className="notAdmin">Error - You are not allowed for this page</h1>
    );
  }
}

export default AdminPage;
