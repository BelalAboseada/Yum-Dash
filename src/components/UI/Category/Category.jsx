import { Container, Row, Col } from "reactstrap";
import CatImg1 from "../../../media/images/category-01.png";
import CatImg2 from "../../../media/images/category-02.png";
import CatImg3 from "../../../media/images/category-03.png";
import CatImg4 from "../../../media/images/category-04.png";
import "../../../styles/Category.scss"


const Category = () => {
  const CatData = [
    {
      display: "FastFood",
      Img: CatImg1
    },
    {
      display: "Pizza",
      Img: CatImg2
    }, {
      display: "Asian Food",
      Img: CatImg3
    }, {
      display: "Row Meat",
      Img: CatImg4
    },
  ]

  return (
    <Container>
      <Row>
        {CatData.map((item, index) => (
          <Col lg='3' md='4' key={index}>
            <div className="CatItem d-flex align-items-center gap-3" >
              <div className="CatImg">
                <img src={item.Img} alt="Category Item" />
              </div>
              <h6>{item.display}</h6>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Category;