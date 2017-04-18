import {SkillModel} from './components/skillModel';
import {TraitModel} from './components/traitModel';
import {Profiency} from './components/profiency';
import {StatEnums, SkillEnums} from '../extra/enums';

export class CharacterModel {
  constructor() {
    this.stats.set(StatEnums.STR, 10);
    this.stats.set(StatEnums.DEX, 10);
    this.stats.set(StatEnums.CON, 10);
    this.stats.set(StatEnums.INT, 10);
    this.stats.set(StatEnums.WIS, 10);
    this.stats.set(StatEnums.CHA, 10);
  }

  name: string = '';
  levels: LevelModel[] = [];

  get totalLevel() {
    return Math.max(this.levels.length, 1);
  }

  get profiencyBonus() {
    return Math.floor((this.totalLevel - 1) / 4) + 2;
  }

  get maxHP() {
    let hp = 0;

    if(this.levels.length > 0) {
      hp = this.levels[0].hd / 2 - 1;
      for(let level of this.levels) {
        hp += level.hd / 2 + 1 + this.statModifier(StatEnums.CON);
      }
    }

    return hp;
  }

  stats = new Map<StatEnums, number>();
  getStat(stat:StatEnums): number {
    return this.stats.get(stat);
  }
  setStat(stat:StatEnums, value:number) {
    this.stats.set(stat, value);
  }

  statModifier(statKey: StatEnums): number {
    if(this.stats.has(statKey)) {
      return Math.floor((this.stats.get(statKey) - 10) / 2);
    }
    return -1000;
  }
  
  // skill profiencies list
  skills: SkillEnums[] = [];
  expertises: SkillEnums[] = [];

  addSkill(skill:SkillEnums) {
    if(!this.skills.includes(skill)) {
      this.skills.push(skill);
    }
  }
  removeSkill(skill:SkillEnums) {
    if(this.skills.includes(skill)) {
      this.skills.splice(this.skills.indexOf(skill), 1);
    }
  }

  // other profiencies list
  profiencies: Profiency[] = [];

  addProfiency(prof: Profiency) {
    if(!this.profiencies.includes(prof)) {
      this.profiencies.push(prof);
    }
  }
  removeProfiency(prof: Profiency) {
    if(this.profiencies.includes(prof)) {
      this.profiencies.splice(this.profiencies.indexOf(prof), 1);
    }
  }

  // traits and features list
  traits: TraitModel[] = [];

  addTrait(trait:TraitModel) {
    if(!this.traits.includes(trait)) {
      this.traits.push(trait);
    }
  }
  removeTrait(trait:TraitModel) {
    if(this.traits.includes(trait)) {
      this.traits.splice(this.traits.indexOf(trait), 1);
    }
  }
}

export class LevelModel {
  constructor(public characterClass: string, public hd: number) { }
}
