import {inject, bindable} from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';
import {DataAccessor} from '../../data/dataAccessor';
import {LevelModel} from '../../data/models/components/levelModel';
import {ProfiencyModel} from '../../data/models/components/profiencyModel';
import {CharModEnums, SkillEnums} from '../../data/extra/enums';

@inject(DataAccessor, BindingSignaler)
export class Levels {
  constructor(private data: DataAccessor, private signaler: BindingSignaler) { }

  addNewLevel() {
    this.data.character.levels.push(new LevelModel("", 8));
  }
  removeLevel(level: LevelModel) {
    this.data.character.levels.splice(this.data.character.levels.indexOf(level), 1);
  }
}
