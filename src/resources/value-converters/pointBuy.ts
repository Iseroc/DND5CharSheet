export class PointBuyValueConverter {
  toView(array) {
    let points = 0;
    for(let stat of array) {
      points += stat.baseValue - 8;
      if(stat.baseValue > 13)
        points += stat.baseValue - 13;
    }
    return points;
  }
}
