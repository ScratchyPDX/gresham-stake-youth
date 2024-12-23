import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, showCartItemCount } from "./utils.mjs";

loadHeaderFooter(showCartItemCount);
const checkoutProcess = new CheckoutProcess;
checkoutProcess.init();

const myCheckout = new CheckoutProcess("so-cart");
myCheckout.init();

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.forms["checkout"];
  const isFormValid = form.checkValidity();
  form.reportValidity();
  if(isFormValid) {
    myCheckout.checkout();
  }
});
