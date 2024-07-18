import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const { isLoading } = useSelector(
    (store) => store.cart
  );

  const { isOpen } = useSelector( store => store.modal)

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App; 
