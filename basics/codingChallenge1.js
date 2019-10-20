var johnsHeight = 1.69;
var johnsMass = 100;
var marksHeight = 1.73;
var marksMass = 90;

var marksBMIBiggerThanJohns = false;

johnsBMI = johnsMass / (johnsHeight * johnsHeight);
marksBMI = marksMass / (marksHeight * marksHeight);

if (marksBMI > johnsBMI) {
  marksBMIBiggerThanJohns = true;
}

console.log(
  "Is Marks BMI higher than Johns" + " " + this.marksBMIBiggerThanJohns
);
