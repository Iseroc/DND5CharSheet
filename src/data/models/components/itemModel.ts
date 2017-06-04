import {CharacterModifyingElement} from './characterModifyingElement';

export class ItemModel extends CharacterModifyingElement {
  private constructor() {
    super();
  }
  itemType: ItemType;

  // Generic item variables
  name: string;
  equippable: boolean;
  requiresAttunement: boolean;

  // Armor variables
  armorType: ArmorType;

  // Weapon variables
  damage: string;
  damageType: string;
  light: boolean;
  heavy: boolean;
  twohanded: boolean;
  range: string; // 'melee' or range in feets

  public static ItemModel(name, equippable = true, requiresAttunement = true): ItemModel {
    let item: ItemModel = new ItemModel();
    item.itemType = ItemType.Item;

    item.name = name;
    item.equippable = equippable;
    item.requiresAttunement = requiresAttunement;

    return item;
  }
  public static ArmorModel(name, armorType, baseAC, maxDexBonus): ItemModel {
    let item: ItemModel = new ItemModel();
    item.itemType = ItemType.Armor;

    item.name = name;
    item.armorType = armorType;
    item.baseAC = baseAC;
    item.maxDexBonus = maxDexBonus;

    return item;
  }
  public static WeaponModel(name, damage, damageType): ItemModel {
    let item: ItemModel = new ItemModel();
    item.itemType = ItemType.Weapon;

    item.name = name;
    item.damage = damage;
    item.damageType = damageType;

    return item;
  }

  fillFromJSON(json) {
    if(json) {
      super.fillFromJSON(json);
      this.itemType = json.itemType;
      this.name = json.name;
      this.equippable = json.equippable;
      this.requiresAttunement = json.requiresAttunement;

      // Armor variables
      this.baseAC = json.baseAC;
      this.maxDexBonus = json.maxDexBonus;

      // Weapon variables
      this.damage = json.damage;
      this.damageType = json.damageType;
      this.range = json.range;
      this.light = json.light;
      this.heavy = json.heavy;
      this.twohanded = json.twohanded;
    }
  }
}

export enum ItemType {
  Item,
  WonderousItem,
  Artifact,
  Armor,
  Weapon,
}

export enum ArmorType {
  Clothing,
  Light,
  Medium,
  Heavy,
}
