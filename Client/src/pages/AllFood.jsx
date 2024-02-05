import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import ReactPaginate from "react-paginate";
import "../styles/pagination.scss";
import { fetchProducts } from "../services/api";
import Loader from "../components/Loader/Loader";
import "../styles/AllFood.scss";
import CommonSection from "../components/UI/common-section/CommonSection";

const AllFood = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const productPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setProductData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const visitedPage = pageNumber * productPerPage;

  // Apply sorting logic
  const sortedProducts = () => {
    switch (sortOption) {
      case "ascending":
        return [...productData].sort((a, b) =>
          a.item_name.localeCompare(b.item_name)
        );
      case "descending":
        return [...productData].sort((a, b) =>
          b.item_name.localeCompare(a.item_name)
        );
      case "high-price":
        return [...productData].sort((a, b) => b.item_price - a.item_price);
      case "low-price":
        return [...productData].sort((a, b) => a.item_price - b.item_price);
      default:
        return productData;
    }
  };

  const displayPage = sortedProducts().slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(sortedProducts().length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All Pizzas">
      <CommonSection title="All Food" />
      <Container>
        <Row>
          <Col lg="6" md="6" sm="6" className=" mt-4">
            <div className="Search d-flex justify-content-between align-items-center ">
              <input
                type="text"
                className="search_input"
                placeholder="I am looking for..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <i className="ri-search-line"></i>
            </div>
          </Col>
          <Col lg="6" md="6" sm="6" className="mb-5 mt-4">
            <div className="Sort text-end">
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                }}
              >
                <option value="default">Default</option>
                <option value="ascending">Alphabetically, A-Z</option>
                <option value="descending">Alphabetically, Z-A</option>
                <option value="high-price">High Price</option>
                <option value="low-price">Low Price</option>
              </select>
            </div>
          </Col>

          {loading ? (
            <Loader />
          ) : (
            <>
              {displayPage
                .filter((item) => {
                  if (item.item_name) {
                    return item.item_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  }
                  if (searchTerm === "") {
                    return item;
                  }
                  return false;
                })
                .map((item, images) => (
                  <Col
                    lg="3"
                    md="4"
                    sm="6"
                    xs="6"
                    key={item.id}
                    className="mb-4 mt-4"
                  >
                    <ProductCard item={item} images={images} />
                  </Col>
                ))}
            </>
          )}
        </Row>
        <div className="d-flex justify-content-center mt-4 mb-4">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={changePage}
            previousLabel={"Prev"}
            nextLabel={"Next"}
            containerClassName="paginationBtn"
          />
        </div>
      </Container>
    </Helmet>
  );
};

export default AllFood;
