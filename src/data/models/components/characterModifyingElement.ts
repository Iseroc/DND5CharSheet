import {TraitModel} from '../components/traitModel';
import {ProfiencyModel} from './profiencyModel';
import {SkillEnums} from '../../extra/enums';

export class CharacterModifyingElement {
  constructor() { }

  additionalSkillProfiencies: SkillEnums[] = [];
  additionalOtherProfiencies: ProfiencyModel[] = [];
  additionalTraits: TraitModel[] = [];
  baseAC: number;
  maxDexBonus: number;
  bonusAC: number;
  bonusAB: number;

  fillFromJSON(json) {
    if(json) {
      this.additionalSkillProfiencies = json.additionalSkillProfiencies;
      this.additionalOtherProfiencies = json.additionalOtherProfiencies;
      this.additionalTraits = json.additionalTraits;
      this.baseAC = json.baseAC;
      this.maxDexBonus = json.maxDexBonus;
      this.bonusAC = json.bonusAC;
      this.bonusAB = json.bonusAB;
    }
  }
}
