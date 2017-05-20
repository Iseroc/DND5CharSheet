import {CharacterModifyingElement} from './characterModifyingElement';

export class ItemModel extends CharacterModifyingElement {
  constructor(public name: string, public equippable: boolean = false, public requiresAttunement: boolean = false) {
    super();
    this.class = "item";
  }

  protected class;

  fillFromJSON(json) {
    if(json) {
      super.fillFromJSON(json);
      this.class = json.class;
      this.name = json.name;
      this.equippable = json.equippable;
      this.requiresAttunement = json.requiresAttunement;
    }
  }
}

export class ArmorModel extends ItemModel {
  constructor(name: string, public type: ArmorType, baseAC: number, maxDexBonus: number, requiresAttunement: boolean = false) {
    super(name, true, requiresAttunement);
    this.maxDexBonus = maxDexBonus;
    this.baseAC = baseAC;
    this.class = "armor";
  }

  fillFromJSON(json) {
    if(json) {
      super.fillFromJSON(json);
      this.baseAC = json.baseAC;
      this.maxDexBonus = json.maxDexBonus;
    }
  }
}

export class WeaponModel extends ItemModel {
  constructor(name: string, public damage: string, public damageType: string, requiresAttunement: boolean = false) {
    super(name, true, requiresAttunement);
    this.class = "weapon";
  }

  // 'melee' or range in feets
  range: string;

  // various different properties
  light: boolean = false;
  heavy: boolean = false;

  twohanded: boolean = false;

  fillFromJSON(json) {
    if(json) {
      super.fillFromJSON(json);
      this.damage = json.damage;
      this.damageType = json.damageType;
      this.range = json.range;
      this.light = json.light;
      this.heavy = json.heavy;
      this.twohanded = json.twohanded;
    }
  }
}

export enum ArmorType {
  Clothing,
  Light,
  Medium,
  Heavy,
}
