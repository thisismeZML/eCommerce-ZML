import { cartItemGroupHandler } from "./Function/cart.js";
import { categorySectionHandler } from "./Function/category.js";
import { productGroupHanlder } from "./Function/product.js";
import { sliderHandler } from "./handlers.js";
import {
  cartBtn,
  cartItemGroup,
  categorySection,
  closeBtn,
  productGroup,
} from "./selectors.js";

const listeners = () => {
  cartBtn.addEventListener("click", sliderHandler);
  closeBtn.addEventListener("click", sliderHandler);
  categorySection.addEventListener("click", categorySectionHandler);
  productGroup.addEventListener("click", productGroupHanlder);
  cartItemGroup.addEventListener("click", cartItemGroupHandler);
};

export default listeners;
