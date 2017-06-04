import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {ItemModel, ItemType, ArmorType} from '../../../data/models/components/itemModel';
import {CharacterModifyingElement, SetStatModel, AddToStatModel} from '../../../data/models/components/characterModifyingElement';
import {SkillEnums, StatEnums} from '../../../data/extra/enums';
import {ProfiencyModel} from '../../../data/models/components/profiencyModel';
import {TraitModel} from '../../../data/models/components/traitModel';

@inject(DataAccessor)
export class ItemPopup {
  constructor(protected data: DataAccessor) {
    this.reset();
  }

  protected innerModel: ItemModel;

  @bindable
  saveItem: Function;

  @bindable
  cancelItem: Function;

  @bindable
  model: ItemModel = null;
  private modelChanged(newValue: ItemModel, oldValue: ItemModel): void {
    if(newValue) {
      this.setup();
    }
  }

  private setup() {
    this.innerModel = ItemModel.ItemModel("");
    if(this.model) {
      this.innerModel.fillFromJSON(JSON.stringify(this.model));
    }
  }

  reset() {
    if(this.cancelItem) {
      this.cancelItem({item: this});
    }
  }

  createItemInternal() {
    var item = ItemModel.ItemModel(name);
    item.fillFromJSON(JSON.stringify(this.innerModel));

    this.saveItem({item: item});
    this.reset();
  }
}
