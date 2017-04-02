export class StatModifierValueConverter {
  toView(value) {
    var mod = Math.floor((value - 10) / 2);
    if(mod > 0) return '+' + mod;
    return mod;
  }
}
