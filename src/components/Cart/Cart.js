import Modal from '../UI/Modal';
import React,{useContext,useState} from 'react';
import classes from './Cart.module.css';
import CartContext from '../../store/CartContext';
import CartItem from './CartItem'
import Checkout from './Checkout';

const Cart = (props) => {
  const crtCtx=useContext(CartContext)
  const totalAmount=crtCtx.totalAmount.toFixed(2)
  const hasItems=crtCtx.items.length>0
  const [OnConfirm,SetOnConfirm]=useState(false)
  const [parsedData,setParsedData]=useState()
  const [sendingData,setSendingData]=useState(false)
  const [isOrderPlaced,setIsOrderPlaced]=useState(false)
  
  const onConfirmHandler=(data)=>{
    // event.preventDefault()
    setParsedData(data)
    SetOnConfirm(true)
   }
  const cartItemAddHandler=(item)=>{
crtCtx.addItem(item)
  }
  const cartItemRemoveHandler=(id)=>{
crtCtx.removeItem(id)
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {crtCtx.items.map((item) => (
        <CartItem 
        key={item.id}
        name={item.name}
        amount={item.amount} 
        price={item.price}
        onAdd={cartItemAddHandler.bind(null,item)}
        onRemove={cartItemRemoveHandler.bind(null,item.id)}/>
      ))}

    </ul>
  );

 let TAmount=Boolean(crtCtx.totalAmount>0);

 const onOrderHandler=()=>{
 async function sendData(data){
  setSendingData(true)
  const response= await fetch("https://fooddelivery-96f6e-default-rtdb.firebaseio.com/Dummy_data.json",{
    method:"POST",
    body:JSON.stringify(data),//firebase always inputs data in json format
    headers:{
  "Content-Type":'application/json'
    }
  })
  if(response.ok){
    console.log("Data sent successfully!")
  }
  setSendingData(false)
  setIsOrderPlaced(true)
  const responseData= await response.json()
  console.log(responseData)
  crtCtx.orderItem()
      }
  // const data=parsedData
  sendData(parsedData)
    }
    const cart=(<React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {TAmount&&<Checkout onConfirm={onConfirmHandler}/>}
      <div className={classes.actions}>

        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems&&OnConfirm&&<button className={classes.button} onClick={onOrderHandler}>Order</button>}
      </div>
    </React.Fragment>)
    const orderPlaced=<div className={classes.actions} style={{textAlign:'center'}}><p>Order placed successfully!!</p>
    <button className={classes.button} onClick={props.onClose}>
         Close
       </button>
    </div>


  return (
    <Modal onClose={props.onClose}>
     {!isOrderPlaced&&!sendingData&&cart}
     {sendingData&&!isOrderPlaced&&<p>Please wait, we are placing order!</p>}
     {isOrderPlaced&&!sendingData&&orderPlaced} 
    </Modal>
  );
};

export default Cart;
