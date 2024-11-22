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
    id: '',
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
        id: product.id,
        quntity: product.quntity,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image
      });
      setEditMode(true);
    } else {
      setNewProduct({
        id: '',
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
      id: '',
      quntity: '',
      title: '',
      description: '',
      price: '',
      image: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5001/products/${newProduct.id}`, newProduct);
        setCart(prevCart => prevCart.map(p => (p.id === newProduct.id ? newProduct : p)));
      } else {
        alert('addProduct');
        const response = await axios.post('http://localhost:5001/products', newProduct);
        setCart(prevCart => [...prevCart, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error('Error adding or updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/products/${productId}`);
      setCart(prevCart => prevCart.filter(p => p.id !== productId));
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
  }, [navigate]);  // Add 'navigate' to the dependency array

  return (
    <div>
      <AdminNavBar />
      <button
        type="button"
        className="btn btn-primary mb-4"
        onClick={() => openModal()}
      >
        Add New Product
      </button>
      {cart.map(p => (
        <section
          key={p.id}
          className="w-100 px-4 py-5"
          style={{ backgroundColor: '#9de2ff', borderRadius: '.5rem .5rem 0 0' }}
        >
          <div className="row d-flex justify-content-center">
            <div className="col col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src={p.image}
                        alt="Product"
                        className="img-fluid"
                        style={{ width: '180px', borderRadius: '10px' }}
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="mb-1">{p.title}</h5>
                      <p className="mb-2 pb-1">{p.description}</p>
                      <div className="d-flex justify-content-start rounded-3 p-2 mb-2 bg-body-tertiary">
                        <div>
                          <p className="small text-muted mb-1">Price</p>
                          <p className="mb-0">{p.price}</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">ID</p>
                          <p className="mb-0">{p.id}</p>
                        </div>
                        <div className="px-3">
                          <p className="small text-muted mb-1">Quantity</p>
                          <p className="mb-0">{p.quntity}</p>
                        </div>
                      </div>
                      <div className="d-flex pt-1">
                        <button
                          type="button"
                          className="btn btn-outline-primary me-1 flex-grow-1"
                          onClick={() => openModal(p)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteProduct(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel={editMode ? "Edit Product Modal" : "Add Product Modal"}
      >
        <h2>{editMode ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleAddOrUpdateProduct}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              className="form-control"
              value={newProduct.id}
              onChange={handleInputChange}
              disabled={editMode} 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quntity" className="form-label">Quantity</label>
            <input
              type="number"
              id="quntity"
              name="quntity"
              className="form-control"
              value={newProduct.quntity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              className="form-control"
              value={newProduct.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">{editMode ? "Update Product" : "Add Product"}</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={closeModal}>Close</button>
        </form>
      </Modal>
    </div>
  );
}

// Custom styles for the modal
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export default ProductSection;
