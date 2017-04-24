import {inject, bindable, observable} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';

@inject(DataAccessor)
export class Inventory {
  constructor(private data: DataAccessor) { }

  creatingNewItem: boolean = false;

  equip(item) {
    this.data.inventory.equip(item);
  }
  unequip(item) {
    this.data.inventory.moveToBackpack(item);
  }

  startCreatingNewItem() {
    this.creatingNewItem = true;
  }

  doneCreatingNewItem() {
    this.creatingNewItem = false;
  }

  editItem(item) {
    console.log(item);
  }
}
