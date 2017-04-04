import {CharacterModifyingElement} from './characterModifyingElement';

export class ItemModel extends CharacterModifyingElement {
  constructor(public name: string, public equippable: boolean = false, public requiresAttunement: boolean = false) {
    super();
  }
}

export class ArmorModel extends ItemModel {
  constructor(name: string, baseAC: number, maxDexBonus: number, requiresAttunement: boolean = false) {
    super(name, true, requiresAttunement);
    this.maxDexBonus = maxDexBonus;
    this.baseAC = baseAC;
  }
}

export class WeaponModel extends ItemModel {
  constructor(name: string, public damage: string, public damageType: string, requiresAttunement: boolean = false) {
    super(name, true, requiresAttunement);
  }
}
