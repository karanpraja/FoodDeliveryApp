import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import React,{useContext} from 'react';
import CartContext from '../../../store/CartContext';

const MealItem = (props) => {
  const ctx=useContext(CartContext)
  const price = `$${props.price}`;

  const addAmountHandler=(amount)=>{
    ctx.addItem({
      id:props.id,
      amount:amount,
      name:props.name,
      price:props.price
    })
  }
  
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddAmount={addAmountHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
