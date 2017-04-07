import {inject} from 'aurelia-framework';
import {CharacterModel, LevelModel} from './models/characterModel';
import {InventoryModel} from './models/inventoryModel';
import {Translations} from './extra/translations';
import {TraitModel} from './models/components/traitModel';
import {ItemModel, ArmorModel, WeaponModel, ArmorType} from './models/components/itemModel';
import {StatEnums, SkillEnums} from './extra/enums';
import {Profiency} from './models/components/profiency';

@inject(CharacterModel, InventoryModel, Translations)
export class DataAccessor {
  constructor(public character: CharacterModel, public inventory: InventoryModel, public translations: Translations) {
    this.openCharacter('Galadin');
  }

  public openCharacter(charName:string) {
    if(charName === 'Galadin') {
      this.character.name = 'Galadin';

      // Parse level
      for(let i = 0; i < 16; i++) {
        this.character.levels.push(new LevelModel('Paladin', 10));
      }

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
      let arm1 = new ArmorModel('Adamantium full plate', ArmorType.Heavy, 18, 0);
      arm1.additionalTraits.push(new TraitModel('Critical hit immunity'));
      this.inventory.equip(arm1);

      let wep1 = new WeaponModel('Greatsword +2', '2d6+2', 'Slashing');
      wep1.bonusAB = 2;
      this.inventory.equip(wep1);

      let wep2 = new WeaponModel('Javelin', '1d6', 'Piercing');
      this.inventory.equip(wep2);

      let item2 = new ItemModel('Torch');
      this.inventory.moveToBackpack(item2);

    }
  }
}
