import { getLocalStorage, deleteLocalStorage, alertMessage, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

export default class CheckoutProcess{
  constructor(dataKey) {
    this.itemList = [];
    this.itemCount = 0;
    this.subtotal = 0;
    this.shipping = 0
    this.tax = 0;
    this.orderTotal = 0
    this.dataKey = dataKey;
  }

  init() {
    this.itemList = getLocalStorage(this.dataKey);
    this.calculateSubtotal();

    document.getElementById("zip")    
      .addEventListener("change", () => { this.calculateOrderTotal() });

  }

  calculateSubtotal() {
    const numberOfItem = document.querySelector("#num-of-items");
    const subtotal_element = document.querySelector("#subtotal");
    if(this.itemList != null && this.itemList.length > 0) {
      this.itemList.forEach(item => {
        this.itemCount += item.Quantity;
        this.subtotal += (item.Quantity * item.FinalPrice);
      });
    }
    // set html
    numberOfItem.textContent = this.itemCount;
    subtotal_element.textContent = `$${this.subtotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const zip_element = document.querySelector("#zip");
    const shipping_element = document.querySelector("#shipping");
    const tax_element = document.querySelector("#tax");
    const total_element = document.querySelector("#total");

    if(zip_element.value != "") {
      this.shipping = 10 + ((this.itemCount - 1) * 2);
      this.tax = this.subtotal * 0.06;
      this.orderTotal = this.subtotal + this.shipping + this.tax;
    }
    else {
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
   
    // set html
    shipping_element.textContent = `$${this.shipping.toFixed(2)}`;
    tax_element.textContent = `$${this.tax.toFixed(2)}`;
    total_element.textContent = `$${this.orderTotal.toFixed(2)}`;
  }
  
  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);

    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal.toFixed(2);
    json.tax = this.tax.toFixed(2);
    json.shipping = this.shipping.toFixed(2);
    json.items = packageItems(this.itemList);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(`Request successful: ${JSON.stringify(res, null, 4)}`); // <- formats JSON string
      deleteLocalStorage(this.dataKey);
      window.location.href = "success.html"
    } catch (err) {
      console.log(`${err.name}: ${err.message}`);
      let errorMessages = JSON.parse(err.message);
      Object.keys(errorMessages).forEach(key => {
        alertMessage(errorMessages[key]);
      })
    }
  }
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Quantity,
    };
  });
  return simplifiedItems;
}
