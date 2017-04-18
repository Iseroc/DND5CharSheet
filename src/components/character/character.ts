import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';
import {Profiency} from '../../data/models/components/profiency'
import {TraitModel} from '../../data/models/components/traitModel'

@inject(DataAccessor)
export class Character {
  constructor(private data: DataAccessor) { }

  editMode: boolean = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  newProfiency: string = '';
  addProfiency() {
    let prof: Profiency = new Profiency(this.newProfiency);
    this.data.character.addProfiency(prof);
    this.newProfiency = '';
  }
  removeProfiency(prof) {
    this.data.character.removeProfiency(prof);
  }

  newTrait: string = '';
  addTrait() {
    let trait: TraitModel = new TraitModel(this.newTrait);
    this.data.character.addTrait(trait);
    this.newTrait = '';
  }
  removeTrait(trait) {
    this.data.character.removeTrait(trait);
  }
}
