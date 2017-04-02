import {ViewEngineHooks} from 'aurelia-framework';

export enum StatEnums {
  STR,
  DEX,
  CON,
  INT,
  WIS,
  CHA,
}

export enum SkillEnums {
  ACROBATICS,
  ANIMALHANDLING,
  ARCANA,
  ATHLETICS,
  DECEPTION,
  HISTORY,
  INSIGHT,
  INTIMIDATION,
  INVESTIGATION,
  MEDICINE,
  NATURE,
  PERCEPTION,
  PERFORMANCE,
  PERSUASION,
  RELIGION,
  SLEIGHTOFHAND,
  STEALTH,
  SURVIVAL,
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
