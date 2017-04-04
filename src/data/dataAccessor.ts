import {inject} from 'aurelia-framework';
import {CharacterModel} from './models/characterModel';
import {InventoryModel} from './models/inventoryModel';
import {Translations} from './extra/translations';
import {TraitModel} from './models/components/traitModel';
import {ItemModel, ArmorModel, WeaponModel} from './models/components/itemModel';
import {StatEnums, SkillEnums} from './extra/enums';
import {Profiency} from './models/components/profiency';

@inject(CharacterModel, InventoryModel, Translations)
export class DataAccessor {
  constructor(public character: CharacterModel, public inventory: InventoryModel, public translations: Translations) {
    this.openCharacter('Galadin');
  }

  public openCharacter(charName:string) {
    if(charName === 'Galadin') {
      // Parse level
      this.character.level = 16;

      // Parse stats
      this.character.stats.set(StatEnums.STR, 18);
      this.character.stats.set(StatEnums.DEX, 8);
      this.character.stats.set(StatEnums.CON, 16);
      this.character.stats.set(StatEnums.INT, 8);
      this.character.stats.set(StatEnums.WIS, 12);
      this.character.stats.set(StatEnums.CHA, 18);

      // Parse skill profiencies
      this.character.skills.push(SkillEnums.ATHLETICS);

      // Parse all other profiencies
      this.character.profiencies.push(new Profiency('Simple weapons', 'equipment'));
      this.character.profiencies.push(new Profiency('Martial weapons', 'equipment'));
      this.character.profiencies.push(new Profiency('Desert weapons', 'equipment'));
      this.character.profiencies.push(new Profiency('Light armor', 'equipment'));
      this.character.profiencies.push(new Profiency('Medium armor', 'equipment'));
      this.character.profiencies.push(new Profiency('Heavy armor', 'equipment'));
      this.character.profiencies.push(new Profiency('Shields', 'equipment'));
      this.character.profiencies.push(new Profiency('Sami drum', 'instrument'));
      this.character.profiencies.push(new Profiency('Nubian (elven)', 'language'));
      this.character.profiencies.push(new Profiency('Trade common', 'language'));
      this.character.profiencies.push(new Profiency('Druidic', 'language'));

      // Parse all traits
      this.character.traits.push(new TraitModel('Darkvision 120ft'));
      this.character.traits.push(new TraitModel('Keen Hearing'));

      // Parse inventory
      let item = new ArmorModel('Adamantium full plate', 18, 0);
      item.additionalTraits.push(new TraitModel('Critical hit immunity'));
      this.inventory.equipped.push(item);

      let item2 = new ItemModel('Torch');
      this.inventory.backpack.push(item2);
    }
  }
}
