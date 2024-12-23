import { alertMessage, getLocalStorage, setLocalStorage, showCartItemCount } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.selectedProductColorId = 0;
  }

  async init() {
    // use our datasource to get the details for the current product. 
    // findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. 
    // Review the readings from this week on 'this' to understand why. 
    this.product = await this.dataSource.findProductById(this.productId);
    
    this.renderProductDetails();
    document.getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));

    document.getElementById("addToCart")    
      .addEventListener("click", () => { replaceElementID() });

    document.getElementById("colors-select")    
      .addEventListener("change", () => { 
        this.setSelectedProductColorId();
        this.setSelectedProductColorImage(this.productColorId); 
      });
  }

  addProductToCart() {
    const products = [];
  
    const productsFromLS = getLocalStorage("so-cart");

    // search to see if item is already in the cart
    const foundAtIndex = this.findProductInCart(productsFromLS);
    if(foundAtIndex == -1) {
      // not yet in cart, so add Quantity element and set it to 1
      this.product["Quantity"] = 1;
      this.product["SelectedColor"] = this.getSelectedProductColorById(this.productColorId);
      products.push(this.product);
    }
    else {
      // item already in cart, increment Quantity count
      productsFromLS.at(foundAtIndex).Quantity += 1;
    }

    if (productsFromLS != null) {
      productsFromLS.map((item) => products.push(item));
    }
    setLocalStorage("so-cart", products);

    // this updates the count display on the same page
    // when the Add to Cart button is clicked
    showCartItemCount();
    alertMessage(`${this.product.Name} added to cart`);
  }

  findProductInCart(cart) {
    let foundIndex = -1;
    if(cart != null){
      cart.forEach(item => {
        if(item.Id == this.product.Id) {
          foundIndex += 1;
        }
      });
    }
    return foundIndex;
  }

  renderProductDetails() {
    let main = document.querySelector("main");
    
    let section = document.createElement("section");
    section.className = "product-detail";

    let h3 = document.createElement("h3");
    h3.textContent = this.product.Name;
    
    let h2 = document.createElement("h2");
    h2.className = "divider";
    h2.textContent = this.product.NameWithoutBrand;

    //div for discount percent
    let discountPercent = document.createElement("div");
    discountPercent.className = "discountPercent";
    let savings = (this.product.SuggestedRetailPrice - this.product.ListPrice);
    discountPercent.textContent = `SAVE ${((savings/ this.product.SuggestedRetailPrice) * 100).toFixed(0)}%`;
        
    let img = document.createElement("img");    
    img.className = "divider";    
    img.srcset = `${this.product.Images.PrimarySmall} 80w, ${this.product.Images.PrimaryMedium} 160w , ${this.product.Images.PrimaryLarge} 320w`;
    img.sizes = "(min-width: 320px) 320px, (min-width: 300: 160px), 80px";
    img.alt = this.product.NameWithoutBrand;

    let pricing = document.createElement("div");
    pricing.className = "product-pricing"

    let div1 = document.createElement("div");
    div1.className = "price";
    div1.textContent = `$${this.product.ListPrice}`;

    let div2 = document.createElement("div");
    div2.className = "discount";
    div2.textContent = `discounted $${(this.product.SuggestedRetailPrice - this.product.ListPrice).toFixed(2)}`
    // List & Discount
    pricing.appendChild(div1)
    pricing.appendChild(div2)

    let colorDiv = document.createElement("div");
    colorDiv.className = "colors-div";
    let colorSelect = document.createElement("select");
    colorSelect.id = "colors-select";

    this.product.Colors.forEach(color => {
      let option = document.createElement("option");
      option.value = `${color.ColorCode}`;
      option.textContent = `${color.ColorName}`;
      colorSelect.add(option);
    })

    let colorImage = document.createElement("img");
    colorImage.id = "color-image";

    colorDiv.appendChild(colorImage);
    colorDiv.appendChild(colorSelect);

    let p3 = document.createElement("p");
    p3.className = "product__description";
    p3.innerHTML = this.product.DescriptionHtmlSimple;

    let div = document.createElement("div");
    div.className = "product-detail__add";

    let button = document.createElement("button");
    button.id = "addToCart";
    button.setAttribute("data-id", this.product.Id);
    button.innerText = "Add to Cart";

    div.appendChild(button);

    section.appendChild(h3);
    section.appendChild(h2);
    section.appendChild(discountPercent);
    section.appendChild(img);
    section.appendChild(pricing);
    section.appendChild(colorDiv);
    section.appendChild(p3);
    section.appendChild(div);

    main.appendChild(section);
    this.setSelectedProductColorId();
    this.setSelectedProductColorImage(this.productColorId);
  }  

  setSelectedProductColorId() {
    let selectColor = document.querySelector("#colors-select");
    this.productColorId = selectColor.value;
  }

  getSelectedProductColorById(id) {
    const color = this.product.Colors.find(function(item, i) {
      if(item.ColorCode === id) {
        return item.ColorName;
      }
    });
    return color.ColorName;
  }

  setSelectedProductColorImage(id) {
    const color = this.product.Colors.find(function(item, i) {
      if(item.ColorCode === id) {
        return item.ColorChipImageSrc;
      }
    });
    let colorImage = document.querySelector("#color-image");
    colorImage.src = color.ColorChipImageSrc;
  }
}

function replaceElementID() {
  let cartElement = document.querySelector(".cart");
  cartElement.classList.remove("animCart");
  void cartElement.offsetWidth;
  cartElement.classList.add("animCart");
}

