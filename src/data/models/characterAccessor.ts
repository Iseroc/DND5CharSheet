import {SkillModel} from './components/skillModel';
import {TraitModel} from './components/traitModel';
import {ProfiencyModel} from './components/profiencyModel';
import {StatEnums, SkillEnums} from '../extra/enums';
import {CharacterModel} from './components/characteModel';
import {LevelModel} from './components/levelModel';
import {StatModel} from './components/statModel';

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

  getCharacterDataJSON(): string {
    return JSON.stringify(this.model)
  }
  setCharacterDataFromJSON(json): boolean {
    JSON.parse(json);
    return true;
  }

  get name() {
    return this.model.name;
  }
  set name(value: string) {
    this.model.name = value;
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

  // skill profiencies list
  get skills() {
    return this.model.skills;
  }
  addSkill(skill:SkillEnums) {
    if(!this.model.skills.includes(skill)) {
      this.model.skills.push(skill);
    }
  }
  removeSkill(skill:SkillEnums) {
    if(this.model.skills.includes(skill)) {
      this.model.skills.splice(this.model.skills.indexOf(skill), 1);
    }
  }

  //skill expertises list
  get expertises() {
    return this.model.expertises;
  }

  // other profiencies list
  get profiencies() {
    return this.model.profiencies;
  }
  addProfiency(prof: ProfiencyModel) {
    if(!this.model.profiencies.includes(prof)) {
      this.model.profiencies.push(prof);
    }
  }
  removeProfiency(prof: ProfiencyModel) {
    if(this.model.profiencies.includes(prof)) {
      this.model.profiencies.splice(this.model.profiencies.indexOf(prof), 1);
    }
  }

  // traits and features list
  get traits() {
    return this.model.traits;
  }
  addTrait(trait:TraitModel) {
    if(!this.model.traits.includes(trait)) {
      this.model.traits.push(trait);
    }
  }
  removeTrait(trait:TraitModel) {
    if(this.model.traits.includes(trait)) {
      this.model.traits.splice(this.model.traits.indexOf(trait), 1);
    }
  }

  addLevel(level: LevelModel) {
    this.model.levels.push(level);
  }
}
