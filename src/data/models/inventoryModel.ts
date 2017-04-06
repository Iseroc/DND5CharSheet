import {ItemModel, ArmorModel, WeaponModel, ArmorType} from './components/itemModel';
import {TraitModel} from './components/traitModel';
import {Profiency} from './components/profiency';
import {SkillEnums, StatEnums} from '../extra/enums';
import {inject} from 'aurelia-framework';

export class InventoryModel {
  constructor() { }

  // ------------------------------------------- //
  //   Variables                                 //
  // ------------------------------------------- //

  equipped: ItemModel[] = [];
  backpack: ItemModel[] = [];

  get armor(): ArmorModel {
    for(let item of this.equipped) {
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
    return this.equipped.filter(i => i instanceof WeaponModel) as WeaponModel[];
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

    this.equipped.forEach( item => {
      arr = arr.concat(item.additionalTraits);
    });

    return arr;
  }

  // Skill profiencies, intentionally named exactly the same as in character model
  get skills(): SkillEnums[] {
    let arr: SkillEnums[] = [];

    this.equipped.forEach( item => {
      arr = arr.concat(item.additionalSkillProfiencies);
    });

    return arr;
  }

  // Other profiencies, intentionally named exactly the same as in character model
  get profiencies(): Profiency[] {
    let arr: Profiency[] = [];

    this.equipped.forEach( item => {
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
          this.equipped.splice(this.equipped.indexOf(equip), 1);
          this.backpack.push(equip);
          break;
        }
      }
      // equip new armor
      this.equipped.push(item);
    }
    else {
      // if this item is in the backpack, move it out of the backpack
      if(this.backpack.includes(item)) {
        this.backpack.splice(this.backpack.indexOf(item), 1);
      }
      this.equipped.push(item);
    }
  }

  moveToBackpack(item: ItemModel) {
    // if this item is currently equipped, unequip it
    if(this.equipped.includes(item)) {
      this.equipped.splice(this.equipped.indexOf(item), 1);
    }
    this.backpack.push(item);
  }
}
