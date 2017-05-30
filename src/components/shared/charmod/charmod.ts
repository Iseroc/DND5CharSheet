import {inject, bindable} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {DataAccessor} from '../../../data/dataAccessor';
import {CharacterModifyingElement, SetStatModel, AddToStatModel} from '../../../data/models/components/characterModifyingElement';
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
      while(this.model.skillProfiencies && this.model.skillProfiencies.includes(i)) {
        i++;
      }
      this.model.skillProfiencies.push(i);
      this.signaler.signal('skill-list-changed');
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.OTHERPROFIENCY]) {
      this.model.otherProfiencies.push(new ProfiencyModel("New profiency"));
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.TRAIT]) {
      this.model.traits.push(new ProfiencyModel("New trait"));
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.SETSTAT]) {
      this.model.setStats.push(new SetStatModel(StatEnums.STR, 10));
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.ADDTOSTAT]) {
      this.model.addToStats.push(new SetStatModel(StatEnums.STR, 1));
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.SAVEPROFIENCY]) {
      this.model.saveProfiencies.push(StatEnums.STR);
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.ALLSAVESBONUS]) {
      this.model.bonusToSaves = 1;
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.ACBONUS]) {
      this.model.bonusAC = 1;
    }
    else if(CharModEnums[select] === CharModEnums[CharModEnums.ABBONUS]) {
      this.model.bonusAB = 1;
    }
  }

  removeSkill(skill: SkillEnums) {
    this.model.skillProfiencies.splice(this.model.skillProfiencies.indexOf(skill), 1);
    this.signaler.signal('skill-list-changed');
  }
  removeOtherProf(prof: ProfiencyModel) {
    this.model.otherProfiencies.splice(this.model.otherProfiencies.indexOf(prof), 1);
  }
  removeTrait(trait: TraitModel) {
    this.model.traits.splice(this.model.traits.indexOf(trait), 1);
  }
  removeAddStat(addstat: AddToStatModel) {
    this.model.addToStats.splice(this.model.addToStats.indexOf(addstat), 1);
  }
  removeSetStat(setstat: SetStatModel) {
    this.model.setStats.splice(this.model.setStats.indexOf(setstat), 1);
  }
  removeSaveProfiency(saveprof: StatEnums) {
    this.model.saveProfiencies.splice(this.model.saveProfiencies.indexOf(saveprof), 1);
  }
  removeBonusToSaves() {
    this.model.bonusToSaves = undefined;
  }
  removeBonusToAC() {
    this.model.bonusAC = undefined;
  }
  removeBonusToAB() {
    this.model.bonusAB = undefined;
  }
}
