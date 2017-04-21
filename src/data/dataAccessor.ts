import {inject} from 'aurelia-framework';
import {CharacterAccessor} from './models/characterAccessor';
import {LevelModel} from './models/components/levelModel';
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
    this.openCharacter('Galadin');
  }

  save() {
    var char_data = JSON.stringify(this.character.model);
    var inv_data = JSON.stringify(this.inventory.model);

    var data = new Blob([char_data, '<&/>', inv_data], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    let textFile = window.URL.createObjectURL(data);

    var link = document.createElement('a');
    link.setAttribute('download', this.character.model.name + '.json');
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

  load(input) {
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
        this.character.model = JSON.parse(resArr[0]);
        this.inventory.model = JSON.parse(resArr[1]);
        input.value = '';
      };

      //read the file
      reader.readAsText(file);
    }
  }

  public openCharacter(charName:string) {
    if(charName === 'Galadin') {
      this.character.model.name = 'Galadin';

      // Parse level
      for(let i = 0; i < 16; i++) {
        this.character.model.levels.push(new LevelModel('Paladin', 10));
      }

      // Parse stats
      this.character.setStat(StatEnums.STR, 18);
      this.character.setStat(StatEnums.DEX, 8);
      this.character.setStat(StatEnums.CON, 16);
      this.character.setStat(StatEnums.INT, 8);
      this.character.setStat(StatEnums.WIS, 12);
      this.character.setStat(StatEnums.CHA, 18);

      // Parse skill profiencies
      this.character.addSkill(SkillEnums.ATHLETICS);

      // Parse all other profiencies
      this.character.addProfiency(new ProfiencyModel('Simple weapons', 'equipment'));
      this.character.addProfiency(new ProfiencyModel('Martial weapons', 'equipment'));
      this.character.addProfiency(new ProfiencyModel('Desert weapons', 'equipment'));
      this.character.addProfiency(new ProfiencyModel('Light armor', 'equipment'));
      this.character.addProfiency(new ProfiencyModel('Medium armor', 'equipment'));
      this.character.addProfiency(new ProfiencyModel('Heavy armor', 'equipment'));
      this.character.addProfiency(new ProfiencyModel('Shields', 'equipment'));
      this.character.addProfiency(new ProfiencyModel('Sami drum', 'instrument'));
      this.character.addProfiency(new ProfiencyModel('Nubian (elven)', 'language'));
      this.character.addProfiency(new ProfiencyModel('Trade common', 'language'));
      this.character.addProfiency(new ProfiencyModel('Druidic', 'language'));

      // Parse all traits
      this.character.addTrait(new TraitModel('Darkvision 120ft'));
      this.character.addTrait(new TraitModel('Keen Hearing'));

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

interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}
