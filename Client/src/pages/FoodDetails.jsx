import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import Loader from "../components/Loader/Loader";

const FoodDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Helmet title="Product-details">
      <section>
        <Container>
          {loading ? (
            <Loader />
          ): (
            <Row>
            <Col lg="3" md="4" sm="6" xs="6">
              <img src={product.image} width={200} height={200} />
            </Col>
            <Col lg="3" md="4" sm="6" xs="6">
              <h3>{product.title}</h3>
              <span>{product.price} $</span>
              <button className="addTOCART__btn m-2">Add to Cart</button>
            </Col>
          </Row>
          )}
        
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
