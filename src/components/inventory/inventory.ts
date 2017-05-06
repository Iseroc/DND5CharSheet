import {inject, bindable, observable} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';

@inject(DataAccessor)
export class Inventory {
  constructor(private data: DataAccessor) { }

  showItemPopup: boolean = false;
  showEditPopup: boolean = false;
  itemToEdit = null;

  equip(item) {
    this.data.inventory.equip(item);
  }
  unequip(item) {
    this.data.inventory.moveToBackpack(item);
  }

  startCreatingNewItem() {
    this.showItemPopup = true;
  }
  cancelCreatingNewItem() {
    this.showItemPopup = false;
  }
  createItem(item) {
    this.data.inventory.backpack.push(item);
  }

  editItem(item) {
    this.showEditPopup = true;
    this.itemToEdit = item;
  }
  cancelEditItem() {
    this.showEditPopup = false;
    this.itemToEdit = null;
  }

  deleteItem(item) {
    this.data.inventory.deleteItem(item);
  }
}
