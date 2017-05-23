export class NumberValueConverter {
  toView(value) {
    return value;
  }
  fromView(value) {
    return parseInt(value);
  }
}
