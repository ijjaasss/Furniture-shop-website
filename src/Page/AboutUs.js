import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <>
      <Link 
        className='btn btn-dark' 
        to='/' 
        style={{ 
          margin: '1rem', 
          display: 'inline-block', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          textDecoration: 'none', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '8px', 
          fontSize: '1rem'
        }}
      >
        Home
      </Link>
      <Container 
        className="my-5" 
        style={{ 
          backgroundColor: '#fff', 
          borderRadius: '8px', 
          padding: '2rem', 
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)', 
          border: '1px solid #e0e0e0'
        }}
      >
        <Row className="mb-4">
          <Col className="text-center">
            <h1 style={{ 
              fontSize: '2.75rem', 
              fontWeight: 'bold', 
              color: '#ff5722' 
            }}>
              Welcome to Elegance Furnishings
            </h1>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card 
              style={{ 
                border: 'none', 
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
                borderRadius: '8px', 
                backgroundColor: '#f1f8e9' 
              }}
            >
              <Card.Body>
                <Card.Title style={{ 
                  fontSize: '1.85rem', 
                  fontWeight: 'bold', 
                  color: '#388e3c' 
                }}>
                  About Us
                </Card.Title>
                <Card.Text style={{ 
                  fontSize: '1.1rem', 
                  color: '#616161' 
                }}>
                  At <strong style={{ color: '#007bff' }}>Elegance Furnishings</strong>, we believe that your home is more than just a place—it's an expression of who you are. Since our founding in 2024, we have been dedicated to providing our customers with high-quality, stylish, and affordable furniture to transform their living spaces into havens of comfort and elegance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card 
              style={{ 
                border: 'none', 
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
                borderRadius: '8px', 
                backgroundColor: '#e8f5e9' 
              }}
            >
              <Card.Body>
                <Card.Title style={{ 
                  fontSize: '1.85rem', 
                  fontWeight: 'bold', 
                  color: '#4caf50' 
                }}>
                  Our Mission
                </Card.Title>
                <Card.Text style={{ 
                  fontSize: '1.1rem', 
                  color: '#616161' 
                }}>
                  Our mission is to deliver exceptional furniture that combines quality craftsmanship with timeless design. We are committed to offering a wide range of products that cater to various tastes and preferences, ensuring that every piece we offer enhances the beauty and functionality of your home.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card 
              style={{ 
                border: 'none', 
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
                borderRadius: '8px', 
                backgroundColor: '#f3e5f5' 
              }}
            >
              <Card.Body>
                <Card.Title style={{ 
                  fontSize: '1.85rem', 
                  fontWeight: 'bold', 
                  color: '#ab47bc' 
                }}>
                  What Sets Us Apart
                </Card.Title>
                <ul style={{ 
                  fontSize: '1.1rem', 
                  color: '#424242', 
                  lineHeight: '1.8', 
                  paddingLeft: '1.5rem' 
                }}>
                  <li>
                    <strong style={{ color: '#d32f2f' }}>Curated Selection:</strong> Our team of designers and furniture experts handpick each item in our collection to ensure it meets our high standards of quality and style. From modern minimalist pieces to classic traditional designs, our selection is curated to suit every taste.
                  </li>
                  <li>
                    <strong style={{ color: '#d32f2f' }}>Sustainable Practices:</strong> We are passionate about sustainability. Many of our products are crafted from eco-friendly materials, and we partner with manufacturers who prioritize ethical practices. By choosing Elegance Furnishings, you’re not only enhancing your home but also supporting a more sustainable future.
                  </li>
                  <li>
                    <strong style={{ color: '#d32f2f' }}>Exceptional Customer Service:</strong> Our commitment to customer satisfaction is at the heart of everything we do. From helping you choose the perfect piece to ensuring a smooth delivery process, our friendly and knowledgeable team is here to assist you every step of the way.
                  </li>
                  <li>
                    <strong style={{ color: '#d32f2f' }}>Affordable Luxury:</strong> We believe that great furniture should be accessible to everyone. That’s why we offer a range of products at various price points, ensuring that you can find the perfect pieces without compromising on quality or style.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card 
              style={{ 
                border: 'none', 
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
                borderRadius: '8px', 
                backgroundColor: '#e1f5fe' 
              }}
            >
              <Card.Body>
                <Card.Title style={{ 
                  fontSize: '1.85rem', 
                  fontWeight: 'bold', 
                  color: '#039be5' 
                }}>
                  Our Story
                </Card.Title>
                <Card.Text style={{ 
                  fontSize: '1.1rem', 
                  color: '#424242' 
                }}>
                  Founded by <strong style={{ color: '#007bff' }}>ijaz</strong>, Elegance Furnishings started with a vision to bring exquisite furniture into the homes of people who appreciate fine design and craftsmanship. What began as a small venture has grown into a thriving business, thanks to our dedication to quality, style, and customer satisfaction.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card 
              style={{ 
                border: 'none', 
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', 
                borderRadius: '8px', 
                backgroundColor: '#fce4ec' 
              }}
            >
              <Card.Body>
                <Card.Title style={{ 
                  fontSize: '1.85rem', 
                  fontWeight: 'bold', 
                  color: '#d81b60' 
                }}>
                  Contact Us
                </Card.Title>
                <Card.Text style={{ 
                  fontSize: '1.1rem', 
                  color: '#424242' 
                }}>
                  For any inquiries or support, please don’t hesitate to reach out to our customer service team at 
                  <a href="mailto:ijasmuthu04@gmail.com" style={{ color: '#d81b60', textDecoration: 'none', fontWeight: 'bold' }}> ijasmuthu04@gmail.com</a> 
                  or call us at 
                  <a href="tel:9207816578" style={{ color: '#d81b60', textDecoration: 'none', fontWeight: 'bold' }}> +91 9207816578</a>. 
                  We are here to help you with any questions or concerns.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#616161', 
              marginTop: '2rem' 
            }}>
              Thank you for choosing Elegance Furnishings. We look forward to helping you create a space you’ll love for years to come!
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutUs;
