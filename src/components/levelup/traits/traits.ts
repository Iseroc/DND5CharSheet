import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {TraitModel} from '../../../data/models/components/traitModel';

@inject(DataAccessor)
export class Traits {
  constructor(private data: DataAccessor) { }

  newTraitText: string;

  removeTrait(trait:TraitModel) {
    let i = this.data.character.traits.indexOf(trait);
    if(i > -1) {
      this.data.character.traits.splice(i, 1);
    }
  }

  addTrait() {
    if(this.newTraitText) {
      let trait:TraitModel = new TraitModel(this.newTraitText);
      this.data.character.traits.push(trait);
      this.newTraitText = '';
    }
  }
}
