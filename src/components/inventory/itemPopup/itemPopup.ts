import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel, WeaponModel, ArmorModel, ArmorType} from '../../../data/models/components/itemModel';
import {SkillEnums} from '../../../data/extra/enums';
import {ProfiencyModel} from '../../../data/models/components/profiencyModel';
import {TraitModel} from '../../../data/models/components/traitModel';

@inject(DataAccessor)
export class ItemPopup {
  constructor(protected data: DataAccessor) {
    this.reset();
  }

  @bindable
  cancelItem: Function;

  name: string = '';
  selectedType: string = 'item';

  _equippable: boolean = false;
  get equippable() {
    return this.selectedType === 'armor' || this.selectedType === 'weapon' || this._equippable;
  }
  set equippable(val:boolean) {
    this._equippable = val;
  }

  attunement: boolean = false;

  baseAC: number = 10;
  bonusAC: number = 0;
  maxDexBonus: number = 8;

  damage: string = '';
  damageType: string = '';

  additionalSkillProfiencies: SkillEnums[] = [];
  selectedSkillProfiency: SkillEnums = SkillEnums.ACROBATICS;

  addSkillProfiency() {
    if(!this.additionalSkillProfiencies.includes(this.selectedSkillProfiency)) {
      this.additionalSkillProfiencies.push(this.selectedSkillProfiency);
    }
  }

  additionalOtherProfiencies: ProfiencyModel[] = [];
  newOtherProfiencyName: string = '';

  addOtherProfiency() {
    if(this.newOtherProfiencyName) {
      this.additionalOtherProfiencies.push(new ProfiencyModel(this.newOtherProfiencyName, 'other'));
      this.newOtherProfiencyName = '';
    }
  }

  additionalTraits: TraitModel[] = [];
  newTraitName: string;

  addTrait() {
    if(this.newTraitName) {
      this.additionalTraits.push(new TraitModel(this.newTraitName));
      this.newTraitName = '';
    }
  }

  reset() {
    this.name = '';
    this.selectedType = 'item';
    this.equippable = false;
    this.attunement = false;

    this.additionalSkillProfiencies = [];
    this.selectedSkillProfiency = SkillEnums.ACROBATICS;

    this.additionalOtherProfiencies = [];
    this.newOtherProfiencyName = '';

    this.additionalTraits = [];
    this.newTraitName = '';

    this.baseAC = 10;
    this.bonusAC = 0;
    this.maxDexBonus = 8;

    this.damage = '';
    this.damageType = '';

    if(this.cancelItem) {
      this.cancelItem({item: this});
    }
  }
}
