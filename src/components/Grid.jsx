import MyButton from "./UI/MyButton.jsx"
import classes from '../styles/Grid.module.css'
import { useState } from "react";

function Grid() {
    const num = [1,2,3,4,5,6,7,8,9]
    const opers = ['+', '-', '*', '/']

    const [displayValue, setDisplayValue] = useState('0'); 
    const [prevValue, setPrevValue] = useState(null);
    const [operation, setOperation] = useState(null); 
    const [waitingForNewValue, setWaitingForNewValue] = useState(false); 

    const handleDigitClick = (digit) => {
      if (waitingForNewValue) {
        setDisplayValue(String(digit));
        setWaitingForNewValue(false);
      } else {
        setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
      }
    };
    
    const handleOperationClick = (op) => {
      if (operation && !waitingForNewValue) {
        const result = calculate(prevValue, parseFloat(displayValue), operation);
        setDisplayValue(String(result));
        setPrevValue(result);
      } else {
        setPrevValue(parseFloat(displayValue));
      }
      setOperation(op);
      setWaitingForNewValue(true);
    };
    
    const calculate = (a, b, op) => {
      switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error'; 
        default: return b;
      }
    };
    
    const handleEqualsClick = () => {
      if (operation && prevValue !== null) {
        const result = calculate(prevValue, parseFloat(displayValue), operation);
        setDisplayValue(String(result));
        setPrevValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
      }
    };
   
    const handleClearClick = () => {
      setDisplayValue('0');
      setPrevValue(null);
      setOperation(null);
      setWaitingForNewValue(false);
    };
      return (
         <>
        <div>{displayValue} </div>
        <div className={classes.container}>
          {num.map((digit, index) =>
            <MyButton  onClick={() => handleDigitClick(digit)} key={index+1}>{digit}</MyButton>
          )}
          {opers.map((op) =>
            <MyButton  onClick={() => handleOperationClick(op)} key={op}>{op}</MyButton>
          )}
          <MyButton onClick={() => handleEqualsClick()}>=</MyButton>
          <MyButton onClick={() => handleClearClick()}>C</MyButton>
        </div>
        
        
      </>
    )
  }
  
  export default Grid
  