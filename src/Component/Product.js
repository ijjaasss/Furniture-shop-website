import React, { useContext, useEffect, useState } from 'react'
import { ContextOfAll } from '../Context/ContextProvider'
import { useNavigate } from 'react-router-dom'

function Product() {
   
    const {cart ,FindProduct}=useContext(ContextOfAll)
    const [cartNew,setCartNew]=useState(cart)
    
    const navigate=useNavigate()

    const handleViewProduct = (productId) => {
        
        FindProduct(productId)
        .then(() => {
            navigate('/selectproduct'); 
        });
    };
    const [query, setQuery] = useState('');
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    
    const handleSearch = async () => {
        const filteredProducts = await cart.filter(p =>
          p.title.toLowerCase() === query.toLowerCase()
        );
        setCartNew(filteredProducts);
    };

    useEffect(() => {
        if (query === '') {
            setCartNew(cart);
        }
    }, [cart, query])
    
    return (
        <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
                <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={query}
                    onChange={handleInputChange}
                    style={{ width: '80%', borderRadius: '8px', border: '1px solid #ced4da' }}
                />
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={handleSearch}
                    data-mdb-ripple-init
                    style={{ marginLeft: '0.5rem', borderRadius: '8px' }}
                >
                    Search
                </button>
            </div>
        
            <div className="container mt-4">
                <div className="row">
                    {cartNew.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <img 
                                    src={product.image} 
                                    className="card-img-top" 
                                    alt={product.title} 
                                    style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontSize: '1.25rem', color: '#333' }}>{product.title}</h5>
                                    <p className="card-text">
                                        <span className="badge bg-danger" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>${product.price}</span>
                                    </p>
                                    <button 
                                        className="btn btn-dark" 
                                        onClick={() => handleViewProduct(product.id)}
                                        style={{ borderRadius: '9px', padding: '0.5rem 1rem' }}
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product
