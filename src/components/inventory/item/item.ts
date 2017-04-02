import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel} from '../../../data/models/components/itemModel';
import {bindable} from 'aurelia-framework';

@inject(DataAccessor)
export class Item {
  constructor(private data: DataAccessor) { }

  @bindable
  model: ItemModel;

  unequip() {
    if(this.data.inventory.equipped.includes(this.model)) {
      this.data.inventory.equipped.splice(this.data.inventory.equipped.indexOf(this.model), 1);
      this.data.inventory.backpack.push(this.model);
    }
  }

  equip() {
    if(this.data.inventory.backpack.includes(this.model)) {
      this.data.inventory.backpack.splice(this.data.inventory.backpack.indexOf(this.model), 1);
      this.data.inventory.equipped.push(this.model);
    }
  }
}
