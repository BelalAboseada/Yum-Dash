import "../styles/checkout.scss";
import { AiFillCheckCircle } from "react-icons/ai";

const Checkout = () => {
  return (
    <>
      <div className="checkoutMessage text-center ">
        <div className="checkoutTitleContainer">
          <AiFillCheckCircle className="checkoutIcon" />
          <h3>Thank you for your order!</h3>
        </div>
        <span>
          Your order is being processed and will be delivered as fast as
          possible.
        </span>
      </div>
    </>
  );
};

export default Checkout;
