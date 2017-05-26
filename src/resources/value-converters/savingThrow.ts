import {SkillStats} from '../../data/extra/enums';
import {DataAccessor} from '../../data/dataAccessor';
import {WeaponModel} from '../../data/models/components/itemModel';
import {StatEnums} from '../../data/extra/enums';

export class SavingThrowValueConverter {
  toView(stat: StatEnums, data: DataAccessor) {
    return data.savingThrow(stat);
  }
}
