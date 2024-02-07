import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCategory,
  fetchProductById,
  fetchProducts,
} from "../services/api";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import Loader from "../components/Loader/Loader";
import ProductCard from "../components/UI/product-card/ProductCard"; 
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useDispatch } from "react-redux";
import "../styles/product-details.scss"


const FoodDetails = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  // Fetch Product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  // Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchData();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategory();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategoriesData();
  }, []);

  // mapping the category id to its name for display in the UI
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.category_name;
    return acc;
  }, {});

  // Filter related products based on category
  const relatedProducts = products.filter(
    (item) => item.category_id === product?.category_id
  );

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        extraIngredients: product.extraIngredients,
        quantity: quantity,
      })
    );
    setAddedToCart(true);
  };

  const incrementItem = () => {
    setQuantity(quantity + 1);
  };

  const decreaseItem = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Helmet title="Product-details">
      <section>
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <Row>
              <Col lg="4" md="5" sm="12" xs="12" className="text-center">
                <img src={product.image} alt={product.title} width={300} height={300} />
              </Col>
              <Col lg="8" md="7" sm="12" xs="12" className="content"  style={{ paddingLeft: "50px" }}>
                <h3 className="Title mb-3">{product.title}</h3>
                <p className="Price">
                  <span className="price-num">Price: {product.price} $</span>
                </p>
                <p className="Category mb-1">
                  Category: <span>{categoryMap[product.category_id]}</span>
                </p>
                <div className="m-2 mt-3 d-flex justify-content-center align-items-center increase__decrease-btn">
                  <span className="increase__btn" onClick={incrementItem}>
                    <i className="ri-add-line"></i>
                  </span>
                  <span className="quantity">{quantity}</span>
                  <span className="decrease__btn" onClick={decreaseItem}>
                    <i className="ri-subtract-line"></i>
                  </span>
                </div>
                <button
                  className="addTOCART__btn m-2"
                  onClick={addToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? "Added" : "Add to Cart"}
                </button>
              </Col>

              <Col lg="12" className="mt-5">
                <h6 className="description">Description</h6>
                <div className="description__content">
                  <p>{product.description}</p>
                </div>
              </Col>

              <Col lg="12" className="mb-5 mt-4">
                <h2 className="related__Product-title">You might also like</h2>
              </Col>

              {relatedProducts.slice(0, 4).map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                  <ProductCard item={item} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
