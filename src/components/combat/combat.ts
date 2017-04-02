import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';

@inject(DataAccessor)
export class Combat {
  constructor(private data: DataAccessor) { }
}
