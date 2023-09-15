import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Gulabjamun',
    description: ' Indian dessert of fried dough balls that are soaked in a sweet, sticky sugar syrup',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Kaju Katli ',
    description: 'cashew slice',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Besan Ladoo',
    description: 'Roasted Gram Flour Balls',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Shrikhand ',
    description: 'Assorted Silky Smooth Yogurt',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
