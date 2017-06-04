import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';
import {StatEnums} from '../../data/extra/enums';
import {ArmorType} from '../../data/models/components/itemModel';

@inject(DataAccessor)
export class Combat {
  constructor(private data: DataAccessor) { }

  get armorClass(): number {
    let ac = 10;

    if(this.data.inventory.armor) {
      ac = this.data.inventory.armor.baseAC;

      if(this.data.inventory.armor.armorType !== ArmorType.Heavy) {
        ac += Math.min(this.data.character.statModifier(StatEnums.DEX), this.data.inventory.armor.maxDexBonus);
      }
    }
    else {
      ac += this.data.character.statModifier(StatEnums.DEX);
    }

    return ac;
  }

  get initiative() {
    return this.data.character.statModifier(StatEnums.DEX);
  }

  get speed() {
    return this.data.character.speed;
  }

  get currentHP() {
    return this.data.character.currentHP;
  }
  set currentHP(value: number) {
    this.data.character.currentHP = value;
  }

  tempHP = 0;
  get temporaryHP(): number {
    return this.tempHP;
  }
  set temporaryHP(value: number) {
    this.tempHP = value;
  }

  get maxHD(): number {
    return this.data.character.maxHD;
  }
  get currentHD(): number {
    return this.data.character.currentHD;
  }
  set currentHD(value: number) {
    this.data.character.currentHD = value;
  }

  get hitDie() {
    return this.data.character.levels[0].hd;
  }

  savingThrow(stat: StatEnums) {

  }
}
