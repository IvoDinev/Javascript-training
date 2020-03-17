var budgetController = (function() {
  
})();

var UIController = (function() {
    //Some Code
})();

var controller = (function(budgetCtrl, UICtrl) {
    document.querySelector('.add__btn').addEventListener('click', function() {
        console.log('clicked')
    });
    
})(budgetController, UIController);
