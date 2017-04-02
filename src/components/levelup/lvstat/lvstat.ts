import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {StatEnums} from '../../../data/extra/enums';

@inject(DataAccessor)
export class Lvstat {
  constructor(private data: DataAccessor) { }

  @bindable
  model: StatEnums;

  get name() {
    return this.data.translations.translateStat(this.model);
  }

  get value() {
    return this.data.character.stats.get(this.model);
  }

  set value(value: number) {
    this.data.character.stats.set(this.model, value);
  }
}
