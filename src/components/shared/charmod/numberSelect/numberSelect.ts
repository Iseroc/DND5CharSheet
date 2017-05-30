import {inject, bindable, containerless} from 'aurelia-framework';
import {DataAccessor} from '../../../../data/dataAccessor';

@inject(DataAccessor)
@containerless
export class NumberSelect {
  constructor(private data: DataAccessor) { }

  @bindable
  model: number;

  @bindable
  text: string;

  @bindable
  removeMethod: Function;
}
