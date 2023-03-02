import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addProductAsync } from "../products/productsSlice";

import { Container } from "@mui/material";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
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

  const sizeHandler = (event) => {
    setSize(event.target.value);
  };

  const quantityHandler = (event) => {
    setInventoryQty(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      addProductAsync({
        name,
        price,
        description,
        size,
        inventoryQty,
      })
    );
    setName("");
    setPrice("");
    setDescription("");
    setInventoryQty("");
    navigate("/products");
  };

  return (
    <Container maxWidth="sm" className="left">
      <h2 align="center">Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="add-prod-form-label">
          Product Name
        </label>
        <input
          name="name"
          value={name}
          onChange={nameHandler}
          className="add-prod-form-input"
        />
        <label htmlFor="name" className="add-prod-form-label">
          Price
        </label>
        <input
          name="price"
          value={price}
          onChange={priceHandler}
          className="add-prod-form-input"
        />
        <label htmlFor="name" className="add-prod-form-label">
          Description
        </label>
        <textarea
          name="description"
          value={description}
          onChange={descriptionHandler}
          className="add-prod-form-input"
        />
        <label htmlFor="name" className="add-prod-form-label">
          Size
        </label>
        <input
          name="size"
          value={size}
          onChange={sizeHandler}
          className="add-prod-form-input"
        />
        <label htmlFor="name" className="add-prod-form-label">
          Inventory Quantity
        </label>
        <input
          name="inventoryQty"
          value={inventoryQty}
          onChange={quantityHandler}
          className="add-prod-form-input"
        />
        <button type="submit" className="editBtn">
          Add Product
        </button>
        <Link to={"/products"}>
          <button type="button" className="editBtn">
            Cancel
          </button>
        </Link>
      </form>
    </Container>
  );
};

//   return (
//     <div>
//       <Grid
//         container
//         alignItems="center"
//         justifyContent="center"
//         direction="column"
//         sx={{
//           mt: 2,
//         }}
//       >
//         <h3 align="center" className="header">
//           Add a new product
//         </h3>
//         <form
//           align="center"
//           justifyContent="center"
//           className="add-form"
//           onSubmit={handleSubmit}
//         >
//           <Grid
//             item
//             sx={{
//               mt: 2,
//             }}
//           >
//             <TextField
//               sx={{ "& input": { textAlign: "center", bgcolor: "white" } }}
//               label="Product Name"
//               value={name}
//               onChange={nameHandler}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid
//             item
//             sx={{
//               mt: 2,
//             }}
//           >
//             <TextField
//               sx={{ "& input": { textAlign: "center", bgcolor: "white" } }}
//               label="Price"
//               value={price}
//               onChange={priceHandler}
//             />
//           </Grid>
//           <Grid
//             item
//             sx={{
//               mt: 2,
//             }}
//           >
//             <TextField
//               sx={{ "& input": { textAlign: "center", bgcolor: "white" } }}
//               inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
//               label="Product Quantity"
//               value={inventoryQty}
//               onChange={quantityHandler}
//             />
//           </Grid>
//           <Grid
//             item
//             sx={{
//               mt: 2,
//             }}
//           >
//             <TextField
//               sx={{ "& input": { textAlign: "center", bgcolor: "white" } }}
//               label="Image URL"
//               value={imageUrl}
//               onChange={imageHandler}
//             />
//           </Grid>
//           <Grid
//             item
//             sx={{
//               mt: 2,
//             }}
//           >
//             <TextField
//               sx={{ "& input": { textAlign: "center", bgcolor: "white" } }}
//               label="Description"
//               value={description}
//               onChange={descriptionHandler}
//             />
//           </Grid>
//           <Grid
//             item
//             sx={{
//               mt: 2,
//             }}
//           >
//             <TextField
//               sx={{ "& input": { textAlign: "center", bgcolor: "white" } }}
//               label="Size"
//               value={size}
//               onChange={sizeHandler}
//             />
//           </Grid>
//           <Grid
//             item
//             sx={{
//               mt: 2,
//             }}
//           >
//             <Button
//               variant="contained"
//               className="submit-button"
//               type="submit"
//               sx={{
//                 bgcolor: "#28536B",
//                 "&:hover": {
//                   bgcolor: "#598588",
//                 },
//               }}
//             >
//               Submit
//             </Button>
//           </Grid>
//         </form>
//       </Grid>
//     </div>
//   );
// };

export default AddProduct;
