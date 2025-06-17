import { useState } from "react";

import "./addProduct.scss";

import axios from "axios";

function AddProduct() {
  interface FormAddProduct {
    imgUrl: string;
    nameProduct: string;
    company: string;
    summary: string;
    info: string;
    price: string;
    inventory: string;
  }

  const [formProductData, setFormProductData] = useState<FormAddProduct>({
    imgUrl: "",
    nameProduct: "",
    company: "",
    summary: "",
    info: "",
    price: "",
    inventory: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormProductData({ ...formProductData, [name]: value });
  }

  async function handleSubmitProduct(event: React.FormEvent) {
    event.preventDefault();
    console.log("good push");
    console.log(formProductData);

    try {
      await axios.post(
        "https://sportkosher-server.up.railway.app/api/add-product",
        {
          imgUrl: formProductData.imgUrl,
          nameProduct: formProductData.nameProduct,
          company: formProductData.company,
          summary: formProductData.summary,
          info: formProductData.info,
          price: formProductData.price,
          inventory: formProductData.inventory,
        }
      );
      console.log("added product succeed");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="addProduct">
        <h2>פרסום מוצר</h2>
        <form onSubmit={handleSubmitProduct}>
          <input
            type="text"
            name="imgUrl"
            placeholder="כתובת תמונה"
            value={formProductData.imgUrl}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="nameProduct"
            placeholder="שם המוצר"
            value={formProductData.nameProduct}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="חברה של המוצר"
            value={formProductData.company}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="summary"
            placeholder="תיאור מקוצר"
            value={formProductData.summary}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="info"
            placeholder="מידע על המוצר"
            value={formProductData.info}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="מחיר"
            value={formProductData.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="inventory"
            placeholder="מלאי"
            value={formProductData.inventory}
            onChange={handleInputChange}
            required
          />
          <button type="submit">לפירסום המוצר</button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
