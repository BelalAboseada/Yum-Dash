import Helmet from "../components/Helmet/Helmet.jsx";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import guyImg from "../assets/images/hero.png";
import "../styles/hero-section.scss";
import "../styles/Home.scss";
import Category from "../components/UI/Category/Category.jsx";
import featureImg1 from "../assets/images/service-01.png";
import featureImg2 from "../assets/images/service-02.png";
import featureImg3 from "../assets/images/service-03.png";
import ProductCard from "../components/UI/product-card/ProductCard.jsx"
import FoodCat1 from "../assets/images/hamburger.png"
import FoodCat2 from "../assets/images/pizza.png"
import FoodCat3 from "../assets/images/bread.png"
import { useEffect, useState } from "react";
import whyImg from "../assets/images/location.png"
import TestimonialImg from "../assets/images/network.png"
import TestimonialSlider from "../components/UI/Slider/TestimonialSlider.jsx"
import { fetchProducts } from "../services/api.js";


const FeatureData = [
  {
    title: "Quick Delivery",
    img: featureImg1,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    Minus: "doloremque"
  },
  {
    title: "Super Dine In",
    img: featureImg2,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    Minus: "doloremque"
  },
  {
    title: "Easy Pick Up",
    img: featureImg3,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    Minus: "doloremque"
  }
]

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [Products, setProducts] = useState([]);
  const [HotPizza, SetHotPizza] = useState([])

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

  useEffect(() => {
    console.log("Category changed:", category);
    if (category === "ALL") {
      setProducts(Products);
    } else if (category === "BURGER") {
      const FilteredProducts = Products.filter(item => item.category === "Burger");
      setProducts(FilteredProducts);
      console.log("Filtered Products:", FilteredProducts);
    } else if (category === "PIZZA") {
      const FilteredProducts = Products.filter(item => item.category == "Pizza");
      setProducts(FilteredProducts);
      console.log("Filtered Products:", FilteredProducts);

    } else if (category === "BREAD") {
      const FilteredProducts = Products.filter(item => item.category === "Bread");
      setProducts(FilteredProducts);
      console.log("Filtered Products:", FilteredProducts);

    } else {
      // Handle default case, set products to an empty array or default value
      setProducts([]);
    }
  }, [category]);

  useEffect(() => {
    const FilteredProducts = Products.filter(item => item.category == "jewelery");
    // const SlicePizza = FilteredProducts.slice(0, 4)
    SetHotPizza(FilteredProducts);
    console.log(FilteredProducts);
  }, [])



  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Just wait <br /> food at
                  <span> your door</span>
                </h1>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                  magni delectus tenetur autem, sint veritatis!
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    <Link to="/foods"> Order now <i className="ri-arrow-right-s-line"></i></Link>
                  </button>

                  <button className="all__foods-btn">
                    <Link to="/foods">See all foods</Link>
                  </button>
                </div>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>
                    No shipping charge
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6" >
              <div className="hero__img">
                <img src={guyImg} alt="delivery-guy" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Category />
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12' className="text-center">
              <h5 className="feature_subTitle mb-4">What We Serve</h5>
              <h2 className="feature_Title">Just Sit back at Home</h2>
              <h1 className="feature_Title">We will <span>take care</span>
              </h1>
              <p className="mb-1 mt-4 feature_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, ex!</p>
              <p className="feature_text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, ex?</p>
            </Col>

            {FeatureData.map((item, index) => (
              <Col lg="4" md="4" key={index} className="mt-5">
                <div className="feature_item text-center px-5 py-3" >
                  <img src={item.img} alt="feature_img" className="w-25 mb-3" />
                  <h5 className=" fw-bold">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}

          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className=" text-center">
              <h2>Popular Food</h2>
            </Col>
            <Col lg="12" className="FoodCategory d-flex align-items-center justify-content-center gap-4">
              <button className="All_btn d-flex align-items-center gap-2" onClick={() => setCategory("ALL")}>All</button>
              <button className="d-flex align-items-center gap-2" onClick={() => setCategory("BURGER")}>
                <img src={FoodCat1} alt="Burger" />Burger
              </button>
              <button className="d-flex align-items-center gap-2" onClick={() => setCategory("PIZZA")}>
                <img src={FoodCat2} alt="Pizza" />Pizza
              </button>
              <button className="d-flex align-items-center gap-2" onClick={() => setCategory("BREAD")}>
                <img src={FoodCat3} alt="Bread" />Bread
              </button>

            </Col>
            {Products.map(item => (
              <Col lg="3" md="4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why_YumDash" className="w-100" />
            </Col>
            <Col lg="6" md="6">
              <div className="why_YumDash">
                <h2 className="YumDash_title mb-4">Why <span>YumDash</span></h2>
                <p className="yumDash_desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium impedit maxime, qui vitae voluptatem libero, ipsum repudiandae atque consequatur quisquam autem fuga vel adipisci. Laudantium aliquid iste eveniet saepe atque.</p>
              </div>
              <ListGroup className="mt-5">
                <ListGroupItem className=" border-0 ps-0">
                  <p className="choose_us_title d-flex align-items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>Fresh and tasty Food
                  </p>
                  <p className="choose_us_desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, dolores.                    </p>
                </ListGroupItem>
                <ListGroupItem className=" border-0 ps-0">
                  <p className="choose_us_title d-flex align-items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>Quality Support
                  </p>
                  <p className="choose_us_desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, dolores.                  </p>
                </ListGroupItem>
                <ListGroupItem className=" border-0 ps-0">
                  <p className="choose_us_title d-flex align-items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>Order From any location
                  </p>
                  <p className="choose_us_desc">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, dolores.                  </p>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg='12' className=" text-center mb-5">
              <h2>Hot Pizza</h2>
            </Col>
            {HotPizza.map((item) => (
                <Col lg="3" md="4" key={item.id}>
                  <ProductCard item={item} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <h5 className="Testimonial_title mb-4">Testimonial</h5>
              <h2 className="Testimonial_sub_title mb-4" >What our <span>customers</span> are saying</h2>
              <p className="Testimonial_desc mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio quasi qui minus quos sit perspiciatis inventore quis provident placeat fugiat!</p>
              <TestimonialSlider />
            </Col>
            <Col lg='6' md='6'>
              <img src={TestimonialImg} alt="TestimonialImg" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
