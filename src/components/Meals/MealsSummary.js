import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Indian Desserts, Delivered To You</h2>
      <p>
        Choose your favorite dessert from our broad selection of available Indian desserts
        and enjoy at home.
      </p>
      <p>
        All our desserts are made with high-quality ingredients from India, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
