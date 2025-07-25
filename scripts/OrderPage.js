import {cart,getCartQuantity,removeFromCart,updateDeliveryOption} from '../data/cart.js';
import {products,getProduct} from '../data/products.js';
import {formatCurrency} from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions,getDelivery} from '../data/deliveryOptions.js';
import { cost } from './checkout/paymentSummary.js';
import { tracker } from './Tracking.js';

function OrderPageHTML() {
  const today = dayjs();
  const todayString = today.format('dddd, MMMM D');
  const orderId = generateRandomCode(8);
  let orderHTML = `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${todayString}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${cost()}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderId}</div>
        </div>
      </div>
  `;
  cart.forEach((item) => {
    const productId = item.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOption = getDelivery(item.deliveryOptionId);
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    orderHTML += `
      <div class="order-details-grid">
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>
        <div class="product-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-delivery-date">Arriving on: ${dateString}</div>
          <div class="product-quantity">Quantity: ${item.quantity}</div>
          <button onclick = "window.location.href='amazon.html'" class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a  href="tracking.html?productId=${productId}">
            <button class="track-package-button button-secondary">Track package</button>
          </a>
        </div>
      </div>
    `;
  });
  orderHTML += `</div>`;
  document.querySelector('.js-order').innerHTML = orderHTML;
}
OrderPageHTML();

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

function cartUpdate(){
   
  const cartLink = document.querySelector('.cart-link');
  const cartQuantity = document.createElement('div');
  cartQuantity.className = 'cart-quantity';
  cartQuantity.innerText = getCartQuantity();
  cartLink.appendChild(cartQuantity);
}
cartUpdate();
