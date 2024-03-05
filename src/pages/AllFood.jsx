import { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

import products from "../assets/data/data";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/AllFood.scss";
import "../styles/pagination.scss";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [pageNumber, setPageNumber] = useState(0);

  // Apply search filter
  const searchedProduct = products.filter((item) => {
    if (!searchTerm) return true; // If no search term, return all products
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Apply sorting logic
  const sortedProducts = () => {
    switch (sortOption) {
      case "ascending":
        return [...searchedProduct].sort((a, b) => a.title.localeCompare(b.title));
      case "descending":
        return [...searchedProduct].sort((a, b) => b.title.localeCompare(a.title));
      case "high-price":
        return [...searchedProduct].sort((a, b) => b.price - a.price);
      case "low-price":
        return [...searchedProduct].sort((a, b) => a.price - b.price);
      default:
        return searchedProduct;
    }
  };

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = sortedProducts().slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(sortedProducts().length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="Search d-flex align-items-center justify-content-between">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="Sort text-end">
                <select className="w-50" onChange={(e) => setSortOption(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                  <option value="high-price">High Price</option>
                  <option value="low-price">Low Price</option>
                </select>
              </div>
            </Col>

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName="paginationBtn"
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
