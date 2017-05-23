import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel, WeaponModel, ArmorModel, ArmorType} from '../../../data/models/components/itemModel';
import {SkillEnums} from '../../../data/extra/enums';
import {ProfiencyModel} from '../../../data/models/components/profiencyModel';
import {TraitModel} from '../../../data/models/components/traitModel';
import {ItemPopup} from './itemPopup';

@inject(DataAccessor)
export class EditItem extends ItemPopup {
  constructor(data: DataAccessor) {
    super(data);
  }

  @bindable
  cancelItem: Function;

  @bindable
  itemToEdit: ItemModel = null;
  private itemToEditChanged(newValue: string, oldValue: string): void {
    if(newValue) {
      this.setup();
    }
  }

  setup() {
    // only setup if item is present
    if(!this.itemToEdit) {
      return;
    }

    this.name = this.itemToEdit.name;
    this.equippable = this.itemToEdit.equippable;
    this.attunement = this.itemToEdit.requiresAttunement;
    this.bonusAC = this.itemToEdit.bonusAC;

    // JSON to deep copy the arrays
    this.additionalSkillProfiencies = JSON.parse(JSON.stringify(this.itemToEdit.additionalSkillProfiencies));
    this.additionalOtherProfiencies = JSON.parse(JSON.stringify(this.itemToEdit.additionalOtherProfiencies));
    this.additionalTraits = JSON.parse(JSON.stringify(this.itemToEdit.additionalTraits));
    this.setStats = JSON.parse(JSON.stringify(this.itemToEdit.setStats));
    this.addToStats = JSON.parse(JSON.stringify(this.itemToEdit.addToStats));
    console.log(this.itemToEdit.addToStats);
    console.log(this.addToStats);

    // setup armor
    if(this.itemToEdit instanceof ArmorModel) {
      this.selectedType = 'armor';
      this.baseAC = this.itemToEdit.baseAC;
      this.maxDexBonus = this.itemToEdit.maxDexBonus;
    }
    else if(this.itemToEdit instanceof WeaponModel) {
      this.selectedType = 'weapon';
      this.damage = this.itemToEdit.damage;
      this.damageType = this.itemToEdit.damageType;
    }
    else if(this.itemToEdit instanceof ItemModel) {
      this.selectedType = 'item';
    }
  }

  saveItem() {
    this.itemToEdit.name = this.name;
    this.itemToEdit.equippable = this.equippable;
    this.itemToEdit.requiresAttunement = this.attunement;
    this.itemToEdit.bonusAC = this.bonusAC;

    this.itemToEdit.additionalSkillProfiencies = this.additionalSkillProfiencies;
    this.itemToEdit.additionalOtherProfiencies = this.additionalOtherProfiencies;
    this.itemToEdit.additionalTraits = this.additionalTraits;
    this.itemToEdit.setStats = this.setStats;
    this.itemToEdit.addToStats = this.addToStats;
    console.log(this.addToStats);

    // setup armor
    if(this.itemToEdit instanceof ArmorModel) {
      this.itemToEdit.baseAC = this.baseAC;
      this.itemToEdit.maxDexBonus = this.maxDexBonus;
    }
    else if(this.itemToEdit instanceof WeaponModel) {
      this.itemToEdit.damage = this.damage;
      this.itemToEdit.damageType = this.damageType;
    }
    else if(this.itemToEdit instanceof ItemModel) {
    }

    this.reset();
  }
}
