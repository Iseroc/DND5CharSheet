import {ViewEngineHooks} from 'aurelia-framework';

export enum StatEnums {
  STR = 1,
  DEX = 2,
  CON = 3,
  INT = 4,
  WIS = 5,
  CHA = 6,
}

export enum SkillEnums {
  ACROBATICS = 11,
  ANIMALHANDLING = 12,
  ARCANA = 13,
  ATHLETICS = 14,
  DECEPTION = 15,
  HISTORY = 16,
  INSIGHT = 17,
  INTIMIDATION = 18,
  INVESTIGATION = 19,
  MEDICINE = 20,
  NATURE = 21,
  PERCEPTION = 22,
  PERFORMANCE = 23,
  PERSUASION = 24,
  RELIGION = 25,
  SLEIGHTOFHAND = 26,
  STEALTH = 27,
  SURVIVAL = 28,
}

// Make SkillEnums bindable, with only the values represented in the array
export class CountryViewEngineHooks implements ViewEngineHooks {
  beforeBind(view) {
    view.overrideContext.SkillEnums = Object.keys(SkillEnums).map(k => SkillEnums[k]).filter(v => typeof v === "number") as number[];
  }
}

export var SkillStats = new Map();
SkillStats.set(SkillEnums.ACROBATICS, StatEnums.DEX);
SkillStats.set(SkillEnums.ANIMALHANDLING, StatEnums.WIS);
SkillStats.set(SkillEnums.ARCANA, StatEnums.INT);
SkillStats.set(SkillEnums.ATHLETICS, StatEnums.STR);
SkillStats.set(SkillEnums.DECEPTION, StatEnums.CHA);
SkillStats.set(SkillEnums.HISTORY, StatEnums.INT);
SkillStats.set(SkillEnums.INSIGHT, StatEnums.WIS);
SkillStats.set(SkillEnums.INTIMIDATION, StatEnums.CHA);
SkillStats.set(SkillEnums.INVESTIGATION, StatEnums.INT);
SkillStats.set(SkillEnums.MEDICINE, StatEnums.WIS);
SkillStats.set(SkillEnums.NATURE, StatEnums.INT);
SkillStats.set(SkillEnums.PERCEPTION, StatEnums.WIS);
SkillStats.set(SkillEnums.PERFORMANCE, StatEnums.CHA);
SkillStats.set(SkillEnums.PERSUASION, StatEnums.CHA);
SkillStats.set(SkillEnums.RELIGION, StatEnums.INT);
SkillStats.set(SkillEnums.SLEIGHTOFHAND, StatEnums.DEX);
SkillStats.set(SkillEnums.STEALTH, StatEnums.DEX);
SkillStats.set(SkillEnums.SURVIVAL, StatEnums.WIS);
