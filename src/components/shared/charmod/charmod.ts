import {inject, bindable} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {DataAccessor} from '../../../data/dataAccessor';
import {CharacterModifyingElement} from '../../../data/models/components/characterModifyingElement';
import {ProfiencyModel} from '../../../data/models/components/profiencyModel';
import {CharModEnums, SkillEnums} from '../../../data/extra/enums';

@inject(DataAccessor, BindingSignaler)
export class Charmod {
  constructor(private data: DataAccessor, private signaler: BindingSignaler) { }

  @bindable model: CharacterModifyingElement;

  addNewFeature(select: CharModEnums) {
    if(CharModEnums[select] === CharModEnums[CharModEnums.SKILLPROFIENCY]) {
      // find the first available skill not already on the item and add it
      var i = SkillEnums.ACROBATICS;
      while(this.model.additionalSkillProfiencies && this.model.additionalSkillProfiencies.includes(i)) {
        i++;
      }
      this.model.additionalSkillProfiencies.push(i);
      this.signaler.signal('skill-list-changed');
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.OTHERPROFIENCY]) {
      this.model.additionalOtherProfiencies.push(new ProfiencyModel("New profiency"));
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.TRAIT]) {
      this.model.additionalTraits.push(new ProfiencyModel("New trait"));
    }
  }

  removeSkill(skill: SkillEnums) {
    this.model.additionalSkillProfiencies.splice(this.model.additionalSkillProfiencies.indexOf(skill), 1);
    this.signaler.signal('skill-list-changed');
  }

}
