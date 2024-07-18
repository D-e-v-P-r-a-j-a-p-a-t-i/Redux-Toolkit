import { CartIcon, Testing } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { totalQnty } = useSelector((state) => state.cart);
  // console.log(useSelector((state) => console.log(state)))
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          {/* <Testing /> */}
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{totalQnty}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
