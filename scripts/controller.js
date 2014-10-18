(function() {
  // storage items
  var statement = "",
      rawStatement = "",
      memory = {};

  // initialize the calculator
  initializeCalculator();

  // functions
  function initializeCalculator() {
    var btns = document.getElementsByClassName('btn');
    var clickSound = document.getElementById('click-sound')
    Array.prototype.forEach.call(btns, function(btn) {
      btn.addEventListener('click', function(e) {
        clickSound.play();
        if (btn.className.indexOf('btn-operand') > -1) {

        } else if (btn.className.indexOf('btn-operator') > -1) {
          var usedOperator = document.getElementsByClassName('selected-operator');
          if (usedOperator.length > 0) {
            usedOperator[0].className = usedOperator[0].className.substring(0, usedOperator[0].className.indexOf('selected-operator'));
          }
          btn.className = btn.className + ' selected-operator';
          console.log(btn.className);
        } else if (btn.id == 'btn-equals') {
          document.getElementsByClassNames
        }
      });
    });
  }
})();
