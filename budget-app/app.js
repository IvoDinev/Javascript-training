var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        totalBudget: 0,
        percentage: -1
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //create new item based the type
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }

            // push into data str
            data.allItems[type].push(newItem);

            //return the new element;
            return newItem;
        },

        calculateBudget: function () {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate income - expenses
            data.totalBudget = data.totals.inc - data.totals.exp;

            //calculate percentage income to expenses
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else {
                data.percentage = -1;
            }
        },

        getBudget: function () {
            return data;
        },
    };
})();

//UI controller
var UIController = (function () {

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
        budgetIncome: ".budget__income--value",
        budgetExpenses: ".budget__expenses--value",
        expensesPercentage: ".budget__expenses--percentage",
        totalBudgetContainer: ".budget__value"
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            //Create HTML string with placeholder text
            var html, newHtml, container;
            if (type === "inc") {
                container = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "exp") {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                container = DOMstrings.expenseContainer;
            }
            //Replace the placeholder with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            //Insert HTML into the DOM
            document.querySelector(container).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach((current) => {
                current.value = '';
            });
            fieldsArray[0].focus();
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        displayNewBudget: function (data) {
            document.querySelector(DOMstrings.budgetIncome).textContent = data.totals.inc;
            document.querySelector(DOMstrings.budgetExpenses).textContent = data.totals.exp;
            document.querySelector(DOMstrings.totalBudgetContainer).textContent = data.totalBudget;
            if (data.percentage > 0) {
                document.querySelector(DOMstrings.expensesPercentage).textContent = data.percentage + '%';
            } else {
                document.querySelector(DOMstrings.expensesPercentage).textContent = '--';
            }
        }
    };
})();

//Global app controller
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function () {
        //1. Calculate Budget
        budgetCtrl.calculateBudget();
        //2. Return the budget
        var budgetData = budgetCtrl.getBudget();
        //3. Display the budget on the UI
        UICtrl.displayNewBudget(budgetData);
    };

    var ctrlAddItem = function () {
        var input, newItem;

        //1. Get the field input data
        input = UICtrl.getInput();
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the item to UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear the description and value input fields.
            UICtrl.clearFields();

            //5. Calculate and update Budget
            updateBudget();
        }
    };

    return {
        init: function () {
            console.log("Start");
            UICtrl.displayNewBudget(budgetCtrl.getBudget());
            setupEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();
