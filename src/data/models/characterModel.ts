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

  level: number = 1;

  get profiencyBonus() {
    return Math.floor((this.level - 1) / 4) + 2;
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
