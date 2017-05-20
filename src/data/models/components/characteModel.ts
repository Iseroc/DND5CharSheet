import {LevelModel} from './levelModel';
import {StatEnums, SkillEnums} from '../../extra/enums';
import {ProfiencyModel} from './profiencyModel';
import {TraitModel} from './traitModel';
import {StatModel} from './statModel';
import {RaceModel} from './raceModel';

export class CharacterModel {
    name: string = '';
    speed: number = 30;
    levels: LevelModel[] = [];
    race: RaceModel;
    stats: StatModel[] = [];

    currentHP: number = 0;
}
