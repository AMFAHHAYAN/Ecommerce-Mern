import { resetCartState } from "./CartSlice";
import { resetLoginData } from "./LoginUserSlice";
import { resetAdminState } from "./AdminSlice";

const resetAllStates = () => (dispatch) => {
  dispatch(resetLoginData());
  dispatch(resetCartState());
  dispatch(resetAdminState()); 
};

export default resetAllStates;
