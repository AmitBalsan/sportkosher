import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import Contents from "../../components/contents/Contents";

function MainPage() {
  return (
    <>
      <NavBar />
      <Header />
      <Contents />
    </>
  );
}
export const BASE_URL = "https://sportkosher.onrender.com";
// process.env.NODE_ENV === "production"
//   ?
//   : "localhost:3000";
export default MainPage;
