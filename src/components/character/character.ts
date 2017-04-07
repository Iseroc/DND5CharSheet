import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';

@inject(DataAccessor)
export class Character {
  constructor(private data: DataAccessor) { }

  editMode: boolean = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
