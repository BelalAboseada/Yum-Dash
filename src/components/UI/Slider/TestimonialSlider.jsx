import Slider from "react-slick";
import avatar1 from "../../../media/images/ava-1.jpg";
import avatar2 from "../../../media/images/ava-2.jpg";
import avatar3 from "../../../media/images/ava-3.jpg";
import avatar4 from "../../../media/images/ava-4.jpg";
import "../../../styles/TestimonialSlider.scss";

const Testimonial = [
  {
    Comment: `"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio quasi qui minus quos sit perspiciatis inventore quis provident placeat fugiat!"`,
    Img: avatar1,
    name: "Jhon Doe",
  },
  {
    Comment: `"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio quasi qui minus quos sit perspiciatis inventore quis provident placeat fugiat!"`,
    Img: avatar2,
    name: "Mitchell Marsh",
  },
  {
    Comment: `"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio quasi qui minus quos sit perspiciatis inventore quis provident placeat fugiat!"`,
    Img: avatar3,
    name: "Steven Crock",
  },
  {
    Comment: `"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio quasi qui minus quos sit perspiciatis inventore quis provident placeat fugiat!"`,
    Img: avatar4,
    name: "Poul Gray",
  },
];
const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 3000,
  };

  return (
    <Slider {...settings}>
      {Testimonial.map((item, index) => (
        <div className="Testimonial_slider" key={index}>
          <p className="Comment">{item.Comment}</p>
          <div className="slider_content d-flex align-items-center gap-3">
            <img src={item.Img} alt="avatar" />
            <h6 className="name">{item.name}</h6>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TestimonialSlider;
