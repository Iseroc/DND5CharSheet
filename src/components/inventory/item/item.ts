import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel} from '../../../data/models/components/itemModel';
import {bindable} from 'aurelia-framework';

@inject(DataAccessor)
export class Item {
  constructor(private data: DataAccessor) { }

  @bindable
  model: ItemModel;

  @bindable
  editPopup: Function;

  unequip() {
    this.data.inventory.moveToBackpack(this.model);
  }

  equip() {
    this.data.inventory.equip(this.model);
  }
}
