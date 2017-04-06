import {SkillStats} from '../../data/extra/enums';

export class SelectValueConverter {
  toView(array, filterValue) {
    return array.filter(function(item) {
      return SkillStats.get(item) === filterValue;
    });
  }
}
