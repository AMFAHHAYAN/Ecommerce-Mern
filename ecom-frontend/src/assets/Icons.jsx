import {
  FaEdit,
  FaEye,
  FaTrashAlt,
  FaLeaf,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { BsFillSearchHeartFill } from "react-icons/bs";

import { IoLogOut } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Icons = {
  LOGO: FaLeaf,
  SEARCH: BsFillSearchHeartFill,
  SHOPPING_CART: FaShoppingCart,
  USER_ICON: FaUserCircle,
  EDIT: FaEdit,
  EYE: FaEye,
  DELETE: FaTrashAlt,
  FACEBOOK: FaFacebook,
  TWITTER: FaTwitter,
  INSTAGRAM: FaInstagram,
  LINKEDIN: FaLinkedin,
  LOGOUT: IoLogOut,
  CART: AiOutlineShoppingCart,
};

export default Icons;
