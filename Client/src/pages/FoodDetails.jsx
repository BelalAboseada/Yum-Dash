import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategory, fetchProductById } from "../services/api";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import Loader from "../components/Loader/Loader";
// import CommonSection from "../components/UI/common-section/CommonSection";
import "../styles/product-details.scss";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

const FoodDetails = (props) => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { item } = props;
  const { id, title, image, price, extraIngredients } = item || {};

  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image,
        price,
        extraIngredients,
        quantity: quantity,
      })
    );
    setAddedToCart(true);
  };
  //  increment and decrease item
  const incrementItem = () => {
    setQuantity(quantity + 1);
  };

  const decreaseItem = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // Fetch Data
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

  // mapping  the category id to its name for display in the UI
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.category_name;
    return acc;
  }, {});

  return (
    <Helmet title="Product-details">
      <section>
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <Row>
              <Col lg="4" md="4" sm="12" xs="12">
                <img src={product.image} width={300} height={300} />
              </Col>
              <Col
                lg="8"
                md="8"
                sm="12"
                xs="12"
                style={{ paddingLeft: "50px" }}
              >
                <h3 className="Title mb-3">{product.title}</h3>
                <p className="Price">
                  <span>Price: {product.price} $</span>
                </p>
                <div className="w-25 increase__decrease-btn">
                  <span className="increase__btn" onClick={incrementItem}>
                    <i className="ri-add-line"></i>
                  </span>
                  <span className="quantity">{quantity}</span>
                  <span className="decrease__btn" onClick={decreaseItem}>
                    <i className="ri-subtract-line"></i>
                  </span>
                </div>
                <p className="Category mb-5">
                  Category: <span>{categoryMap[product.category_id]}</span>
                </p>
                <button
                  className="addTOCART__btn m-2"
                  onClick={addToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? "Added" : "Add to Cart"}
                </button>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
