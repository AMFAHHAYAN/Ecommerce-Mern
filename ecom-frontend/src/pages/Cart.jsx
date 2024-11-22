import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import apiClient from "../apiClient";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  removeProduct,
} from "../app/reducers/CartSlice";
import { Link } from "react-router-dom";

const imageUrl = import.meta.env.VITE_IMAGE_URL;

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, totalAmmount } = useSelector((state) => state.CartSlice);
  const { userId, token } = useSelector((state) => state.loggedInData);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await apiClient.get(`/cart/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        dispatch(fetchCart(response.data));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [dispatch, userId]);

  const deleteItem = async (productId) => {
    try {
      await apiClient.delete(`/delete-item`, {
        params: { id: userId, productId },
        headers: { Authorization: token },
      });
      dispatch(removeProduct(productId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const increaseQuantity = async (product) => {
    try {
      await apiClient.post(
        `/add-to-cart`,
        {
          id: userId,
          productId: product.productId,
          quantity: 1,
          price: product.price,
        },
        { headers: { Authorization: token } }
      );
      dispatch(addToCart({ ...product, quantity: 1 }));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const decreaseQuantity = async (product) => {
    try {
      await apiClient.patch(
        `/dec-item`,
        { id: userId, productId: product.productId },
        { headers: { Authorization: token } }
      );
      dispatch(removeFromCart(product));
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Swal.fire("Cart is empty", "Please add items to proceed.", "error");
      return;
    }
    try {
      const items = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      await apiClient.post(
        `/order`,
        { userId: userId, items, totalAmount: totalAmmount },
        { headers: { Authorization: token } }
      );
      Swal.fire({
        title: "Ordcer Plaed!",
        text: "Your order has been placed successfully. Check it in 'My Orders'.",
        icon: "success",
        confirmButtonText: "Go to My Orders",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to My Orders page
          window.location.href = "/my-order";
        }
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire("Error", "Failed to create order. Please try again.", "error");
    }
  };

  const deleteAllQ = async () => {
    if (cart.length === 0) {
      alert("No items in cart. Please add items to proceed.");
      return;
    }
    try {
      await apiClient.delete(`/delete-cart?userId=${userId}`, {
        headers: { Authorization: token },
      });
      dispatch(fetchCart([]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-700">
          Shopping Cart
        </h2>
        <section class="shopping-cart spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      cart.map((item, index) => (
                        <tr key={index}>
                          <td class="product__cart__item">
                            <div class="product__cart__item__pic">
                              <img src={`${imageUrl}/${item.image}`} alt="" />
                            </div>
                            <div class="product__cart__item__text">
                              <h6>{item.name}</h6>
                              <h5> ₹{item.price}</h5>
                            </div>
                          </td>
                          <td class="quantity__item">
                            <div class="quantity">
                              <div class="pro-qty-2">
                                <button
                                  onClick={() => decreaseQuantity(item)}
                                  className="bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700 transition"
                                >
                                  -
                                </button>
                                <span className="text-lg font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => increaseQuantity(item)}
                                  className="bg-green-600 text-white px-2 py-1 rounded-full hover:bg-green-700 transition"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td class="cart__close">
                            <a
                              href="#"
                              onClick={() => deleteItem(item.productId)}
                            >
                              <i class="fa fa-close"></i>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-4 px-6 text-center text-gray-500"
                        >
                          Your cart is empty.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <div class="continue__btn">
                    <a href="/products">Continue Shopping</a>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <div class="continue__btn update__btn">
                    <a href="#" onClick={deleteAllQ}>
                      <i class="fa fa-spinner"></i> Clear cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cart__discount">
                <h6>Discount codes</h6>
                <form action="#">
                  <input type="text" placeholder="Coupon code" />
                  <button type="submit">Apply</button>
                </form>
              </div>
              <div class="cart__total">
                <h6>Cart total</h6>
                <ul>
                  <li>
                    Subtotal <span>₹{totalAmmount.toFixed(2)}</span>
                  </li>
                  <li>
                    Total <span>₹{totalAmmount.toFixed(2)}</span>
                  </li>
                </ul>
                <a href="#" class="primary-btn" onClick={handleCheckout}>
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>

    </>
  );
};

export default Cart;
