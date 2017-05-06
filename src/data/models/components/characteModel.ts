import {LevelModel} from './levelModel';
import {StatEnums, SkillEnums} from '../../extra/enums';
import {ProfiencyModel} from './profiencyModel';
import {TraitModel} from './traitModel';
import {StatModel} from './statModel';

export class CharacterModel {
    name: string = '';
    speed: number = 30;
    levels: LevelModel[] = [];

    stats: StatModel[] = [];
    skills: SkillEnums[] = [];
    expertises: SkillEnums[] = [];
    profiencies: ProfiencyModel[] = [];
    traits: TraitModel[] = [];

    currentHP: number = 0;
}
