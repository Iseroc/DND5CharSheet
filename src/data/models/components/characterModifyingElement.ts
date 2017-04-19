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
}
