import {SkillStats} from '../../data/extra/enums';
import {DataAccessor} from '../../data/dataAccessor';
import {ItemModel, ItemType} from '../../data/models/components/itemModel';
import {StatEnums} from '../../data/extra/enums';

export class AttackBonusValueConverter {
  toView(weapon: ItemModel, data: DataAccessor) {
    let ab = data.character.profiencyBonus;

    if(weapon.light) {
      ab += data.character.statModifier(StatEnums.DEX);
    }
    else {
      ab += data.character.statModifier(StatEnums.STR);
    }

    for(let item of data.inventory.equipped) {
      if(item.bonusAB) {
        if(item.itemType === ItemType.Weapon) {
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
