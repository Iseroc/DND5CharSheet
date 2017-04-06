import {TraitModel} from '../components/traitModel';
import {Profiency} from './profiency';
import {SkillEnums} from '../../extra/enums';

export class CharacterModifyingElement {
  constructor() { }

  additionalSkillProfiencies: SkillEnums[] = [];
  additionalOtherProfiencies: Profiency[] = [];
  additionalTraits: TraitModel[] = [];
  baseAC: number;
  maxDexBonus: number;
  bonusAC: number;
  bonusAB: number;
}
