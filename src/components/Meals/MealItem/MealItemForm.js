import Input from '../../UI/Input';
import React,{useRef, useState} from 'react';
import classes from './MealItemForm.module.css';
const MealItemForm = (props) => {
 
  const [AmountIsValid,setAmountIsValid]=useState(true)
  const passedReferencevalue=useRef()
  const onSubmitHandler=(event)=>{
    event.preventDefault()
const val=passedReferencevalue.current.value
const enteredAmount=+val//converting string to a number
if(val.trim().length===0||enteredAmount<1||enteredAmount>5)
{
  setAmountIsValid(false)
  return
}
props.onAddAmount(enteredAmount)
  }


  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
          ref:(passedReferencevalue)
        }}
      />
      <button type='submit'>+ Add</button>
      {!AmountIsValid&&<p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
