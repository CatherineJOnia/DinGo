import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  selectSingleProduct,
  editSingleProduct,
} from "../products/singleProductSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryQty, setInventoryQty] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const quantityHandler = (event) => {
    setInventoryQty(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      editSingleProduct({
        productId,
        name,
        price,
        description,
        inventoryQty,
      })
    );
    setName("");
    setPrice("");
    setDescription("");
    setInventoryQty("");
  };

  return (
    <div className="singleView">
      <div className="right">
        <img
          src={product.imageUrl}
          className="featuredProduct"
          alt={product.name}
        />
      </div>
      <div className="left">
        <h2 align="center">Edit Product {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="editFormLabel">
            Product Name
          </label>
          <input
            name="name"
            value={name}
            onChange={nameHandler}
            className="editFormInput"
          />
          <label htmlFor="name" className="editFormLabel">
            Price
          </label>
          <input
            name="price"
            value={price}
            onChange={priceHandler}
            className="editFormInput"
          />
          <label htmlFor="name" className="editFormLabel">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={descriptionHandler}
            className="editFormInput"
          />
          <label htmlFor="name" className="editFormLabel">
            Inventory Quantity
          </label>
          <input
            name="inventoryQty"
            value={inventoryQty}
            onChange={quantityHandler}
            className="editFormInput"
          />
          <button type="submit" className="editBtn">
            Save Edits
          </button>
          <Link to={`/products/${product.id}`}>
            <button type="button" className="editBtn">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
