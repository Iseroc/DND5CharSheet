export class NumberValueConverter {
  toView(value) {
    return value;
  }
  fromView(value) {
    let parsed = parseInt(value);
    return parsed && parsed != NaN ? parsed : 0;
  }
}
