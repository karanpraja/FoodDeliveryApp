import { useContext,useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/CartContext';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [buttonIsHighlighted,setButtonIsHighlighted]=useState(false)
  const bclasses=`${classes.button} ${buttonIsHighlighted?classes.bump:''}`
  
  const {items}=cartCtx;
useEffect(()=>{
  if(items.length===0)
  {return}
setButtonIsHighlighted(true)

setTimeout(()=>{
  setButtonIsHighlighted(false)
},300)
// return ()=>{const cT=
//   clearTimeout(cT)
// }
},[items])

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={bclasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.name}>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
