import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {SkillEnums} from '../../../data/extra/enums';

@inject(DataAccessor)
export class Lvskill {
  constructor(private data: DataAccessor) { }

  @bindable
  model: SkillEnums;

  get name() {
    return this.data.translations.translateSkill(this.model);
  }

  get profiency() {
    return this.data.character.skills.includes(this.model);
  }

  set profiency(value: boolean) {
    if(!value) {
      this.data.character.skills.splice(this.data.character.skills.indexOf(this.model), 1);
    }
    if(value) {
      this.data.character.skills.push(this.model);
    }
  }
}
