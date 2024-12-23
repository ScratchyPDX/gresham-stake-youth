console.log("mode: " + import.meta.env.MODE);
const baseURL = (import.meta.env.MODE == "production") ? 
  "https://wdd330-backend.onrender.com/" : 
  "http://server-nodejs.cit.byui.edu:3000/";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.text().then(text => { throw {name: "serviceError", message: `${text}` } })
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = baseURL + `products/search/${this.category}`;
  }

  async getData() {
    const response = await fetch(baseURL + `products/search/${this.category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }

  async login(creds) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    };
    return await fetch(baseURL + "login/", options).then(convertToJson);
  }
  
  async getOrders(token) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    return await fetch(baseURL + "orders/", options).then(convertToJson);
  }
}
