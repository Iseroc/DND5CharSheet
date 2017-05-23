import {inject, bindable} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {DataAccessor} from '../../../data/dataAccessor';
import {CharacterModifyingElement, SetStatModel} from '../../../data/models/components/characterModifyingElement';
import {ProfiencyModel} from '../../../data/models/components/profiencyModel';
import {TraitModel} from '../../../data/models/components/traitModel';
import {CharModEnums, SkillEnums, StatEnums} from '../../../data/extra/enums';

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
    else if(CharModEnums[select] === CharModEnums[CharModEnums.SETSTAT]) {
      this.model.setStats.push(new SetStatModel(StatEnums.STR, 10));
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.ADDTOSTAT]) {
      this.model.addToStats.push(new SetStatModel(StatEnums.STR, 1));
    }
  }

  removeSkill(skill: SkillEnums) {
    this.model.additionalSkillProfiencies.splice(this.model.additionalSkillProfiencies.indexOf(skill), 1);
    this.signaler.signal('skill-list-changed');
  }
  removeOtherProf(prof: ProfiencyModel) {
    this.model.additionalOtherProfiencies.splice(this.model.additionalOtherProfiencies.indexOf(prof), 1);
  }
  removeTrait(trait: TraitModel) {
    this.model.additionalTraits.splice(this.model.additionalTraits.indexOf(trait), 1);
  }

}
