import { alertMessage, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class Admin {

  constructor() {
    this.token = null;
    this.services = new ExternalServices();
  }

  init() {
    this.showLogin();

    document.getElementById("login-button")    
    .addEventListener("click", () => { this.login(this.showOrders.bind(this)) });
  }

  async login(next) {    
    const formElement = document.forms["form-container"];
    const json = formDataToJSON(formElement);

    try {
      const res = await this.services.login(json);
      console.log(`login: Request successful: ${JSON.stringify(res, null, 4)}`); // <- formats JSON string
      this.token = res.accessToken;
      alertMessage("Login successful");
      next();
    } 
    catch (err) {
      console.log(`${err.name}: ${err.message}`);
      let errorMessages = JSON.parse(err.message);
      Object.keys(errorMessages).forEach(key => {
        alertMessage(errorMessages[key]);
      })
    }
  }

  showLogin() {
    let main = document.querySelector("main");
  
    // add login form
    let container = document.createElement("div");
    container.className = "form-parent";

    let form = document.createElement("form");
    form.id = "form-container";
    form.classList.add("form");

    // create fieldset and legend
    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.textContent = "Login";

    // create email input
    let email_label = document.createElement("label");
    email_label.textContent = "Email Address";
    email_label.className = "top";
    let email_input = document.createElement("input");
    email_input.type = "email";
    email_input.id = "email";
    email_input.name = "email";
    email_input.required = true;
    email_input.value = "user1@email.com";
    email_label.appendChild(email_input);

    // create password input
    let password_label = document.createElement("label");
    password_label.textContent = "Password";
    password_label.className = "top";
    let password_input = document.createElement("input");
    password_input.type = "password";
    password_input.id = "password";
    password_input.name = "password";
    password_input.required = true;
    password_input.value = "user1";
    password_label.appendChild(password_input);

    // add legend and inputs to fieldset
    fieldset.appendChild(legend);
    fieldset.appendChild(email_label);
    fieldset.appendChild(password_label);

    // add fieldset to form
    form.appendChild(fieldset);

    // create login button
    let button = document.createElement("button");
    button.textContent = "Login";
    button.id = "login-button";

    // add to main
    main.appendChild(form);

    // add button to main
    main.appendChild(button);
  }

  async showOrders() {
    try {
      // window.location.href = "orders.html"
      const res = await this.services.getOrders(this.token);
      console.log(`showOrders: ${JSON.stringify(res, null, 4)}`); // <- formats JSON string
      let orderString = buildOrderResult(res[0]);
      console.log(`showOrders 1`); // <- formats JSON string
      let orderForm = document.querySelector("#order-form");
      console.log(`showOrders 2`); // <- formats JSON string
      orderForm.innerHTML = orderString;
      console.log(`showOrders 3`); // <- formats JSON string

    } 
    catch (err) {
      console.log(`${err.name}: ${err.message}`);
      let errorMessages = JSON.parse(err.message);
      Object.keys(errorMessages).forEach(key => {
        alertMessage(errorMessages[key]);
      })
    }
  }
  
}

function buildOrderResult(order) {
const htmlString = `<form class="form">
<fieldset>
  <legend>Shipping Info</legend>
  <table>
    <tr class="row">
      <td>Name</td>
      <td>${order.fname} ${order.lname}</td>
    </tr>
    <tr class="row">
      <td>Address</td>
      <td>${order.street}, ${order.city}, ${order.state} ${order.zip}</td>
    </tr>
  </table>
</fieldset>
<fieldset>
  <legend>Payment Info</legend>
  <table>
    <tr class="row">
      <td>Card</td>
      <td>${order.street.substr(0,4)}</td>
    </tr>
    <tr class="row">
      <td>Order Total</td>
      <td>${order.orderTotal}</td>
    </tr>
  </table>
</fieldset>
<fieldset>
  <legend>Order Summary</legend>
  <table>
    <tr>
      <td>Product Name</td>
      <td>${order.items[0].name}</td>
    </tr>
    <tr>
      <td>Product Name</td>
      <td>${order.items[1].name}</td>
    </tr>
  </table>
</fieldset>
</form>`

return htmlString;
}
