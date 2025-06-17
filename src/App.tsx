import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import "./App.css";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import ProductsPage from "./pages/products/ProductsPage";
import ArticlesPage from "./pages/articles/ArticlesPage";
import ContactPage from "./pages/contact/ContactPage";
import AuthProvider from "./contexts/AuthoProvider";
import GetWorkoutPage from "./pages/getWorkout/GetWorkoutPage";
import ReadArticlePage from "./pages/readArticle/ReadArticlePage";
import EditArticlePage from "./pages/articles/EditArticlePage";
import TermsPage from "./pages/terms/TermsPage";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/articles" element={<ArticlesPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/workout" element={<GetWorkoutPage />}></Route>
            <Route path="/read-article" element={<ReadArticlePage />}></Route>
            <Route path="/edit-article" element={<EditArticlePage />}></Route>
            <Route path="/terms" element={<TermsPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
