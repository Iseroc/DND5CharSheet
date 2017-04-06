import {CharacterModifyingElement} from './characterModifyingElement';

export class ItemModel extends CharacterModifyingElement {
  constructor(public name: string, public equippable: boolean = false, public requiresAttunement: boolean = false) {
    super();
  }
}

export class ArmorModel extends ItemModel {
  constructor(name: string, public type: ArmorType, baseAC: number, maxDexBonus: number, requiresAttunement: boolean = false) {
    super(name, true, requiresAttunement);
    this.maxDexBonus = maxDexBonus;
    this.baseAC = baseAC;
  }
}

export class WeaponModel extends ItemModel {
  constructor(name: string, public damage: string, public damageType: string, requiresAttunement: boolean = false) {
    super(name, true, requiresAttunement);
  }

  // 'melee' or range in feets
  range: string;

  // various different properties
  light: boolean = false;
  heavy: boolean = false;

  twohanded: boolean = false;
}

export enum ArmorType {
  Clothing,
  Light,
  Medium,
  Heavy,
}
