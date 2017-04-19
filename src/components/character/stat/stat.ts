import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {StatEnums} from '../../../data/extra/enums';

@inject(DataAccessor)
export class Stat {
  constructor(private data: DataAccessor) { }

  @bindable
  editMode: boolean = false;

  @bindable
  model: StatEnums;

  get name(): string {
    if(this.model) {
      return this.data.translations.translateStat(this.model);
    }
    return "N/A";
  }

  get value(): number {
    if(this.model) {
      return this.data.character.getStat(this.model);
    }
    return -1000;
  }
  set value(value:number) {
    if(this.model) {
      this.data.character.setStat(this.model, value);
    }
  }

  add() {
    this.value += 1;
  }
  subtract() {
    this.value -= 1;
  }
}
