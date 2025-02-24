import React, { useState } from 'react';
import "./index.css";

const Calculator = () => {
  //intialize all states to display, equation, result and history
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);

  //function the handle number button clicks
  const handleNumber = (number) => {
    if (hasResult) {
       // Start fresh if a result was previously displayed
      setDisplay(number);
      setEquation(number);
      setHasResult(false);
    } else {
      if (display === "0") {
        // Replace "0" with the new number
        setDisplay(number);
        setEquation(number);
      } else {
        // Append the number to the display and equation
        setDisplay(display + number);
        setEquation(equation + number);
      }
    }
  };
// Function to handle operator button clicks
  const handleOperator = (operator) => {
    const lastChar = equation.trim().slice(-1);
    const operators = ['+', '-', '*', '/'];
    const displayOperator = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
    
    if (hasResult) {
      // Start a new equation using the last result
      const newEquation = display + ' ' + operator + ' ';
      setEquation(newEquation);
      setDisplay(display + ' ' + displayOperator + ' ');
      setHasResult(false);
    } else {
      if (operators.includes(lastChar)) {
         // Replace last operator with new one if already present
        const newEquation = equation.slice(0, -3) + ' ' + operator + ' ';
        setEquation(newEquation);
        setDisplay(display.slice(0, -3) + ' ' + displayOperator + ' ');
      } else {
        // Append the operator to the equation
        const newEquation = equation + ' ' + operator + ' ';
        setEquation(newEquation);
        setDisplay(display + ' ' + displayOperator + ' ');
      }
    }
  };
// Function to evaluate the equation and display result
  const handleEqual = () => {
    try {
      const result = eval(equation).toString(); // Compute the result
      setDisplay(result);
      setEquation(result);
      setHasResult(true);
    } catch (error) {
      setDisplay('Error');// Handle invalid input
      setEquation('');
      setHasResult(true);
    }
  };

  // Function to clear the display and equation
  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
  };
  // Function to allow manual input changes (optional feature)
  const handleChange = (e) => {
    setDisplay(e.target.value);
    setEquation(e.target.value);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <input 
            type="text" 
            className="display-text" 
            value={display} 
            onChange={handleChange} 
          />
        </div>
        
        <div className="buttons-grid">
          <button onClick={handleClear} className="button clear-button">C</button>
          <button onClick={() => handleOperator('/')} className="button operator">/</button>
          <button onClick={() => handleOperator('*')} className="button operator">×</button>
          
          <button onClick={() => handleNumber('7')} className="button">7</button>
          <button onClick={() => handleNumber('8')} className="button">8</button>
          <button onClick={() => handleNumber('9')} className="button">9</button>
          <button onClick={() => handleOperator('-')} className="button operator">-</button>
          
          <button onClick={() => handleNumber('4')} className="button">4</button>
          <button onClick={() => handleNumber('5')} className="button">5</button>
          <button onClick={() => handleNumber('6')} className="button">6</button>
          <button onClick={() => handleOperator('+')} className="button operator">+</button>
          
          <button onClick={() => handleNumber('1')} className="button">1</button>
          <button onClick={() => handleNumber('2')} className="button">2</button>
          <button onClick={() => handleNumber('3')} className="button">3</button>
          <button onClick={handleEqual} className="button equals">=</button>
          
          <button onClick={() => handleNumber('0')} className="button zero">0</button>
          <button onClick={() => handleNumber('.')} className="button">.</button>
        </div>
      </div>
      
      
    </div>
  );
};

export default Calculator;
