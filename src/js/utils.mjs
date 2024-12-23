// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function deleteLocalStorage(key) {
  localStorage.removeItem(key);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("product")
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if(clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = false) {
  if(clear) {
    parentElement.removeChild();
  }
  parentElement.insertAdjacentHTML(position, templateFn);
  if(callback) {
    callback(data);
  }
}

export function showCartItemCount() {
  const cart_element = document.querySelector("#cart-count");
  const cartItems = getLocalStorage("so-cart");
  if(cartItems != null && cartItems.length > 0) {
    let itemCount = 0;
    cartItems.forEach(item => {
      itemCount += item.Quantity;
    });
    cart_element.textContent = itemCount;
    cart_element.hidden = false;
  }else{
    cart_element.hidden = true;
  }
}

export function loadTemplate(path) {
  return fetch(path)
    .then((response) => response.text());
}

export async function loadHeaderFooter(callback) {
  // header
  const header_element = document.querySelector("#main-header");  
  loadTemplate("../partials/header.html").then((header) => {
    renderWithTemplate(header, header_element);
    
    callback();
  });

  // footer
  const footer_element = document.querySelector("#main-footer");  
  loadTemplate("../partials/footer.html").then((footer) => {
    renderWithTemplate(footer, footer_element);
  });
}

export async function loadJson(jsonFile) {
  const jsonData = await fetch(jsonFile)
  .then((response) => response.json())
  .then((json) => {
      console.log(json)
      return json;
  });
  return jsonData;
}

export function alertMessage(message, scroll = true) {
    let element = document.querySelector("#alert-list");
    let section = document.createElement("section");
    let p = document.createElement("p");
    p.textContent = message;
    let input = document.createElement("input");
    input.className = "alert-button";
    input.type = "button";
    input.value = "X";
    section.appendChild(p);
    section.appendChild(input);
    element.prepend(section);

    input.addEventListener("click", function(e) {
        element.removeChild(section);
  })
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  console.log("formDataToJSON: " + JSON.stringify(convertedJSON));
  return convertedJSON;
}
