import {inject, bindable, observable} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';

@inject(DataAccessor)
export class Inventory {
  constructor(private data: DataAccessor) { }

  creatingNewItem: boolean = false;

  startCreatingNewItem() {
    this.creatingNewItem = true;
  }

  public doneCreatingNewItem() {
    this.creatingNewItem = false;
  }
}
