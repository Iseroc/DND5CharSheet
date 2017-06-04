import {ItemModel} from './itemModel';

export class InventoryModel {
  equipped: ItemModel[] = [];
  backpack: ItemModel[] = [];

  static parseJSON(json): InventoryModel {
    var model: InventoryModel;
    if(json) {
      model = new InventoryModel();
      for(var eItem of json.equipped) {
        let item = ItemModel.ItemModel("");
        item.fillFromJSON(eItem);
        model.equipped.push(item);
      }
      for(var eItem of json.backpack) {
        let item = ItemModel.ItemModel("");
        item.fillFromJSON(eItem);
        model.backpack.push(item);
      }
    }
    return model;
  }
}
