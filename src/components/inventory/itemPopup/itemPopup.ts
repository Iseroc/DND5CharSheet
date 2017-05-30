import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel, WeaponModel, ArmorModel, ArmorType} from '../../../data/models/components/itemModel';
import {CharacterModifyingElement, SetStatModel, AddToStatModel} from '../../../data/models/components/characterModifyingElement';
import {SkillEnums, StatEnums} from '../../../data/extra/enums';
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
  maxDexBonus: number = 8;

  damage: string = '';
  damageType: string = '';

  get skillProfiencies(): SkillEnums[] {
    return this.innerModel.skillProfiencies;
  }
  set skillProfiencies(value: SkillEnums[]) {
    this.innerModel.skillProfiencies = value;
  }

  get otherProfiencies(): ProfiencyModel[] {
    return this.innerModel.otherProfiencies;
  }
  set otherProfiencies(value: ProfiencyModel[]) {
    this.innerModel.otherProfiencies = value;
  }

  get traits(): TraitModel[] {
    return this.innerModel.traits;
  }
  set traits(value: TraitModel[]) {
    this.innerModel.traits = value;
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

  get saveProfiencies(): StatEnums[] {
    return this.innerModel.saveProfiencies;
  }
  set saveProfiencies(value: StatEnums[]) {
    this.innerModel.saveProfiencies = value;
  }

  get bonusAB(): number {
    return this.innerModel.bonusAB;
  }
  set bonusAB(value: number) {
    this.innerModel.bonusAB = value;
  }

  get bonusAC(): number {
    return this.innerModel.bonusAC;
  }
  set bonusAC(value: number) {
    this.innerModel.bonusAC = value;
  }

  get bonusToSaves(): number {
    return this.innerModel.bonusToSaves;
  }
  set bonusToSaves(value: number) {
    this.innerModel.bonusToSaves = value;
  }

  reset() {
    this.name = '';
    this.selectedType = 'item';
    this.equippable = false;
    this.attunement = false;

    this.innerModel = new CharacterModifyingElement();

    this.baseAC = 10;
    this.maxDexBonus = 8;

    this.damage = '';
    this.damageType = '';

    if(this.cancelItem) {
      this.cancelItem({item: this});
    }
  }
}
