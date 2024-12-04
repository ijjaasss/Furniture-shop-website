import React, { useContext, useEffect, useState } from 'react';
import { ContextOfAll } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

function Product() {
    const { cart, FindProduct } = useContext(ContextOfAll);
    const [cartNew, setCartNew] = useState(cart);
    const navigate = useNavigate();

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
            p.title.toLowerCase().includes(query.toLowerCase())
        );
        setCartNew(filteredProducts);
    };

    useEffect(() => {
        if (query === '') {
            setCartNew(cart);
        }
    }, [cart, query]);

    // Inline styles
    const styles = {
        container: {
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
        },
        searchContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
        },
        searchBar: {
            width: '60%',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid #ced4da',
            fontSize: '1rem',
            transition: 'border-color 0.3s ease',
            marginRight: '1rem',
        },
        searchBtn: {
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        productGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
        },
        productCard: {
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
        },
        productCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        },
        productImg: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
        },
        productImgHover: {
            transform: 'scale(1.05)',
        },
        productDetails: {
            padding: '1rem',
            textAlign: 'center',
        },
        productTitle: {
            fontSize: '1.25rem',
            color: '#333',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
        },
        productPrice: {
            fontSize: '1.125rem',
            color: '#d9534f',
            marginBottom: '1rem',
        },
        viewBtn: {
            padding: '0.5rem 1rem',
            backgroundColor: '#661500',
            border: 'none',
            color: 'white',
            fontSize: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        viewBtnHover: {
            backgroundColor: '#218838',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.searchContainer}>
                <input
                    type="search"
                    placeholder="Search for products"
                    value={query}
                    onChange={handleInputChange}
                    style={styles.searchBar}
                />
                <button
                    onClick={handleSearch}
                    style={styles.searchBtn}
                >
                    Search
                </button>
            </div>

            <div style={styles.productGrid}>
                {cartNew.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '1.5rem', color: '#999' }}>No products found</p>
                ) : (
                    cartNew.map((product) => (
                        <div
                            key={product._id}
                            style={styles.productCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                style={styles.productImg}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            />
                            <div style={styles.productDetails}>
                                <h5 style={styles.productTitle}>{product.title}</h5>
                                <p style={styles.productPrice}>${product.price}</p>
                                <button
                                    style={styles.viewBtn}
                                    onClick={() => handleViewProduct(product._id)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#621500';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#661500';
                                    }}
                                >
                                    View Product
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Product;
