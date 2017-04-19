import {ItemModel, ArmorModel, WeaponModel, ArmorType} from './components/itemModel';
import {TraitModel} from './components/traitModel';
import {ProfiencyModel} from './components/profiencyModel';
import {SkillEnums, StatEnums} from '../extra/enums';
import {inject} from 'aurelia-framework';
import {InventoryModel} from './components/inventoryModel';

export class InventoryAccessor {
  constructor() { }

  model: InventoryModel = new InventoryModel();

  // ------------------------------------------- //
  //   Variables                                 //
  // ------------------------------------------- //

  get equipped() {
    return this.model.equipped;
  }
  get backpack() {
    return this.model.backpack;
  }

  get armor(): ArmorModel {
    for(let item of this.model.equipped) {
      if(item instanceof ArmorModel) {
        return item;
      }
    }
    return null;
  }
  set armor(armor: ArmorModel) {
    this.equip(armor);
  }

  get weapons(): WeaponModel[] {
    return this.model.equipped.filter(i => i instanceof WeaponModel) as WeaponModel[];
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
      arr = arr.concat(item.additionalTraits);
    });

    return arr;
  }

  // Skill profiencies, intentionally named exactly the same as in character model
  get skills(): SkillEnums[] {
    let arr: SkillEnums[] = [];

    this.model.equipped.forEach( item => {
      arr = arr.concat(item.additionalSkillProfiencies);
    });

    return arr;
  }

  // Other profiencies, intentionally named exactly the same as in character model
  get profiencies(): ProfiencyModel[] {
    let arr: ProfiencyModel[] = [];

    this.model.equipped.forEach( item => {
      arr = arr.concat(item.additionalOtherProfiencies);
    });

    return arr;
  }

  // ------------------------------------------- //
  //   Functions                                 //
  // ------------------------------------------- //

  equip(item: ItemModel) {
    if(item instanceof ArmorModel) {
      // unequip old armor
      for(let equip of this.equipped) {
        if(equip instanceof ArmorModel) {
          this.model.equipped.splice(this.equipped.indexOf(equip), 1);
          this.model.backpack.push(equip);
          break;
        }
      }
      // equip new armor
      this.model.equipped.push(item);
    }
    else {
      // if this item is in the backpack, move it out of the backpack
      if(this.model.backpack.includes(item)) {
        this.model.backpack.splice(this.backpack.indexOf(item), 1);
      }
      this.model.equipped.push(item);
    }
  }

  moveToBackpack(item: ItemModel) {
    // if this item is currently equipped, unequip it
    if(this.model.equipped.includes(item)) {
      this.model.equipped.splice(this.equipped.indexOf(item), 1);
    }
    this.model.backpack.push(item);
  }
}
