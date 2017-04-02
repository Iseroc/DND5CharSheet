import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel} from '../../../data/models/components/itemModel';
import {SkillEnums} from '../../../data/extra/enums';
import {Profiency} from '../../../data/models/components/profiency';
import {TraitModel} from '../../../data/models/components/traitModel';

@inject(DataAccessor)
export class NewItem {
  constructor(private data: DataAccessor) { }

  name: string;

  additionalSkillProfiencies: SkillEnums[] = [];
  selectedSkillProfiency: SkillEnums;

  addSkillProfiency() {
    if(!this.additionalSkillProfiencies.includes(this.selectedSkillProfiency)) {
      this.additionalSkillProfiencies.push(this.selectedSkillProfiency);
    }
  }

  additionalOtherProfiencies: Profiency[] = [];
  newOtherProfiencyName: string;

  addOtherProfiency() {
    if(this.newOtherProfiencyName) {
      this.additionalOtherProfiencies.push(new Profiency(this.newOtherProfiencyName, 'other'));
      this.newOtherProfiencyName = '';
    }
  }

  additionalTraits: TraitModel[] = [];
  newTraitName: string;

  addTrait() {
    if(this.newTraitName) {
      this.additionalTraits.push(new TraitModel(this.newTraitName));
      this.newTraitName = '';
    }
  }

  createItem() {
    var item = new ItemModel(this.name, true);
    item.additionalOtherProfiencies = this.additionalOtherProfiencies;
    item.additionalSkillProfiencies = this.additionalSkillProfiencies;
    item.additionalTraits = this.additionalTraits;

    this.data.inventory.backpack.push(item);
  }
}
