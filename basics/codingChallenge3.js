bills = [124, 48, 268];
tips = [];

for (i = 0; i < bills.length; i++) {
  tips.push(tip(bills[i]));
  bills[i] += tips[i];
}

console.log(tips);
console.log(bills);

function tip(bill) {
  var tip;
  if (bill < 50) {
    tip = bill * 0.2;
  } else if (bill <= 200) {
    tip = bill * 0.15;
  } else {
    tip = bill * 0.1;
  }
  return tip;
}
