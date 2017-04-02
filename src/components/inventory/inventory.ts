import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';

@inject(DataAccessor)
export class Inventory {
  constructor(private data: DataAccessor) { }
}
