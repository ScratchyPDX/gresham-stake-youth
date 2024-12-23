import { loadHeaderFooter, showCartItemCount, getLocalStorage, setLocalStorage} from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.js"

// renderCartContents();
loadHeaderFooter(showCartItemCount);

let shoppingCart = new ShoppingCart();
shoppingCart.init();
showCartTotal(); 

function showCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  let cartTotal = 0;
  cartItems.map((item) => cartTotal += (item.FinalPrice * item.Quantity));
  if(cartTotal > 0) {
    document.querySelector("#cart-total").hidden = false;
    document.querySelector("#cart-total-value").textContent = cartTotal;
  }
  else {
    document.querySelector("#cart-total").hidden = true;
  }
}

window.removeCartItem = (itemID) => {
  
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null && cartItems.length > 0) {

    let newCart = new Array();
    
    // Create a new array filtering out the itemID for removal
    newCart = cartItems.filter(element => element.Id !== itemID);
    
    // Remove & update local storage
    setLocalStorage("so-cart", newCart);

    // Then, re-render cart & update item count icon
    showCartItemCount();
    shoppingCart.init();
    showCartTotal();
  }
}

window.updateCardQty = (itemID) => {  
  let cardQty = parseFloat(document.getElementById(itemID + "qty").value|0);
  
  const cartItems = getLocalStorage("so-cart");
  if(cartItems != null && cartItems.length > 0) {
    cartItems.forEach(item => {
  
  if (itemID == item.Id)
      item.Quantity = cardQty;
    });
  }

  setLocalStorage("so-cart", cartItems);
  showCartItemCount();
  showCartTotal();
}

