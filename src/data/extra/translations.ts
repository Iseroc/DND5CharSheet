import {StatEnums, SkillEnums} from './enums';

export class Translations {
  constructor() {
    this.init();
  }

  statStrings = new Map();
  skillStrings = new Map();

  private init() {
    this.initStatStrings();
    this.initSkillStrings();
  }

  private initStatStrings() {
    this.statStrings.set(StatEnums.STR, 'Strength');
    this.statStrings.set(StatEnums.DEX, 'Dexterity');
    this.statStrings.set(StatEnums.CON, 'Constitution');
    this.statStrings.set(StatEnums.INT, 'Intelligence');
    this.statStrings.set(StatEnums.WIS, 'Wisdom');
    this.statStrings.set(StatEnums.CHA, 'Charisma');
  }

  private initSkillStrings() {
    this.skillStrings.set(SkillEnums.ACROBATICS, 'Acrobatics');
    this.skillStrings.set(SkillEnums.ANIMALHANDLING, 'Animal Handling');
    this.skillStrings.set(SkillEnums.ARCANA, 'Arcana');
    this.skillStrings.set(SkillEnums.ATHLETICS, 'Athletics');
    this.skillStrings.set(SkillEnums.DECEPTION, 'Deception');
    this.skillStrings.set(SkillEnums.HISTORY, 'History');
    this.skillStrings.set(SkillEnums.INSIGHT, 'Insight');
    this.skillStrings.set(SkillEnums.INTIMIDATION, 'Intimidation');
    this.skillStrings.set(SkillEnums.INVESTIGATION, 'Investigation');
    this.skillStrings.set(SkillEnums.MEDICINE, 'Medicine');
    this.skillStrings.set(SkillEnums.NATURE, 'Nature');
    this.skillStrings.set(SkillEnums.PERCEPTION, 'Perception');
    this.skillStrings.set(SkillEnums.PERFORMANCE, 'Performance');
    this.skillStrings.set(SkillEnums.PERSUASION, 'Persuasion');
    this.skillStrings.set(SkillEnums.RELIGION, 'Religion');
    this.skillStrings.set(SkillEnums.SLEIGHTOFHAND, 'Sleight of Hand');
    this.skillStrings.set(SkillEnums.STEALTH, 'Stealth');
    this.skillStrings.set(SkillEnums.SURVIVAL, 'Survival');
  }

  translateStat(stat: StatEnums): string {
    return this.statStrings.get(stat);
  }

  translateSkill(skill: SkillEnums): string {
    return this.skillStrings.get(skill);
  }
}
