import {inject, bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {WeaponModel} from '../../../data/models/components/itemModel';

@inject(DataAccessor)
export class Weapon {
  constructor(private data: DataAccessor) { }

  @bindable
  model: WeaponModel;

  get attackBonus(): number {
    return this.data.character.profiencyBonus;
  }
}
