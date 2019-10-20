// var johnTeamAvg;
// var mikeTeamAvg;
// var maryTeamAvg;

johnTeamAvg = -3 / 3;
mikeTeamAvg = 3 / 3;
maryTeamAvg = -3 / 3;

if (johnTeamAvg > mikeTeamAvg && johnTeamAvg > maryTeamAvg) {
  console.log("Winner John" + " " + johnTeamAvg);
} else if (mikeTeamAvg > johnTeamAvg && mikeTeamAvg > maryTeamAvg) {
  console.log("Winner Mike" + " " + mikeTeamAvg);
} else if (maryTeamAvg > johnTeamAvg && maryTeamAvg > mikeTeamAvg) {
  console.log("Winner Mary" + " " + maryTeamAvg);
} else {
  console.log("Draw");
}
