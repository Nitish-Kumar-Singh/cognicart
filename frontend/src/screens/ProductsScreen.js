import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, listProducts, saveProduct } from "../actions/productActions";
import { signin } from "../actions/userActions";
import { userSigninReducer } from "../reducers/userReducers";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const productSave = useSelector((state) => state.productSave);
    const productDelete = useSelector((state) => state.productDelete);
    const {
      loading: loadinDelete,
      success: successDelete,
      error: errorDelete,
    } = productDelete;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {};
  }, [successSave,successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setImage(product.image);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

    const deleteHandler = (product) => {
      dispatch(deleteProduct(product._id));
    };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>Create Products</button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h1>Create Product</h1>
              </li>
              <li>
                {loadingSave && <div>LOading....</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="countInStock"> countInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  id="countInStock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>

              <li>
                <button type="submit" class="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalVisible(false)}
                  type="submit"
                  class="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      {!modalVisible && (
      <div className="product-list">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>

            <th>Name</th>

            <th>price</th>
            <th>category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <button className="button" onClick={() => openModal(product)}>Edit</button>
                {'   '}
                <button className="button" onClick={()=>deleteHandler(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
      
    </div>
  );
}
export default ProductsScreen;
