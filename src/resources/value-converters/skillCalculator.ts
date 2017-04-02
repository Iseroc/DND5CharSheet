export class SkillCalculatorValueConverter {
  toView(profiencyBonus: number, baseStat: number, profiency: boolean, expertise: boolean) {
    var statBonus = Math.floor((baseStat - 10) / 2);
    var skill = statBonus;
    if(profiency) skill += profiencyBonus;
    if(expertise) skill += profiencyBonus;
    if(skill > 0) return "+" + skill;
    return skill;
  }
}
