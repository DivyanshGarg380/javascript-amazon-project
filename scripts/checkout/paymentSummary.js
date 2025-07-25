import {cart,getCartQuantity} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDelivery } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary(){
   let productPriceCents = 0;  
   let shippingPriceCents = 0; 
    cart.forEach((item)=>{
        const product = getProduct(item.productId);
        productPriceCents += product.priceCents + item.quantity;
        const deliveryOption = getDelivery(item.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const totalTax = totalBeforeTax*0.1;
    const totalCost = totalBeforeTax + totalTax;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${getCartQuantity()}):</div>
                <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">
                $${formatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">
                $${formatCurrency(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">
                $${formatCurrency(totalTax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">
                $${formatCurrency(totalCost)}</div>
            </div>

            <button onclick = "window.location.href='orders.html'"class="place-order-button button-primary">
                Place your order
            </button>
    `;
    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;
}
export function cost(){
   let productPriceCents = 0;  
   let shippingPriceCents = 0; 
    cart.forEach((item)=>{
        const product = getProduct(item.productId);
        productPriceCents += product.priceCents + item.quantity;
        const deliveryOption = getDelivery(item.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const totalTax = totalBeforeTax*0.1;
    const totalCost = totalBeforeTax + totalTax;
    return formatCurrency(totalCost);
}