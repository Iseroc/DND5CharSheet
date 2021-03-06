import {ItemModel, ArmorType, ItemType} from './components/itemModel';
import {TraitModel} from './components/traitModel';
import {ProfiencyModel} from './components/profiencyModel';
import {SkillEnums, StatEnums} from '../extra/enums';
import {inject} from 'aurelia-framework';
import {InventoryModel} from './components/inventoryModel';

export class InventoryAccessor {
  constructor() { }

  private model: InventoryModel = new InventoryModel();

  get InventoryDataJSON(): string {
    return JSON.stringify(this.model, null, '\t');
  }
  set InventoryDataJSON(json) {
    this.model = InventoryModel.parseJSON(JSON.parse(json));
  }

  public reset() {
    this.model = new InventoryModel();
  }

  // ------------------------------------------- //
  //   Variables                                 //
  // ------------------------------------------- //

  get equipped() {
    return this.model.equipped;
  }
  get backpack() {
    return this.model.backpack;
  }

  get armor(): ItemModel {
    for(let item of this.model.equipped) {
      if(item.itemType === ItemType.Armor) {
        return item;
      }
    }
    return null;
  }
  set armor(armor: ItemModel) {
    this.equip(armor);
  }

  get weapons(): ItemModel[] {
    return this.model.equipped.filter(i => i.itemType === ItemType.Weapon);
  }

  // ------------------------------------------- //
  //   Calculated values                         //
  // ------------------------------------------- //



  // ------------------------------------------- //
  //   Traits, skills and profiencies            //
  // ------------------------------------------- //

  // Traits and features, intentionally named exactly the same as in character model
  get traits(): TraitModel[] {
    let arr: TraitModel[] = [];

    this.model.equipped.forEach( item => {
      arr = arr.concat(item.traits);
    });

    return arr;
  }

  // Skill profiencies, intentionally named exactly the same as in character model
  get skills(): SkillEnums[] {
    let arr: SkillEnums[] = [];

    this.model.equipped.forEach( item => {
      arr = arr.concat(item.skillProfiencies);
    });

    return arr;
  }

  // Other profiencies, intentionally named exactly the same as in character model
  get profiencies(): ProfiencyModel[] {
    let arr: ProfiencyModel[] = [];

    this.model.equipped.forEach( item => {
      arr = arr.concat(item.otherProfiencies);
    });

    return arr;
  }

  // ------------------------------------------- //
  //   Functions                                 //
  // ------------------------------------------- //

  equip(item: ItemModel): boolean {
    if(!this.isEquipped(item)) {
      if(item.itemType === ItemType.Armor) {
        // unequip old armor
        for(let equippedArmor of this.equipped) {
          if(equippedArmor.itemType === ItemType.Armor) {
            this.model.equipped.splice(this.equipped.indexOf(equippedArmor), 1);
            this.model.backpack.push(equippedArmor);
            break;
          }
        }
        // equip new armor
        this.model.backpack.splice(this.backpack.indexOf(item), 1);
        this.model.equipped.push(item);
      }
      else {
        // if this item is in the backpack, move it out of the backpack
        if(this.model.backpack.includes(item)) {
          this.model.backpack.splice(this.backpack.indexOf(item), 1);
        }
        this.model.equipped.push(item);
      }
      return true;
    }
    return false;
  }

  moveToBackpack(item: ItemModel): boolean {
    if(!this.isInBackpack(item)) {
      // if this item is currently equipped, unequip it
      if(this.isEquipped(item)) {
        this.model.equipped.splice(this.equipped.indexOf(item), 1);
      }
      this.model.backpack.push(item);
      return true;
    }
    return false;
  }

  isEquipped(item: ItemModel): boolean {
    return this.model.equipped.includes(item);
  }

  isInBackpack(item: ItemModel): boolean {
    return this.model.backpack.includes(item);
  }

  deleteItem(item: ItemModel): boolean {
    if(this.isInBackpack(item)) {
      this.model.backpack.splice(this.backpack.indexOf(item), 1);
      return true;
    }
    else if(this.isEquipped(item)) {
      this.model.equipped.splice(this.equipped.indexOf(item), 1);
      return true;
    }
    return false;
  }
}
