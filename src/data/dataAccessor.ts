import {inject} from 'aurelia-framework';
import {CharacterAccessor} from './models/characterAccessor';
import {LevelModel} from './models/components/levelModel';
import {AddToStatModel} from './models/components/characterModifyingElement';
import {RaceModel} from './models/components/raceModel';
import {InventoryAccessor} from './models/inventoryAccessor';
import {Translations} from './extra/translations';
import {TraitModel} from './models/components/traitModel';
import {ItemModel, ArmorModel, WeaponModel, ArmorType} from './models/components/itemModel';
import {StatEnums, SkillEnums} from './extra/enums';
import {ProfiencyModel} from './models/components/profiencyModel';
//import {FileSaver} from 'file-saver';

@inject(CharacterAccessor, InventoryAccessor, Translations)
export class DataAccessor {
  constructor(public character: CharacterAccessor, public inventory: InventoryAccessor, public translations: Translations) {
    this.loadFromLocalStorage();
    this.intervalID = setInterval(this.periodicSave.bind(this), 5000);
  }

  // **************** //
  // Local storage    //
  // **************** //

  private intervalID;

  private loadFromLocalStorage() {
    this.character.CharacterDataJSON = localStorage.getItem("character");
    this.inventory.InventoryDataJSON = localStorage.getItem("inventory");
  }

  private periodicSave() {
    localStorage.setItem("character", this.character.CharacterDataJSON);
    localStorage.setItem("inventory", this.inventory.InventoryDataJSON);
    console.log("Saved to localStorage");
  }

  // **************** //
  // File management  //
  // **************** //

  save() {
    var char_data = this.character.CharacterDataJSON;
    var inv_data = this.inventory.InventoryDataJSON;

    var data = new Blob([char_data, '<&/>', inv_data], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    let textFile = window.URL.createObjectURL(data);

    var link = document.createElement('a');
    link.setAttribute('download', this.character.name + '.json');
    link.href = textFile;
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
      window.URL.revokeObjectURL(textFile);
    });
  }

  sendClickEvent(input) {
    var event = new MouseEvent('click');
    input.dispatchEvent(event);
  }

  loadFile(input) {
    var files = input.files;

    let file = files.item(0);
    if(file) {
      let reader = new FileReader();

      //make a reader and set up a trigger on the "read" event
      reader.onload = () => {
        var resArr = reader.result.split('<&/>');
        this.character.CharacterDataJSON = resArr[0];
        this.inventory.InventoryDataJSON = resArr[1];
        input.value = '';
      };

      //read the file
      reader.readAsText(file);
    }
  }

  resetCharacter() {
    this.character.reset();
    this.inventory.reset();

    this.character.name = 'Galadin';

    this.character.currentHP = 99;

    this.character.race = new RaceModel("Human");

    // Parse level
    for(let i = 0; i < 16; i++) {
      this.character.addLevel(new LevelModel('Paladin', 10));
    }

    // Parse stats
    this.character.setStat(StatEnums.STR, 18);
    this.character.setStat(StatEnums.DEX, 8);
    this.character.setStat(StatEnums.CON, 16);
    this.character.setStat(StatEnums.INT, 8);
    this.character.setStat(StatEnums.WIS, 12);
    this.character.setStat(StatEnums.CHA, 16);

    // Parse skill profiencies
    this.character.levels[0].additionalSkillProfiencies.push(SkillEnums.ATHLETICS);

    // Parse all other profiencies
    this.character.levels[0].additionalOtherProfiencies.push(new ProfiencyModel('Simple weapons'));
    this.character.levels[0].additionalOtherProfiencies.push(new ProfiencyModel('Martial weapons'));
    this.character.levels[0].additionalOtherProfiencies.push(new ProfiencyModel('Desert weapons'));
    this.character.levels[0].additionalOtherProfiencies.push(new ProfiencyModel('Light armor'));
    this.character.levels[0].additionalOtherProfiencies.push(new ProfiencyModel('Medium armor'));
    this.character.levels[0].additionalOtherProfiencies.push(new ProfiencyModel('Heavy armor'));
    this.character.levels[0].additionalOtherProfiencies.push(new ProfiencyModel('Shields'));
    this.character.levels[0].additionalOtherProfiencies.push(new ProfiencyModel('Sami drum'));

    // Level 16
    this.character.levels[15].addToStats.push(new AddToStatModel(StatEnums.CHA, 2));

    // Parse all traits
    this.character.race.additionalTraits.push(new TraitModel('Darkvision 120ft'));
    this.character.race.additionalTraits.push(new TraitModel('Desert Nomad'));
    this.character.race.additionalTraits.push(new TraitModel('Fey Ancestry'));
    this.character.race.additionalTraits.push(new TraitModel('Keen Senses'));
    this.character.race.additionalOtherProfiencies.push(new ProfiencyModel('Nubian (elven)'));
    this.character.race.additionalOtherProfiencies.push(new ProfiencyModel('Trade common'));
    this.character.race.additionalOtherProfiencies.push(new ProfiencyModel('Druidic'));
    this.character.race.additionalSkillProfiencies.push(SkillEnums.PERCEPTION);

    // Parse inventory
    let arm1 = new ArmorModel('Adamantium full plate', ArmorType.Heavy, 18, 0);
    arm1.additionalTraits.push(new TraitModel('Critical hit immunity'));
    this.inventory.equip(arm1);

    let wep1 = new WeaponModel('Greatsword of Life Stealing +1', '2d6+1', 'Slashing');
    wep1.bonusAB = 2;
    this.inventory.equip(wep1);

    let wep2 = new WeaponModel('Javelin', '1d6', 'Piercing');
    this.inventory.equip(wep2);

    let item2 = new ItemModel('Torch');
    this.inventory.moveToBackpack(item2);
  }

  // **************** //
  // Public functions //
  // **************** //

  public statValue(statKey: StatEnums, base: boolean = false): number {
    let val: number = this.character.getStat(statKey);
    if(!base) {
      let max = val;

      // Loop through all equipped items
      for(let item of this.inventory.equipped) {
        for(let setstat of item.setStats) {
          if(setstat.stat === statKey) {
            max = Math.max(max, setstat.value);
          }
        }
        for(let addstat of item.addToStats) {
          if(addstat.stat === statKey) {
            val += addstat.value as number;
          }
        }
      }

      // Loop through all levels
      for(let level of this.character.levels) {
        for(let setstat of level.setStats) {
          if(setstat.stat === statKey) {
            max = Math.max(max, setstat.value);
          }
        }
        for(let addstat of level.addToStats) {
          if(addstat.stat === statKey) {
            val += addstat.value as number;
          }
        }
      }

      // Loop through race
      for(let setstat of this.character.race.setStats) {
        if(setstat.stat === statKey) {
          max = Math.max(max, setstat.value);
        }
      }
      for(let addstat of this.character.race.addToStats) {
        if(addstat.stat === statKey) {
          val += addstat.value as number;
        }
      }
      val = Math.max(val, max);
    }
    return val;
  }
  public statModifier(statKey: StatEnums): number {
    return Math.floor((this.statValue(statKey) - 10) / 2);
  }
}
