import classes from './Checkout.module.css';
import React,{useRef, useState,useContext} from 'react';
import CartContext from '../../store/CartContext';
const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 6;
const Checkout = (props) => {
  const [showButtons,setShowButtons]=useState(true)
  const crtCtx=useContext(CartContext)
  const [inputFormIsValid,setInputFormIsValid]=useState({
    name:true,
    street:true,
    city:true,
    postalCode:true
  })
  
  const inputName=useRef()
  const inputStreet=useRef()
  const inputCity=useRef()
  const inputPostalCode=useRef()
  let enteredName
  let enteredStreet
    let enteredCity
 let enteredPostalCode
  const confirmHandler = (event) => {
  event.preventDefault();
   enteredName=inputName.current.value
   enteredStreet=inputStreet.current.value
   enteredCity=inputCity.current.value
   enteredPostalCode=inputPostalCode.current.value
const isenteredNameValid=!isEmpty(enteredName)
const isenteredStreetValid=!isEmpty(enteredStreet)
const isenteredCityValid=!isEmpty(enteredCity)
const isenteredPostalCodeValid=isFiveChars(enteredPostalCode)

  setInputFormIsValid({name:isenteredNameValid,
    street:isenteredStreetValid,
    city:isenteredCityValid,
    postalCode:isenteredPostalCodeValid})
 
    const isFormIsValid=isenteredNameValid&&isenteredCityValid&&isenteredPostalCodeValid&&isenteredStreetValid
    if(!isFormIsValid)
    {
      return
    }
    const meals=[]
    for(const key in crtCtx.items)
    {
      const i=crtCtx.items[key]
      meals.push({name:i.name,amount:i.amount,pricePerItem:"$"+i.price,totalPrice:"$"+i.amount*i.price})
    }
  
    const data={
      OrderedMeals:{meals,TAmount:"$"+crtCtx.totalAmount},
     user:{ enteredName,
    enteredStreet,
   enteredCity,
    enteredPostalCode}
   }
   props.onConfirm(data)
   setShowButtons(false)
    
};
const buttons= (<React.Fragment><div className={classes.actions}>
<button type='button' onClick={props.onCancel}>
  Cancel
</button>
<button  className={classes.submit} type='submit'>Confirm</button>
</div></React.Fragment>)

  return (<div>
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={inputName}   value={enteredName}/>
        {!inputFormIsValid.name&&<p>Please enter  name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={inputStreet} value={enteredStreet}/>
        {!inputFormIsValid.street&&<p>Please enter street name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='number' id='postal' ref={inputPostalCode} value={enteredPostalCode}/>
        {!inputFormIsValid.postalCode&&<p>Please enter correct postalCode!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={inputCity} value={enteredCity}/>
        {!inputFormIsValid.city&&<p>Please enter city name!</p>}
      </div>
     {showButtons&&buttons}
    </form>
  </div>
    
    
    
  );
};
export default Checkout;