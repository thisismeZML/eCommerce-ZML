import { categorySection, categoryTemplate } from "../selectors.js";
import { products } from "../variables.js";
import { productRender } from "./product.js";

const createCategory = (category) => {
  const template = categoryTemplate.content.cloneNode(true);
  template.querySelector(".cat-item").innerText = category;
  return template;
};

export const categoriesRender = (categories) => {
  categories.forEach((category) => {
    categorySection.append(createCategory(category));
  });
};

export const categorySectionHandler = (e) => {
  if(e.target.classList.contains("cat-item")) {

    const currentCategory = e.target;

    document.querySelector(".active").classList.remove("active");
    currentCategory.classList.add("active")

    const currentCategoryName = e.target.innerText;

    const currentProductGroup = products.filter(product => product.category === currentCategoryName || currentCategoryName === "All");
    productRender(currentProductGroup);
  }
}