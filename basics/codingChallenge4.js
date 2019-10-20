var john = {
  name: "John Smith",
  mass: 99,
  height: 1.99,
  calculateBMI: function() {
    return this.mass / (this.height * this.height);
  }
};
var mike = {
  name: "Mike Smart",
  mass: 80,
  height: 1.8,
  calculateBMI: function() {
    return this.mass / (this.height * this.height);
  }
};

john.bmi = john.calculateBMI();
mike.bmi = mike.calculateBMI();

if (john.bmi > mike.bmi) {
  console.log(john.name + " " + john.bmi);
} else if (john.bmi < mike.bmi) {
  console.log(mike.name + " " + mike.bmi);
} else {
  console.log("draw");
}
