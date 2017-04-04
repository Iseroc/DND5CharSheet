import {ItemModel, ArmorModel, WeaponModel} from './components/itemModel';
import {TraitModel} from './components/traitModel';
import {Profiency} from './components/profiency';
import {SkillEnums} from '../extra/enums';

export class InventoryModel {
  armor: ArmorModel = null;
  weapon: WeaponModel[] = [];
  equipped: ItemModel[] = [];
  backpack: ItemModel[] = [];

  constructor() { }

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
}
