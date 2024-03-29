import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";
import "../../../styles/shopping-cart.scss";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Firebase/firebase.config";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  return (
    <div className="cart__container" onClick={toggleCart}>
      <ListGroup onClick={(event) => event.stopPropagation()} className="cart">
      {/* add close btn */}
      <div className="Close_Btn">
        <span onClick={toggleCart}>
          <i className="ri-close-fill"></i>
        </span>
      </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <div className="text-center py-5 my-5">
              <h6 className="text-center">No item added to the cart!</h6>
              <button className="addTOCART__btn m-3">
                <Link to="/foods">See all foods</Link>
              </button>
            </div>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} onClose={toggleCart} />
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Subtotal : <span>${totalAmount}</span>
          </h6>
          <button>
            {isLoggedIn ? (
              <Link to="/checkout" onClick={toggleCart}>
                Checkout
              </Link>
            ) : (
              <Link to="/SignIn">Checkout</Link>
            )}
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
