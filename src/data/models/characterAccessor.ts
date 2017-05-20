import {SkillModel} from './components/skillModel';
import {TraitModel} from './components/traitModel';
import {ProfiencyModel} from './components/profiencyModel';
import {StatEnums, SkillEnums} from '../extra/enums';
import {CharacterModel} from './components/characteModel';
import {LevelModel} from './components/levelModel';
import {StatModel} from './components/statModel';
import {RaceModel} from './components/raceModel';

export class CharacterAccessor {
  constructor() {
    this.setStat(StatEnums.STR, 10);
    this.setStat(StatEnums.DEX, 10);
    this.setStat(StatEnums.CON, 10);
    this.setStat(StatEnums.INT, 10);
    this.setStat(StatEnums.WIS, 10);
    this.setStat(StatEnums.CHA, 10);
  }

  private model: CharacterModel = new CharacterModel();

  get CharacterDataJSON(): string {
    return JSON.stringify(this.model, null, '\t');
  }
  set CharacterDataJSON(json) {
    this.model = JSON.parse(json);
  }

  get name() {
    return this.model.name;
  }
  set name(value: string) {
    this.model.name = value;
  }

  get race() {
    return this.model.race;
  }
  set race(value: RaceModel) {
    this.model.race = value;
  }

  get totalLevel() {
    return Math.max(this.model.levels.length, 1);
  }

  get speed() {
    return this.model.speed;
  }

  get profiencyBonus() {
    return Math.floor((this.totalLevel - 1) / 4) + 2;
  }

  get maxHP() {
    let hp = 0;

    if(this.model.levels.length > 0) {
      hp = this.model.levels[0].hd / 2 - 1;
      for(let level of this.model.levels) {
        hp += level.hd / 2 + 1 + this.statModifier(StatEnums.CON);
      }
    }

    return hp;
  }
  get currentHP(): number {
    return this.model.currentHP;
  }
  set currentHP(value: number) {
    this.model.currentHP = value;
  }

  get stats() {
    return this.model.stats;
  }
  getStat(statKey:StatEnums): number {
    let smodel = this.stats.find(stat => stat.key === statKey);
    if(smodel) {
      return smodel.value;
    }
    return -1000;
  }
  setStat(statKey:StatEnums, value:number) {
    let smodel = this.stats.find(stat => stat.key === statKey);
    if(smodel) {
      smodel.value = value;
    }
    else {
      smodel = new StatModel(statKey, value);
      this.model.stats.push(smodel);
    }
  }

  public statModifier(statKey: StatEnums): number {
    let smodel = this.stats.find(stat => stat.key === statKey);
    if(smodel) {
      return Math.floor((smodel.value - 10) / 2);
    }
    return -1000;
  }

  get levels(): LevelModel[] {
    return this.model.levels;
  }

  // skill profiencies list
  get skills(): SkillEnums[] {
    let arr = [];
    let unique = {};
    for(let level of this.levels) {
      for(let skill of level.additionalSkillProfiencies) {
        if(!unique[skill]) {
          arr.push(skill);
          unique[skill] = 1;
        }
      }
    }
    for(let skill of this.race.additionalSkillProfiencies) {
      if(!unique[skill]) {
        arr.push(skill);
        unique[skill] = 1;
      }
    }
    return arr;
  }

  //skill expertises list
  get expertises(): SkillEnums[] {
    //TODO: make expertises
    return [];
    //return this.model.expertises;
  }

  // other profiencies list
  get profiencies(): ProfiencyModel[] {
    let arr = [];
    let unique = {};
    for(let level of this.levels) {
      for(let prof of level.additionalOtherProfiencies) {
        if(!unique[prof.name]) {
          arr.push(prof);
          unique[prof.name] = 1;
        }
      }
    }
    for(let prof of this.race.additionalOtherProfiencies) {
      if(!unique[prof.name]) {
        arr.push(prof);
        unique[prof.name] = 1;
      }
    }
    return arr;
  }

  // traits and features list
  get traits(): TraitModel[] {
    let arr = [];
    let unique = {};
    for(let level of this.levels) {
      for(let trait of level.additionalTraits) {
        if(!unique[trait.name]) {
          arr.push(trait);
          unique[trait.name] = 1;
        }
      }
    }
    for(let trait of this.race.additionalTraits) {
      if(!unique[trait.name]) {
        arr.push(trait);
        unique[trait.name] = 1;
      }
    }
    return arr;
  }

  addLevel(level: LevelModel) {
    this.model.levels.push(level);
  }
}
