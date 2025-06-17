import { useEffect, useState } from "react";
import "./products.scss";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState<any>([]);
  // const { state: userDetails, dispatch: setUserDetails } =
  //   useContext(AuthContext);

  useEffect(() => {
    console.log("entered useEffect");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sportkosher-server.up.railway.app/api/products"
        );
        setProducts(response.data);
        console.log(response.data);
        console.log(products);
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

  console.log("products array : ", products);

  // if (userDetails.isLoggedIn == true) {
  return (
    <>
      <div className="products">
        {products.map((product: any) => (
          <div className="products__productsCard" key={product._id}>
            <img src={product.imgUrl} /> <h2>{product.nameProduct}</h2>
            <h3>{product.company}</h3>
            <h5>{product.info}</h5>
            <h6>{product.price}</h6>
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

export default Products;
