import {TraitModel} from '../components/traitModel';
import {ProfiencyModel} from './profiencyModel';
import {SkillEnums, StatEnums} from '../../extra/enums';

export class CharacterModifyingElement {
  constructor() { }

  skillProfiencies: SkillEnums[] = [];
  otherProfiencies: ProfiencyModel[] = [];
  traits: TraitModel[] = [];
  saveProfiencies: StatEnums[] = [];
  setStats: SetStatModel[] = [];
  addToStats: AddToStatModel[] = [];
  baseAC: number;
  maxDexBonus: number;
  bonusAC: number;
  bonusAB: number;
  bonusToSaves: number;

  fillFromJSON(json) {
    if(json) {
      this.skillProfiencies = json.skillProfiencies;
      this.otherProfiencies = json.otherProfiencies;
      this.traits = json.traits;
      this.saveProfiencies = json.saveProfiencies;
      this.setStats = json.setStats;
      this.addToStats = json.addToStats;
      this.baseAC = json.baseAC;
      this.maxDexBonus = json.maxDexBonus;
      this.bonusAC = json.bonusAC;
      this.bonusAB = json.bonusAB;
      this.bonusToSaves = json.bonusToSaves;
    }
  }
}

export class SetStatModel {
  constructor(public stat: StatEnums, public value: number) { }
}

export class AddToStatModel {
  constructor(public stat: StatEnums, public value: number) { }
}
