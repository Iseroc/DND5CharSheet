import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {SkillStats, SkillEnums} from '../../../data/extra/enums'

@inject(DataAccessor)
export class Skill {
  constructor(private data: DataAccessor) { }

  @bindable
  editMode: boolean = false;

  @bindable
  model: SkillEnums;

  get name(): string {
    return this.data.translations.translateSkill(this.model);
  }

  get skillScore(): number {
    var score = this.data.character.statModifier(SkillStats.get(this.model));

    if(this.hasProfiency) {
      score += this.data.character.profiencyBonus;
      if(this.hasExpertise) {
        score += this.data.character.profiencyBonus;
      }
    }

    return score;
  }

  get hasProfiency(): boolean {
    return this.data.character.skills.includes(this.model) || this.data.inventory.skills.includes(this.model);
  }
  set hasProfiency(value: boolean) {
    if(!value){
      this.data.character.removeSkill(this.model);
    }
    else {
      this.data.character.addSkill(this.model);
    }
  }

  get hasExpertise(): boolean {
    return this.data.character.skills.includes(this.model) && this.data.character.expertises.includes(this.model);
  }
}
