(function() {
  // storage items
  var statement = "",
      displayValue = document.getElementById('display-raw'),
      clearedEntry = false,
      clearType = 'AC',
      displayingAnswer = false,
      answerNotDisplayedButInStatement = false,
      operator = '',
      history = [],
      operators = /[\*\+-\/]/,
      memory = [];

  function Expression(string) {
    this.string = string;
  }
  Expression.prototype.ans = function() {
    return eval(this.string);
  }

  // initialize the calculator. attaches event listeners to the buttons.
  initializeCalculator();

  // functions
  function initializeCalculator() {
    var btns = document.getElementsByClassName('btn'),
        clickSound = document.getElementById('click-sound'),
        newOperand = true;

    Array.prototype.forEach.call(btns, function(btn) {
      btn.addEventListener('mousedown', function(e) {
        clickSound.play();
      });
      // if the button is an operand
      if (btn.className.indexOf('btn-operand') > -1) {
        btn.addEventListener('click', function(e) {
          var operand = this.childNodes[1].innerHTML;
          if (newOperand || parseInt(displayValue.innerHTML) === 0) {
            displayValue.innerHTML = operand
            newOperand = false;
          } else {
            displayValue.innerHTML += operand;
          }
          // check if statement is the answer to the previous expression
          if (answerNotDisplayedButInStatement) {
            console.log('that boolean');
            statement = operand;
          } else if (displayingAnswer && !answerNotDisplayedButInStatement) {
            statement = operand;
          } else {
            statement += operand;
          }
          displayingAnswer = false;
          answerNotDisplayedButInStatement = false;
          console.log(statement);
          setClearButton();
        });
        // if the button is an operator
      } else if (btn.className.indexOf('btn-operator') > -1) {
        btn.addEventListener('click', function(e) {
          // no operators should be added to the statement if the statement is empty or if the previous
          // character in the statement is an operator
          if (statement.length > 0 && !operators.test(statement[statement.length - 1])) {
            var usedOperator = document.getElementsByClassName('selected-operator');
            resetOperator();
            btn.className = btn.className + ' selected-operator';

            operator = this.childNodes[1].innerHTML;
            // use proper multiplication and division operators
            switch (operator) {
              case 'x':
                operator = '*';
                break;
              case '÷':
                operator = '/';
                break;
            }
            // check to see if previous character in the statement is an operator,
            // if so, replace that operator with the new one
            var matchArray = statement.length > 0 ? statement[statement.length - 1].match(operators) : null;
            if (!(matchArray === null)) {
              statement = statement.replace(matchArray[0], operator);
            } else if (statement.match(operators)) { // check to see if there are operators already within the statement
              var ans = evaluateStatement();
              statement = "";
              statement = ans + operator;
            } else {
              statement += operator;
            }
            console.log(statement);
            newOperand = true;
            displayingAnswer = false;
            answerNotDisplayedButInStatement = false;
            setClearButton();
          }
        });
        // if the button is the equals button
      } else if (btn.id === 'btn-equals') {
        btn.addEventListener('click', function(e) {
          if (statement.length > 1) {
            var ans = evaluateStatement();

            // reset stuff
            resetOperator();
            statement = "";
            statement += ans;
            console.log(statement);
            newOperand = true;
            displayingAnswer = true;
          }
        });
        // if the button is the clear button
      } else if (btn.id === 'btn-clear') {
        btn.addEventListener('click', function(e) {
          if (clearType == 'AC') {
            history = [];
            statement = "";
            displayValue.innerHTML = 0;
          } else if (clearType == 'C') {
            // statement must not be empty for something to be cleared
            if (statement.length > 0) {
              if (operators.test(statement[statement.length - 1])) {
                resetOperator();
                statement = statement.substr(0, statement.length - 1);
              } else if (displayingAnswer) {
                displayValue.innerHTML = 0;
                answerNotDisplayedButInStatement = true;
                displayingAnswer = false;
              } else {
                displayValue.innerHTML = 0;
                statement = statement.replace(/[0-9]+$/, '');
              }
            }
            clearedEntry = true;
          }
          console.log(statement);
          setClearButton();
        });
      }
    });
  }

  // replace instances of pi in the statement and creates a new expression object
  // updates the display to the answer
  function evaluateStatement() {
    expression = new Expression(statement.replace(/\u03C0/g, '3.141592653'));
    history.push(expression);
    var ans = expression.ans();
    displayValue.innerHTML = ans;
    return ans;
  }
  // deselects the current operator
  function resetOperator() {
    var usedOperator = document.getElementsByClassName('selected-operator');
    if (usedOperator.length > 0) {
      usedOperator[0].className = usedOperator[0].className.substring(0, usedOperator[0].className.indexOf('selected-operator'));
    }
  }
  // determins what state the clear button should be in
  function setClearButton() {
    var btnClear = document.getElementById('btn-clear');
    if (statement.length === 0 || clearedEntry) {
      btnClear.childNodes[1].innerHTML = 'AC';
      clearType = 'AC';
      clearedEntry = false;
    } else {
      btnClear.childNodes[1].innerHTML = 'C';
      clearType = 'C';
    }
  }
})();
