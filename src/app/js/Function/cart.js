import {
  cartCount,
  cartItemGroup,
  cartItemTemplate,
  drawerBtn,
  productGroup,
  totalAmount,
} from "../selectors";
import { products } from "../variables";

export const createCartItem = (currentProduct, q) => {
  const template = cartItemTemplate.content.cloneNode(true);

  template
    .querySelector("#cartItem")
    .setAttribute("cart-id", currentProduct.id);

  template.querySelector(".cart-img").src = currentProduct.image;
  template.querySelector(".cart-title").innerText = currentProduct.title;
  template.querySelector(".cart-price").innerText = currentProduct.price;
  template.querySelector(".cart-cost").innerText = currentProduct.price;
  template.querySelector(".cart-quantity").innerText = q;

  return template;
};

export const addProdutToCart = (e) => {
  const currentProductDiv = e.target.closest(".product-item");
  const currentProductId = parseInt(
    currentProductDiv.getAttribute("product-id")
  );

  const currentProduct = products.find(
    (product) => product.id === currentProductId
  );

  // optional -------
  const addToCartBtn = e.target;
  addToCartBtn.classList.add("bg-primaryColor", "text-white");
  addToCartBtn.setAttribute("disabled", true);
  addToCartBtn.innerText = "Added";

  const isExisted = cartItemGroup.querySelector(
    `[cart-id = "${currentProduct.id}"]`
  );
  if (isExisted) {
    const existedProductQuantity = isExisted.querySelector(".cart-quantity");
    const existedProductPrice = isExisted.querySelector(".cart-price");
    const existedProductCost = isExisted.querySelector(".cart-cost");

    existedProductQuantity.innerText =
      parseInt(existedProductQuantity.innerText) + 1;
    existedProductCost.innerText =
      existedProductPrice.innerText * existedProductQuantity.innerText;
  } else {
    cartItemGroup.append(createCartItem(currentProduct, 1));
  }

  // animationToCart
  const currentProductImg = currentProductDiv.querySelector(".product-img");

  const animateImg = new Image();
  animateImg.src = currentProductImg.src;
  animateImg.style.position = "fixed";
  animateImg.style.top = currentProductImg.getBoundingClientRect().top + "px";
  animateImg.style.left = currentProductImg.getBoundingClientRect().left + "px";
  animateImg.style.height =
    currentProductImg.getBoundingClientRect().height + "px";
  animateImg.style.width =
    currentProductImg.getBoundingClientRect().width + "px";
  document.body.append(animateImg);

  const keyframes = [
    {
      top: currentProductImg.getBoundingClientRect().top + "px",
      left: currentProductImg.getBoundingClientRect().left + "px",
    },
    {
      top: drawerBtn.querySelector("svg").getBoundingClientRect().top + "px",
      left: drawerBtn.querySelector("svg").getBoundingClientRect().left + "px",
      height: "0px",
      width: "0px",
      transform: "rotate(2turn)",
    },
  ];

  const duration = 700;

  const addToCartAnimatImg = animateImg.animate(keyframes, duration);
  const handleAnimationFinish = () => {
    animateImg.remove();
    drawerBtn.classList.add("animate__shakeX");
    updateCartItemCount();
    drawerBtn.addEventListener("animationend", () => {
      drawerBtn.classList.remove("animate__shakeX");
    });
  };
  addToCartAnimatImg.addEventListener("finish", handleAnimationFinish);

  
};

export const updateCartItemCount = () => {
  cartCount.innerText = countCartItem();
};

export const countCartItem = () => {
  return cartItemGroup.querySelectorAll("#cartItem").length;
};

export const updateTotalCost = () => {
  const allCost = cartItemGroup.querySelectorAll(".cart-cost");

  let total = [...allCost].reduce((pv, cv) => pv + parseFloat(cv.innerText), 0);

  totalAmount.innerText = total.toFixed(2);
};

export const totalAmountObserver = () => {
  const run = () => {
    updateTotalCost();
  };

  const config = { attributes: true, childList: true, subtree: true };

  const observer = new MutationObserver(run);
  observer.observe(cartItemGroup, config);
};

export const deleteCartItem = (e) => {
  const cartItem = e.target.closest("#cartItem");

  const cartProductId = cartItem.getAttribute(`cart-id`);
  const currentProduct = productGroup.querySelector(
    `[product-id = "${cartProductId}"]`
  );

  cartItem.classList.add("animate__animated", "animate__fadeOutLeft");
  cartItem.addEventListener("animationend", () => {
    cartItem.remove();
    if (currentProduct) {
      currentProduct
        .querySelector(".adc-btn")
        .classList.remove("bg-primaryColor", "text-white");
      currentProduct.querySelector(".adc-btn").removeAttribute("disabled");
      currentProduct.querySelector(".adc-btn").innerText = "Add To Cart";
    }
    updateCartItemCount();
  });
};

export const updateCart = (cartId, q) => {
  const currentCart = cartItemGroup.querySelector(`[cart-id = "${cartId}"]`);

  const currentCartQuantity = currentCart.querySelector(".cart-quantity");
  const currentCartPrice = currentCart.querySelector(".cart-price");
  const currentCartCost = currentCart.querySelector(".cart-cost");
  if (q > 0 || currentCartQuantity.innerText > 1) {
    currentCartQuantity.innerText = parseInt(currentCartQuantity.innerText) + q;
    currentCartCost.innerText =
      currentCartPrice.innerText * currentCartQuantity.innerText;
  }
};

export const cartItemGroupHandler = (e) => {
  if (e.target.classList.contains("card-delete-btn")) {
    deleteCartItem(e);
  } else if (e.target.classList.contains("cart-q-add")) {
    updateCart(e.target.closest("#cartItem").getAttribute("cart-id"), 1);
  } else if (e.target.classList.contains("cart-q-sub")) {
    updateCart(e.target.closest("#cartItem").getAttribute("cart-id"), -1);
  }
};
