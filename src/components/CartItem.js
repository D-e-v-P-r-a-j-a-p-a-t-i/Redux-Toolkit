import React from 'react';
import { ChevronDown, ChevronUp } from '../icons';
import { useDispatch } from 'react-redux';
import { decreaseQnty, increaseQnty, removeItem } from '../features/cart/cartSlice';

const CartItem = ({ id, img, title, price, qnty }) => {

  const dispatch = useDispatch();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        {/* remove button */}
        <button className='remove-btn' onClick={() => {dispatch(removeItem(id))}}>remove</button>
      </div>
      <div>
        {/* increase amount */}
        <button className='amount-btn' onClick={() => {dispatch(increaseQnty(id))}}>
          <ChevronUp />
        </button>
        {/* amount */}
        <p className='amount'>{qnty}</p>
        {/* decrease amount */}
        <button className='amount-btn' onClick={() => {dispatch(decreaseQnty(id))}}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;