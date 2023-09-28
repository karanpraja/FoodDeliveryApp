import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import React,{useState,useEffect} from 'react';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Gulabjamun',
//     description: ' Indian dessert of fried dough balls that are soaked in a sweet, sticky sugar syrup',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Kaju Katli ',
//     description: 'cashew slice',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Besan Ladoo',
//     description: 'Roasted Gram Flour Balls',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Shrikhand ',
//     description: 'Assorted Silky Smooth Yogurt',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals,setMeals]=useState([])
  const [isLoading,setIsLoading]=useState(true)
  const [error,setError]=useState()
  useEffect(()=>{

      const fetchMeals=async ()=>{
  const response=await fetch('https://fooddelivery-96f6e-default-rtdb.firebaseio.com/meals.json')
  if(!response.ok){
    throw new Error("Something went wrong!!")
      }
  const responseData=await response.json()  
  let LoadedMeals=[]
  for(const i in responseData)//where i=1,2,3....(no. of elements)
  {
    LoadedMeals.push({
      id:i,
      name:responseData[i].name,//responeseData[1]=m1
      description:responseData[i].description,
      price:responseData[i].price
    })
  }
  setMeals(LoadedMeals)
  setIsLoading(false)
      }
       fetchMeals().catch((error)=>{
        setIsLoading(false)
        setError(error.message)//please use correct keywords!!!f
       })
     
    }
    
  )
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if(isLoading){
    return(
      <section style={{color:'red',textAlign:'center'}}>
        <h1 >...Loading</h1>
      </section>
    )
  }
  if(error){
    return(
      <section style={{color:'red',textAlign:'center'}}>
        <h1>{error}</h1>
      </section>
    )
  }

  return (
    <section className={classes.meals}>  
       <Card><ul>{mealsList}</ul></Card>
    </section>
  );
};

export default AvailableMeals;
