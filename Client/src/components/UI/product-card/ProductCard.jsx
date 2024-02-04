import "../../../styles/product-card.scss";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice"
import { Link } from "react-router-dom";


const ProductCard = (props) => {
  const { id, title, image, price, extraIngredients } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image,
        price,
        extraIngredients
      })
    );
  };

  return (
    <div className="product__item d-flex flex-column justify-content-between" key={id}>
      <div className="product__content">
        <img className="product__img w-50" src={image} alt="Pizza" />
        <h5>
          <Link to={`/foods/${id}`}>{title}</Link>
        </h5>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <span className="product__price mb-2">{price} € </span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;