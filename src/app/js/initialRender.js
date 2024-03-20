import { categoriesRender } from "./Function/category.js";
import observer from "./Function/observer.js";
import { productRender } from "./Function/product.js";
import listeners from "./listeners.js"
import { categories, products } from "./variables.js";

const initialRender = () => {
    categoriesRender(categories);
    productRender(products)
    observer();
    listeners();
}

export default initialRender;