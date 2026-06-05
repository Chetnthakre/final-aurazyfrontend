import React, { useEffect, useState } from "react";
import { fetchProducts, createProduct, updateProduct, deleteProduct, uploadImage } from "../api";

interface Product {
  _id?: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  stock: 'in' | 'out';
  type: string;
  newness: number;
  bestSelling: number;
  description?: string;
  sizes?: string[];
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: "",
    oldPrice: 0,
    newPrice: 0,
    image: "",
    stock: "in",
    type: "",
    newness: 0,
    bestSelling: 0,
    description: "",
    sizes: ["S", "M", "L", "XL"],
  });
  const [uploading, setUploading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || "http://localhost:5000";

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: name === "oldPrice" || name === "newPrice" || name === "newness" || name === "bestSelling" 
        ? parseFloat(value) 
        : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await uploadImage(formData);
      setCurrentProduct((prev) => ({ ...prev, image: res.data.image }));
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && currentProduct._id) {
        await updateProduct(currentProduct._id, currentProduct);
      } else {
        await createProduct(currentProduct);
      }
      setShowModal(false);
      resetForm();
      loadProducts();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      name: "",
      oldPrice: 0,
      newPrice: 0,
      image: "",
      stock: "in",
      type: "",
      newness: 0,
      bestSelling: 0,
      description: "",
      sizes: ["S", "M", "L", "XL"],
    });
    setEditMode(false);
  };

  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>Products</h1>
          <ul className="breadcrumb">
            <li><a href="#">Dashboard</a></li>
            <li><i className="bx bx-chevron-right"></i></li>
            <li><a className="active" href="#">Products</a></li>
          </ul>
        </div>
        <button className="btn-download" onClick={() => { resetForm(); setShowModal(true); }}>
          <i className="bx bx-plus"></i>
          <span className="text">Add New Product</span>
        </button>
      </div>

      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>All Products</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`} alt={product.name} />
                      <p>{product.name}</p>
                    </td>
                    <td>{product.type}</td>
                    <td>₹{product.newPrice}</td>
                    <td>
                      <span className={`status ${product.stock === 'in' ? 'completed' : 'pending'}`}>
                        {product.stock === 'in' ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <i className="bx bx-edit" style={{ cursor: 'pointer', marginRight: '10px', color: 'var(--blue)' }} onClick={() => handleEdit(product)}></i>
                      <i className="bx bx-trash" style={{ cursor: 'pointer', color: 'var(--red)' }} onClick={() => handleDelete(product._id!)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="head">
              <h3>{editMode ? "Edit Product" : "Add Product"}</h3>
              <i className="bx bx-x" onClick={() => setShowModal(false)} style={{ cursor: 'pointer', fontSize: '24px' }}></i>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" name="name" value={currentProduct.name} onChange={handleInputChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Old Price (₹)</label>
                  <input type="number" name="oldPrice" value={currentProduct.oldPrice} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>New Price (₹)</label>
                  <input type="number" name="newPrice" value={currentProduct.newPrice} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category/Type</label>
                  <input type="text" name="type" value={currentProduct.type} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <select name="stock" value={currentProduct.stock} onChange={handleInputChange}>
                    <option value="in">In Stock</option>
                    <option value="out">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="file" onChange={handleImageUpload} accept="image/*" />
                {uploading && <p>Uploading...</p>}
                {currentProduct.image && (
                  <div style={{ marginTop: '10px' }}>
                    <img src={currentProduct.image.startsWith('http') ? currentProduct.image : `${BASE_URL}${currentProduct.image}`} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={currentProduct.description} onChange={handleInputChange} rows={3}></textarea>
              </div>
              <button type="submit" className="btn-download" style={{ width: '100%', marginTop: '20px', border: 'none', cursor: 'pointer' }}>
                {editMode ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3000;
        }
        .modal-content {
          background: var(--light);
          padding: 30px;
          border-radius: 20px;
          width: 500px;
          max-width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          color: var(--dark);
        }
        .modal-content .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid var(--dark-grey);
          background: var(--grey);
          color: var(--dark);
          outline: none;
        }
        .form-row {
          display: flex;
          gap: 15px;
        }
        .form-row .form-group {
          flex: 1;
        }
      `}</style>
    </>
  );
};

export default AdminProducts;
