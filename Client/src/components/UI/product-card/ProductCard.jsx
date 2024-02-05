import "../../../styles/product-card.scss";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice"
import { Link } from "react-router-dom";
import img from "../../../assets/images/product_01.3.jpg"


const ProductCard = (props) => {
  const { id, item_name,image, item_price, extraIngredients } = props.item;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        item_name,
        image,
        item_price,
        extraIngredients
      })
    );
  };

  return (
    <div className="product__item d-flex flex-column justify-content-between"  key={id}>
      <div className="product__content">
        {/* <img className="product__img w-50" src={image} alt={item_name} /> */}
        <img className="product__img w-50" src={img} alt="Pizza" />
        <h5>
          <Link to={`/foods/${id}`}>{item_name}</Link>
        </h5>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <span className="product__price mb-2">{item_price} € </span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;