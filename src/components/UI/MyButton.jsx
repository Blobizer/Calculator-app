import classes from './MyButton.module.css';

const MyButton =({children, ...props}) => {

  
    return (
       <button {...props} className={classes.button}>
          {children}
       </button>
    );
  };
  
  export default MyButton;