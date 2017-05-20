import {inject} from 'aurelia-framework';
import {DataAccessor} from '../../data/dataAccessor';
import {ProfiencyModel} from '../../data/models/components/profiencyModel'
import {TraitModel} from '../../data/models/components/traitModel'

@inject(DataAccessor)
export class Character {
  constructor(private data: DataAccessor) { }
}
