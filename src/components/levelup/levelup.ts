import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';

@inject(DataAccessor)
export class Levelup {
  constructor(private data: DataAccessor) { }
}
