import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {StatEnums} from '../../../data/extra/enums';

@inject(DataAccessor)
export class Stat {
  constructor(private data: DataAccessor) { }

  @bindable
  model: [StatEnums, number];

  get name(): string {
    if(this.model) {
      return this.data.translations.translateStat(this.model[0]);
    }
    return "N/A";
  }

  get value(): number {
    if(this.model) {
      return this.model[1];
    }
    return -1000;
  }
}
