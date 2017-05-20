import {ItemModel, ArmorModel, WeaponModel, ArmorType} from './itemModel';

export class InventoryModel {
  equipped: ItemModel[] = [];
  backpack: ItemModel[] = [];

  static parseJSON(json): InventoryModel {
    var model: InventoryModel;
    if(json) {
      model = new InventoryModel();
      for(var eItem of json.equipped) {
        if(eItem.class === "item") {
          let item = new ItemModel("");
          item.fillFromJSON(eItem);
          model.equipped.push(item);
        }
        else if (eItem.class === "armor") {
          let item = new ArmorModel("", ArmorType.Clothing, 10, 8);
          item.fillFromJSON(eItem);
          model.equipped.push(item);
        }
        else if (eItem.class === "weapon") {
          let item = new WeaponModel("", "", "");
          item.fillFromJSON(eItem);
          model.equipped.push(item);
        }
      }
      for(var eItem of json.backpack) {
        if(eItem.class === "item") {
          let item = new ItemModel("");
          item.fillFromJSON(eItem);
          model.backpack.push(item);
        }
        else if (eItem.class === "armor") {
          let item = new ArmorModel("", ArmorType.Clothing, 10, 8);
          item.fillFromJSON(eItem);
          model.backpack.push(item);
        }
        else if (eItem.class === "weapon") {
          let item = new WeaponModel("", "", "");
          item.fillFromJSON(eItem);
          model.backpack.push(item);
        }
      }
    }
    return model;
  }
}
