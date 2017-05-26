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

      if(this.data.inventory.armor.type !== ArmorType.Heavy) {
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

  currentHD = 16;
  get hitDieNumber(): number {
    return this.currentHD;
  }
  set hitDieNumber(value: number) {
    this.currentHD = value;
  }

  get hitDie() {
    return '10';
  }

  savingThrow(stat: StatEnums) {
    
  }
}
