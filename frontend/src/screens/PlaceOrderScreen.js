import React from "react";
import {  useSelector } from "react-redux";

import { Link } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems,shipping,payment } = cart;
if(!shipping.address){
    props.history.push('/shipping');
}
if(!payment){
    props.history.push('/payment');
}
  const itemPrice=cartItems.reduce((a,c)=>a+c.price*c.qty,0);
  const shippingPrice=itemPrice >1000?0:10;
  const taxPrice=0.15 * itemPrice;
  const totalPrice=itemPrice+shippingPrice+taxPrice;

 

const placeOrderHandler=()=>{

}

  return (
      <div>
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

          <div className="placeorder">
      <div className="placeorder-info">
          <div>
              <h3>Shipping Address</h3>
              <div>
                  {cart.shipping.address},{cart.shipping.city},
                  {cart.shipping.postalCode},{cart.shipping.country}
              </div>
          </div>
          <div>
              <h3>Payment</h3>
              <div>
                  Payment Method : Paypal
              </div>
          </div>
          <div>
          <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>

          {cartItems.length === 0 ? (
            <div>Cart is Empty</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div className="cart-image">
                  <img classname="abc" src={item.image} alt="product" />
                </div>

                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <div className="qtyPlaceOrder">
                    Qty:{' '} {item.qty}
                   
                   
                  </div>
                </div>
                <div className="cart-price">Rs. {item.price}</div>
              </li>
            ))
          )}
        </ul>
          </div>
        
      </div>
      <div className="placeorder-action">
          <ul>
              <li>
                  <button className="button primary full-width" onClick={placeOrderHandler}>Place Order</button>
              </li>
              <li><h3>Order summary</h3></li>
              <li>
                  <div>Items</div>
                  <div>Rs.{itemPrice}</div>
              </li>
              <li>
                  <div>Shipping</div>
                  <div>Rs.{shippingPrice}</div>
              </li>
              <li>
                  <div>Tax</div>
                  <div>Rs.{taxPrice}</div>
              </li>
              <li className="order-total">
                  <div>Order Total</div>
                  <div>Rs.{totalPrice}</div>
              </li>
          </ul>
      
       
      </div>
    </div>
      </div>
   
  );
}
export default PlaceOrderScreen;
