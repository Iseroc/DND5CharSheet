import {inject} from 'aurelia-framework';
import {CharacterAccessor} from './models/characterAccessor';
import {LevelModel} from './models/components/levelModel';
import {AddToStatModel, SetStatModel} from './models/components/characterModifyingElement';
import {RaceModel} from './models/components/raceModel';
import {InventoryAccessor} from './models/inventoryAccessor';
import {Translations} from './extra/translations';
import {TraitModel} from './models/components/traitModel';
import {ItemModel, ArmorType} from './models/components/itemModel';
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
    this.character.setStat(StatEnums.CON, 14);
    this.character.setStat(StatEnums.INT, 8);
    this.character.setStat(StatEnums.WIS, 10);
    this.character.setStat(StatEnums.CHA, 16);

    // Parse skill profiencies
    this.character.levels[0].skillProfiencies.push(SkillEnums.ATHLETICS);

    // Parse all other profiencies
    this.character.levels[0].otherProfiencies.push(new ProfiencyModel('Simple weapons'));
    this.character.levels[0].otherProfiencies.push(new ProfiencyModel('Martial weapons'));
    this.character.levels[0].otherProfiencies.push(new ProfiencyModel('Desert weapons'));
    this.character.levels[0].otherProfiencies.push(new ProfiencyModel('All armor'));
    this.character.levels[0].otherProfiencies.push(new ProfiencyModel('Shields'));
    this.character.levels[0].otherProfiencies.push(new ProfiencyModel('Sami drum'));
    this.character.levels[0].traits.push(new TraitModel('Divine Sense'));
    this.character.levels[0].traits.push(new TraitModel('Lay on Hands'));
    this.character.levels[0].saveProfiencies.push(StatEnums.CHA);
    this.character.levels[0].saveProfiencies.push(StatEnums.WIS);

    this.character.levels[1].traits.push(new TraitModel('Great Weapon Fighting'));
    this.character.levels[1].traits.push(new TraitModel('Divine Smite'));

    this.character.levels[2].traits.push(new TraitModel('Divine Health'));
    this.character.levels[2].traits.push(new TraitModel('Oath of Vengeance'));

    this.character.levels[4].traits.push(new TraitModel('Extra Attack'));

    this.character.levels[5].traits.push(new TraitModel('Aura of Protection'));
    this.character.levels[5].bonusToSaves = 4;

    this.character.levels[6].traits.push(new TraitModel('Relentless Avenger'));

    this.character.levels[9].traits.push(new TraitModel('Aura of Courage'));

    this.character.levels[13].traits.push(new TraitModel('Cleansing Touch'));

    this.character.levels[14].traits.push(new TraitModel('Soul of Vengeance'));

    this.character.levels[15].addToStats.push(new AddToStatModel(StatEnums.CHA, 2));

    // Parse all traits
    this.character.race.traits.push(new TraitModel('Darkvision 120ft'));
    this.character.race.traits.push(new TraitModel('Desert Nomad'));
    this.character.race.traits.push(new TraitModel('Trance'));
    this.character.race.traits.push(new TraitModel('Fey Ancestry'));
    this.character.race.traits.push(new TraitModel('Keen Senses'));
    this.character.race.traits.push(new TraitModel('Blessing of Light'));
    this.character.race.traits.push(new TraitModel('Blessing of Understanding'));
    this.character.race.otherProfiencies.push(new ProfiencyModel('Nubian (elven)'));
    this.character.race.otherProfiencies.push(new ProfiencyModel('Trade common'));
    this.character.race.otherProfiencies.push(new ProfiencyModel('Druidic'));
    this.character.race.skillProfiencies.push(SkillEnums.PERCEPTION);
    this.character.race.addToStats.push(new AddToStatModel(StatEnums.CON, 2));
    this.character.race.addToStats.push(new AddToStatModel(StatEnums.WIS, 2));

    // Parse inventory
    let arm1 = ItemModel.ArmorModel('Adamantium full plate', ArmorType.Heavy, 18, 0);
    arm1.traits.push(new TraitModel('Critical hit immunity'));
    this.inventory.equip(arm1);

    let wep1 = ItemModel.WeaponModel('Greatsword of Life Stealing +1', '2d6+1', 'Slashing');
    wep1.bonusAB = 1;
    this.inventory.equip(wep1);

    let wep2 = ItemModel.WeaponModel('Javelin', '1d6', 'Piercing');
    this.inventory.equip(wep2);

    let cloak = ItemModel.ItemModel('Cloak of Protection', true, true);
    cloak.bonusAC = 1;
    cloak.bonusToSaves = 1;
    this.inventory.equip(cloak);

    let gloves = ItemModel.ItemModel('Belt of Frost Giant Strength', true, true);
    gloves.setStats.push(new SetStatModel(StatEnums.STR, 23));
    this.inventory.equip(gloves);

    let item2 = ItemModel.ItemModel('Torch');
    this.inventory.moveToBackpack(item2);
  }

  get charModArrays(): any[] {
    return [this.inventory.equipped, this.character.levels, [this.character.race]];
  }

  // **************** //
  // Public functions //
  // **************** //

  public statValue(statKey: StatEnums, base: boolean = false): number {
    let val: number = this.character.getStat(statKey);
    if(!base) {
      let max = 0;

      for(let list of this.charModArrays) {
        for(let item of list) {
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
      }

      // Check of the modified base stat is smaller than the largest SET value
      val = Math.max(val, max);
    }

    return val;
  }

  public statModifier(statKey: StatEnums): number {
    return Math.floor((this.statValue(statKey) - 10) / 2);
  }

  public savingThrow(statKey: StatEnums) {
    let save = this.statModifier(statKey);
    let prof = false;

    // Check equipped items for save profiencies
    for(let list of this.charModArrays) {
      for(let item of list) {
        if(!prof) {
          for(let saveprof of item.saveProfiencies) {
            if(saveprof === statKey) {
              prof = true;
            }
          }
        }
        if(item.bonusToSaves) {
          save += item.bonusToSaves;
        }
      }
    }

    if(prof) {
      save += this.character.profiencyBonus;
    }

    return save;
  }
}
