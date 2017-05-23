import {TraitModel} from '../components/traitModel';
import {ProfiencyModel} from './profiencyModel';
import {SkillEnums, StatEnums} from '../../extra/enums';

export class CharacterModifyingElement {
  constructor() { }

  additionalSkillProfiencies: SkillEnums[] = [];
  additionalOtherProfiencies: ProfiencyModel[] = [];
  additionalTraits: TraitModel[] = [];
  setStats: SetStatModel[] = [];
  addToStats: AddToStatModel[] = [];
  baseAC: number;
  maxDexBonus: number;
  bonusAC: number;
  bonusAB: number;

  fillFromJSON(json) {
    if(json) {
      this.additionalSkillProfiencies = json.additionalSkillProfiencies;
      this.additionalOtherProfiencies = json.additionalOtherProfiencies;
      this.additionalTraits = json.additionalTraits;
      this.setStats = json.setStats;
      this.addToStats = json.addToStats;
      this.baseAC = json.baseAC;
      this.maxDexBonus = json.maxDexBonus;
      this.bonusAC = json.bonusAC;
      this.bonusAB = json.bonusAB;
    }
  }
}

export class SetStatModel {
  constructor(public stat: StatEnums, public value: number) { }
}

export class AddToStatModel {
  constructor(public stat: StatEnums, public value: number) { }
}
