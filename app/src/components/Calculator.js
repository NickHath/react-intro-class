import React, { Component } from 'react'
import './Calculator.css'
import calculatorImg from './calculator.png'

// e is short for event info!
// whenever user does anything, JS captures data
// most other methods on are meh... but
// e = event info
// target = what they interacted with
// data they put in

class Calculator extends Component {
    constructor() {
      super();
      this.state = {
        header: "Nick's Calculator",
          display: "",
          newNum: "0",
          prevNum: "",
          operator: "",
          memory: {
            secondNumSet: false,
            secondNum: ""
          },
          result: ""
      }
    }

    updateHeader(e) {
      var value = e.target.value;
      this.setState({ 
          header: value 
      });
    }


    updateDisplay() {
      var newDisplay; 
      // if we have a result, display it
      if (this.state.result) {
        newDisplay = this.state.result.toString();
      } // else set display to prevNum + operator + newNum 
      else { 
        // if length of display is >= 13, don't update display
        newDisplay = (this.state.display.length < 13 ? this.state.prevNum  
                      + this.state.operator + this.state.newNum : this.state.display);          
      }
      this.setState({
        display: newDisplay
      })
    }


    inputNum(num) {
      // newNum will be the new input number
      // prevNum will be what was contained in newNum 
      // before update
      this.setState({
        newNum: num
      })
      
      // set secondNum to the value in newNum
      // only run this once (when we have 2 nums and an operator, and when
      // the secondNumSet flag is false)
      if(this.state.prevNum && this.state.operator && this.state.newNum 
          && !this.state.memory.secondNumSet) {
        this.setState({
          memory: {
            secondNum: this.state.newNum,
            secondNumSet: true
          }
        })      
      }
      this.updateDisplay();
    }

    inputOperator(op) {
      this.setState({
        operator: op,
        prevNum: this.state.newNum
      })
      this.updateDisplay();
    }
    
    calculate() {
      var firstNum, secondNum, result;

      if (this.state.memory.secondNumSet) {
        firstNum = parseInt(this.state.result);
        secondNum = parseInt(this.state.memory.secondNum);
      } else {
        firstNum = parseInt(this.state.prevNum)
        secondNum = parseInt(this.state.newNum);
      }

      switch(this.state.operator) {
          case "*":
              result = firstNum * secondNum;
              break;
          case "/":
              result = firstNum / secondNum;
              break;
          case "+":
              result = firstNum + secondNum;
              break;
          case "-":
              result = firstNum - secondNum;
              break;
      }
      this.setState({
          result: result.toString()
      })
      this.updateDisplay();
    }

    clearDisplay() {
      this.setState({
        display: "",
        newNum: "0",
        prevNum: "",
        operator: "",
        memory: {
          secondNumSet: false,
          secondNum: ""
        },
        result: ""
      })
      this.updateDisplay();
    }

    // TWO FLOWS: pull things from state, update state; I/O
    // setState re-renders,  which sets off flow one (pulling things from state to display)

    render() {
      return (
        <div id="calculator-container">
          <input id="header-input"
                 onChange={ (e) => this.updateHeader(e) }/>
          <h1 id="header"> { this.state.header } </h1>
          <img className="remove-highlight" src={calculatorImg} alt="calculator" />
          <div id="calculator-mask" className="remove-highlight">
            <div className="output">
              <span className="total">{ this.state.display }</span>
            </div>
  
            <div className="btn clear" onClick={ (e)=> this.clearDisplay() }></div>
  
            <div className="btn zero" onClick={ (e)=> this.inputNum("0")}></div>
            <div className="btn one" onClick={ (e)=> this.inputNum("1")}></div>
            <div className="btn two" onClick={ (e)=> this.inputNum("2")}></div>
            <div className="btn three" onClick={ (e)=> this.inputNum("3")}></div>
            <div className="btn four" onClick={ (e)=> this.inputNum("4")}></div>
            <div className="btn five" onClick={ (e)=> this.inputNum("5")}></div>
            <div className="btn six" onClick={ (e)=> this.inputNum("6")}></div>
            <div className="btn seven" onClick={ (e)=> this.inputNum("7")}></div>
            <div className="btn eight" onClick={ (e)=> this.inputNum("8")}></div>
            <div className="btn nine" onClick={ (e)=> this.inputNum("9")}></div>
  
            <div className="btn equal" onClick={ (e)=> this.calculate() }></div>
            <div className="btn multiply" onClick={ (e)=> this.inputOperator("*") }></div>
            <div className="btn divide" onClick={ (e)=> this.inputOperator("/") }></div>
            <div className="btn subtract" onClick={ (e)=> this.inputOperator("-") }></div>
            <div className="btn add" onClick={ (e)=> this.inputOperator("+") }></div>
          </div>
        </div>
      ) 
    }
}

// need to export to make this public (i.e., available to other files)
export default Calculator