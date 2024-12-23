
import {renderListWithTemplate} from "./utils.mjs";

export default class ProductList {

  constructor(productCategory, htmlElement, dataSource) {
    this.productCategory = productCategory;
    this.htmlElement = htmlElement;
    this.dataSource = dataSource;
    this.productList = [];
  }

  async init() {
    this.productList = await this.dataSource.getData(this.productCategory);
    console.log("init: productList: " + this.productList);
    this.renderList(this.productList);
    let h2_product_category = document.getElementById("product-category"); 
    h2_product_category.innerText = `Top Products: ${this.productCategory.toUpperCase()}`;


    document.getElementById("by-name").addEventListener("click", () => { 
      this.sortByName();
      this.renderList();
    });
    document.getElementById("by-price").addEventListener("click", () => { 
      this.sortByPrice();
      this.renderList();
    });
  }

  renderList() {
    renderListWithTemplate(productCardTemplate, this.htmlElement, this.productList, "afterbegin", false);
  }

  sortByName() {
    this.productList.sort((a, b) => {
      const nameA = a.NameWithoutBrand.toUpperCase();
      const nameB = b.NameWithoutBrand.toUpperCase();
      if(nameA < nameB) {return -1;}
      if(nameA > nameB) {return 1;}
      return 0;
    });
  }

  sortByPrice() {
    this.productList.sort((a, b) => {
      const priceA = a.ListPrice;
      const priceB = b.ListPrice;
      if(priceA < priceB) {return -1;}
      if(priceA > priceB) {return 1;}
      return 0;
    });
  }
}

function productCardTemplate(product) {

    let img = document.createElement("img");
    img.srcset = `${product.Images.PrimarySmall} 80w, ${product.Images.PrimaryMedium} 160w , ${product.Images.PrimaryLarge} 320w`;
    img.sizes = "(min-width: 50em) 160px, (min-width: 20em: 80px), 320px";  
    img.alt = product.NameWithoutBrand;
  
    let li = document.createElement("li");
    li.className = "product-card";
  
    let a = document.createElement("a");
    a.href = `../product_pages/index.html?product=${product.Id}`;
  
    let h3 = document.createElement("h3");
    h3.className = "card__brand";
    h3.textContent = product.Brand.Name;
  
    let h2 = document.createElement("h2");
    h2.className = "card__name";
    h2.textContent = product.NameWithoutBrand;
  
    let p = document.createElement("p");
    p.className = "product-card__price";
    p.textContent = `$${product.ListPrice}`;
  
    a.appendChild(img);
    li.appendChild(a);
    li.appendChild(h3);
    li.appendChild(h2);
    li.appendChild(p);
    return li.outerHTML;
}
