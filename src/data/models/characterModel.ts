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

  statModifier(statKey: StatEnums): number {
    if(this.stats.has(statKey)) {
      return Math.floor((this.stats.get(statKey) - 10) / 2);
    }
    return -1000;
  }

  // skill profiencies list
  skills: SkillEnums[] = [];
  expertises: SkillEnums[] = [];

  // other profiencies list
  profiencies: Profiency[] = [];

  // traits and features list
  traits: TraitModel[] = [];
}

export class LevelModel {
  constructor(public characterClass: string, public hd: number) { }
}
