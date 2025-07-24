import { getCartQuantity } from "../../data/cart.js";

export function cartQuantityCheckoutPageHTML(){
    let cartQuantityHTML = `
    Checkout (<a class="return-to-home-link"
            href="amazon.html">${getCartQuantity()} Items</a>)
    `;
    document.querySelector('.js-checkout')
        .innerHTML = cartQuantityHTML;
}