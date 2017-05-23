import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel, WeaponModel, ArmorModel, ArmorType} from '../../../data/models/components/itemModel';
import {CharacterModifyingElement, SetStatModel, AddToStatModel} from '../../../data/models/components/characterModifyingElement';
import {SkillEnums} from '../../../data/extra/enums';
import {ProfiencyModel} from '../../../data/models/components/profiencyModel';
import {TraitModel} from '../../../data/models/components/traitModel';

@inject(DataAccessor)
export class ItemPopup {
  constructor(protected data: DataAccessor) {
    this.reset();
  }

  protected innerModel: CharacterModifyingElement = new CharacterModifyingElement();

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

  get additionalSkillProfiencies(): SkillEnums[] {
    return this.innerModel.additionalSkillProfiencies;
  }
  set additionalSkillProfiencies(value: SkillEnums[]) {
    this.innerModel.additionalSkillProfiencies = value;
  }

  get additionalOtherProfiencies(): ProfiencyModel[] {
    return this.innerModel.additionalOtherProfiencies;
  }
  set additionalOtherProfiencies(value: ProfiencyModel[]) {
    this.innerModel.additionalOtherProfiencies = value;
  }

  get additionalTraits(): TraitModel[] {
    return this.innerModel.additionalTraits;
  }
  set additionalTraits(value: TraitModel[]) {
    this.innerModel.additionalTraits = value;
  }

  get setStats(): SetStatModel[] {
    return this.innerModel.setStats;
  }
  set setStats(value: SetStatModel[]) {
    this.innerModel.setStats = value;
  }

  get addToStats(): AddToStatModel[] {
    return this.innerModel.addToStats;
  }
  set addToStats(value: AddToStatModel[]) {
    this.innerModel.addToStats = value;
  }

  reset() {
    this.name = '';
    this.selectedType = 'item';
    this.equippable = false;
    this.attunement = false;

    this.innerModel = new CharacterModifyingElement();

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
