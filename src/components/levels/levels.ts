import {inject, bindable} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {DataAccessor} from '../../data/dataAccessor';
import {LevelModel} from '../../data/models/components/levelModel';
import {ProfiencyModel} from '../../data/models/components/profiencyModel';
import {CharModEnums, SkillEnums} from '../../data/extra/enums';

@inject(DataAccessor, BindingSignaler)
export class Levels {
  constructor(private data: DataAccessor, private signaler: BindingSignaler) { }

  addNewFeature(level: LevelModel, select: CharModEnums) {
    if(CharModEnums[select] === CharModEnums[CharModEnums.SKILLPROFIENCY]) {
      // find the first available skill not already on the item and add it
      var i = SkillEnums.ACROBATICS;
      while(level.additionalSkillProfiencies && level.additionalSkillProfiencies.includes(i)) {
        i++;
      }
      level.additionalSkillProfiencies.push(i);
      this.signaler.signal('skill-list-changed');
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.OTHERPROFIENCY]) {
      level.additionalOtherProfiencies.push(new ProfiencyModel("New profiency"));
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.TRAIT]) {
      level.additionalTraits.push(new ProfiencyModel("New trait"));
    }
  }

  removeSkill(level: LevelModel, skill: SkillEnums) {
    level.additionalSkillProfiencies.splice(level.additionalSkillProfiencies.indexOf(skill), 1);
    this.signaler.signal('skill-list-changed');
  }
}
