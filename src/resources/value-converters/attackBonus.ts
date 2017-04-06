import {SkillStats} from '../../data/extra/enums';
import {DataAccessor} from '../../data/dataAccessor';
import {WeaponModel} from '../../data/models/components/itemModel';
import {StatEnums} from '../../data/extra/enums';

export class AttackBonusValueConverter {
  toView(weapon: WeaponModel, data: DataAccessor) {
    let ab = data.character.profiencyBonus;

    if(weapon.light) {
      ab += data.character.statModifier(StatEnums.DEX);
    }
    else {
      ab += data.character.statModifier(StatEnums.STR);
    }

    for(let item of data.inventory.equipped) {
      if(item.bonusAB) {
        if(item instanceof WeaponModel) {
          if(item === weapon) {
            ab += item.bonusAB;
          }
        }
        else {
          ab += item.bonusAB;
        }
      }
    }

    return "+" + ab;
  }
}
