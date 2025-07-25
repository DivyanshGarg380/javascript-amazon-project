import { cart,getCartQuantity ,updateDeliveryOption} from "../data/cart.js";
import { products,getProduct } from "../data/products.js";
import {deliveryOptions,getDelivery} from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function tracker(id){
  const cartItem = cart.find(item => item.productId === id);
  if (!cartItem) return;

  const product = getProduct(cartItem.productId);
  const deliveryOption = getDelivery(cartItem.deliveryOptionId);

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
  const dateString = deliveryDate.format('dddd, MMMM D');

  const trackingHTML = `
    <div>Arriving on ${dateString}</div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${cartItem.quantity}
    </div>

    <img class="product-image" src="${product.image}">
  `;

  document.querySelector('.js-tracker-page').innerHTML = trackingHTML;
}
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

if (productId) {
  tracker(productId);
}

export function cartQuantityTrackPage(){
  const cartTextDiv = document.querySelector('.js-cart-track .cart-text');
  if (cartTextDiv) {
    cartTextDiv.innerHTML = `<div class="cart-quantity">${getCartQuantity()}</div>`;
  }
}
cartQuantityTrackPage();