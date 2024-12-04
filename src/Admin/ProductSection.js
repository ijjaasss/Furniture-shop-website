import React, { useContext, useEffect, useState } from 'react';
import AdminNavBar from '../Component/AdminNavBar';
import { ContextOfAll } from '../Context/ContextProvider';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function ProductSection() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(ContextOfAll);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    quntity: '',
    title: '',
    description: '',
    price: '',
    image: ''
  });
  const [editMode, setEditMode] = useState(false);

  const openModal = (product = null) => {
    if (product) {
      setNewProduct({
        id: product._id,
        quntity: product.quntity,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image
      });
      setEditMode(true);
    } else {
      setNewProduct({
        quntity: '',
        title: '',
        description: '',
        price: '',
        image: ''
      });
      setEditMode(false);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNewProduct({
      quntity: '',
      title: '',
      description: '',
      price: '',
      image: ''
    });
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        alert('updated product');
        await axios.put(`/api/v1/editproduct/${newProduct.id}`, newProduct);
        setCart((prevCart) =>
          prevCart.map((p) => (p.id === newProduct.id ? newProduct : p))
        );
      } else {
        alert('addProduct');
        const response = await axios.post('/api/v1/addproduct', newProduct);
        setCart((prevCart) => [...prevCart, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error('Error adding or updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/v1/deleteproduct/${productId}`);
      setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const fetchinggg = () => {
      let username = sessionStorage.getItem('username');
      if (!username) {
        navigate('/login');
      }
    };
    fetchinggg();
  }, [navigate, setCart, cart]);

  return (
    <div>
      <AdminNavBar />

      <button
        type="button"
        onClick={() => openModal()}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          marginBottom: '20px',
          border: 'none',
        }}
      >
        Add New Product
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // Set 2 columns per row
          gap: '20px', // Space between products
          padding: '0 20px',
        }}
      >
        {cart.map((p) => (
          <section
            key={p._id}
            style={{
              padding: '20px',
              backgroundColor: '#9de2ff',
              borderRadius: '.5rem',
              boxSizing: 'border-box',
              minHeight: '350px', // Adjust height to accommodate content
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '800px' }}>
                <div
                  style={{
                    borderRadius: '15px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      padding: '20px',
                      backgroundColor: '#fff',
                      borderRadius: '15px',
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>
                      <img
                        src={p.image}
                        alt="Product"
                        style={{
                          width: '180px',
                          borderRadius: '10px',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: '20px', flexGrow: 1 }}>
                      <h5>{p.title}</h5>
                      <p>{p.description}</p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'start',
                          backgroundColor: '#f8f9fa',
                          padding: '10px',
                          borderRadius: '5px',
                        }}
                      >
                        <div style={{ padding: '5px' }}>
                          <p style={{ fontSize: '14px', color: '#6c757d' }}>
                            Price
                          </p>
                          <p>{p.price}</p>
                        </div>
                        
                        <div style={{ padding: '5px' }}>
                          <p style={{ fontSize: '14px', color: '#6c757d' }}>
                            Quantity
                          </p>
                          <p>{p.quntity}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', marginTop: '10px' }}>
                        <button
                          type="button"
                          onClick={() => openModal(p)}
                          style={{
                            backgroundColor: '#007bff',
                            color: '#fff',
                            borderRadius: '5px',
                            padding: '8px 16px',
                            flexGrow: 1,
                            marginRight: '10px',
                            border: 'none',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p._id)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            borderRadius: '5px',
                            padding: '8px 16px',
                            border: 'none',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: '50%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '30px',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        contentLabel={editMode ? 'Edit Product Modal' : 'Add Product Modal'}
      >
        <h2
          style={{
            fontSize: '24px',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#333',
          }}
        >
          {editMode ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleAddOrUpdateProduct}>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="quntity"
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Quantity
            </label>
            <input
              type="number"
              id="quntity"
              name="quntity"
              value={newProduct.quntity}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '8px',
                fontSize: '16px',
                color: '#555',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="title"
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '8px',
                fontSize: '16px',
                color: '#555',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="description"
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '8px',
                fontSize: '16px',
                color: '#555',
                height: '150px',
                resize: 'none',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="price"
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '8px',
                fontSize: '16px',
                color: '#555',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="image"
              style={{ fontSize: '16px', fontWeight: '600' }}
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '8px',
                fontSize: '16px',
                color: '#555',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                borderRadius: '5px',
                padding: '10px 20px',
                border: 'none',
              }}
            >
              {editMode ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ProductSection;
