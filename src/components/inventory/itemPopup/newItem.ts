import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel, WeaponModel, ArmorModel, ArmorType} from '../../../data/models/components/itemModel';
import {SkillEnums} from '../../../data/extra/enums';
import {CharacterModifyingElement, SetStatModel, AddToStatModel} from '../../../data/models/components/characterModifyingElement';
import {ProfiencyModel} from '../../../data/models/components/profiencyModel';
import {TraitModel} from '../../../data/models/components/traitModel';
import {ItemPopup} from './itemPopup';

@inject(DataAccessor)
export class NewItem extends ItemPopup {
  constructor(data: DataAccessor) {
    super(data);
  }

  @bindable
  cancelItem: Function;

  @bindable
  createItem: Function;

  createItemInternal() {
    var item;
    if(this.selectedType === 'armor') {
      item = new ArmorModel(this.name, ArmorType.Medium, this.baseAC, this.maxDexBonus);
    }
    else if(this.selectedType === 'weapon') {
      item = new WeaponModel(this.name, this.damage, this.damageType);
    }
    else {
      item = new ItemModel(this.name, true);
    }
    item.equippable = this.equippable;
    item.otherProfiencies = this.otherProfiencies;
    item.skillProfiencies = this.skillProfiencies;
    item.traits = this.traits;
    item.setStats = this.setStats;
    item.addToStats = this.addToStats;

    this.createItem({item: item});
    this.reset();
  }
}
