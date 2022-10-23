import React from "react";
import classes from "./Cart.module.css";
import CartModal from "../UI/CartModal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  //   const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  console.log("from cart");
  console.log(cartCtx.items);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {};

  const cartItemAddHandler = (item) => {};

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={`${item.flight_id.origin_country_id.name} To ${item.flight_id.destination_country_id.name}`}
          amount={item.id}
          price={item.id}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <CartModal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amout</span>
        {/* <span>{totalAmount}</span> */}
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={props.onClose}>
            Order
          </button>
        )}
      </div>
    </CartModal>
  );
};

export default Cart;
