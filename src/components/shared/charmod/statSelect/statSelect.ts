import {inject, bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../../data/dataAccessor';
import {StatEnums} from '../../../../data/extra/enums';
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(DataAccessor, BindingSignaler)
export class StatSelect {
  constructor(private data: DataAccessor, private signaler: BindingSignaler) { }

  @bindable
  currentStat: StatEnums;

  @bindable
  list: StatEnums[];

  private currentStatChanged(newValue: StatEnums, oldValue: StatEnums): void {
    if(newValue && this.list) {
      this.list.splice(this.list.indexOf(oldValue), 1, newValue);
      this.signaler.signal('stat-list-changed');
    }
  }
}
