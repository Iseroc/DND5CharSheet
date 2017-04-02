import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';

@inject(DataAccessor)
export class Spells {
  constructor(private data: DataAccessor) { }
}
