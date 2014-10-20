(function() {
  // storage items
  var statement = "",
      rawStatement = "",
      operator = '',
      memory = {};

  // initialize the calculator
  initializeCalculator();

  // functions
  function initializeCalculator() {
    var btns = document.getElementsByClassName('btn'),
        clickSound = document.getElementById('click-sound'),
        displayValue = document.getElementById('display-raw'),
        newOperand = true;

    Array.prototype.forEach.call(btns, function(btn) {
      btn.addEventListener('mousedown', function(e) {
        clickSound.play();
      });
      if (btn.className.indexOf('btn-operand') > -1) {
        btn.addEventListener('click', function(e) {
          var operand = this.childNodes[1].innerHTML;
          if (parseInt(displayValue.innerHTML) === 0 || newOperand) {
            displayValue.innerHTML = operand
            newOperand = false;
          } else {
            displayValue.innerHTML += operand;
          }
          statement += operand;
        });
      } else if (btn.className.indexOf('btn-operator') > -1) {
        btn.addEventListener('click', function(e) {
          var usedOperator = document.getElementsByClassName('selected-operator');
          resetOperators();
          btn.className = btn.className + ' selected-operator';
          console.log(btn.className);

          operator = this.childNodes[1].innerHTML;
          switch (operator) {
            case 'x':
              operator = '*';
              break;
            case '÷':
              operator = '/';
              break;
          }
          statement += operator;
          newOperand = true;
        });
      } else if (btn.id == 'btn-equals') {
        btn.addEventListener('click', function(e) {
          var ans = eval(statement);
          displayValue.innerHTML = ans;

          // reset stuff
          resetOperators();
          statement = "";
          newOperand = true;
        });
      }
    });
  }
  function resetOperators() {
    var usedOperator = document.getElementsByClassName('selected-operator');
    if (usedOperator.length > 0) {
      usedOperator[0].className = usedOperator[0].className.substring(0, usedOperator[0].className.indexOf('selected-operator'));
    }
  }
})();
