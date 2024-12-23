import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, showCartItemCount, getParam } from "./utils.mjs";

const element = document.querySelector(".product-list");
const productCategory = getParam("product");
const dataSource = new ExternalServices(productCategory);
const productList = new ProductList(productCategory, element, dataSource);
productList.init();

loadHeaderFooter(showCartItemCount);
