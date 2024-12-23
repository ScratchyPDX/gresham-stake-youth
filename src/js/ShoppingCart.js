import {renderListWithTemplate, getLocalStorage} from "./utils.mjs";

export default class ShoppingCart {

  constructor() {
    this.htmlElement = [];
    this.dataSource = [];
    this.cartList = [];
  }

  async init() {
    this.dataSource = getLocalStorage("so-cart");
    this.htmlElement = document.querySelector(".product-list")
    this.cartList = this.dataSource;
    console.log("init: shoppingCart: " + this.cartList);
    this.renderList();
  }

  // Clear the cart, then re-render contents
  renderList() {
    renderListWithTemplate(cartItemTemplate, this.htmlElement, this.cartList, "afterbegin", true);
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image"><img src="${item.Images.PrimaryMedium}" alt="${item.Name}"/></a>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.SelectedColor}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <input type="number" id="${item.Id}qty" min=0 name="itemQty" class="cart-card__quantity" onchange="updateCardQty('${item.Id}')" placeholder="Quantity: ${item.Quantity}" value="${item.Quantity}">    
    <div class="cart-card__remove" onclick="removeCartItem('${item.Id}')" touchend="removeCartItem('${item.Id}')" title="Remove item from cart">Remove</div>
  </li>`;

  return newItem;
}
