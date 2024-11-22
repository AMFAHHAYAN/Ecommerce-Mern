import React from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../apiClient";
import { addToCart } from "../app/reducers/CartSlice";
import Swal from "sweetalert2";
const imageUrl = import.meta.env.VITE_IMAGE_URL;


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { userId, token } = useSelector((state) => state.loggedInData);

  const addItemToCart = async () => {
    const item = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    try {
      const res = await apiClient.post(
        `/add-to-cart`,
        {
          id: userId,
          productId: product._id,
          quantity: 1,
          price: product.price,
        },
        { headers: { Authorization: token } }
      );

      dispatch(addToCart(item));
      Swal.fire({
        title: "Added to Cart!",
        text: `${product.name} has been added to your cart.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log("Error adding item to cart:", error);
      Swal.fire({
        title: "Error",
        text: "Could not add the product to the cart. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="product__item">
          <div
            class="product__item__pic set-bg"
            style={{
              backgroundImage: `url(${imageUrl}/${product.image})`,
            }}
          ></div>
          <div class="product__item__text">
            <h6>{product.name}</h6>
            <a
              href=""
              class="add-cart"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default anchor behavior
                addItemToCart(); // Call the add-to-cart function
              }}
            >
              + Add To Cart
            </a>
            <div class="rating">
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star-o"></i>
              <i class="fa fa-star-o"></i>
            </div>
            <h5>₹{product.price}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
