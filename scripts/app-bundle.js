var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "./data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let App = class App {
        constructor(data) {
            this.data = data;
        }
        configureRouter(config, router) {
            config.title = 'Contacts';
            config.map([
                { route: '', moduleId: 'components/character/character', title: 'CHA', nav: true },
                { route: 'inventory', moduleId: 'components/inventory/inventory', title: 'INV', nav: true },
                { route: 'combat', moduleId: 'components/combat/combat', title: 'COM', nav: true },
                { route: 'spells', moduleId: 'components/spells/spells', title: 'SPE', nav: true },
                { route: 'levels', moduleId: 'components/levels/levels', title: 'LVL', nav: true },
            ]);
            this.router = router;
        }
    };
    App = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], App);
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(() => aurelia.setRoot());
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('data/dataAccessor',["require", "exports", "aurelia-framework", "./models/characterAccessor", "./models/components/levelModel", "./models/components/characterModifyingElement", "./models/components/raceModel", "./models/inventoryAccessor", "./extra/translations", "./models/components/traitModel", "./models/components/itemModel", "./extra/enums", "./models/components/profiencyModel"], function (require, exports, aurelia_framework_1, characterAccessor_1, levelModel_1, characterModifyingElement_1, raceModel_1, inventoryAccessor_1, translations_1, traitModel_1, itemModel_1, enums_1, profiencyModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let DataAccessor = class DataAccessor {
        constructor(character, inventory, translations) {
            this.character = character;
            this.inventory = inventory;
            this.translations = translations;
            this.loadFromLocalStorage();
            this.intervalID = setInterval(this.periodicSave.bind(this), 5000);
        }
        loadFromLocalStorage() {
            this.character.CharacterDataJSON = localStorage.getItem("character");
            this.inventory.InventoryDataJSON = localStorage.getItem("inventory");
        }
        periodicSave() {
            localStorage.setItem("character", this.character.CharacterDataJSON);
            localStorage.setItem("inventory", this.inventory.InventoryDataJSON);
            console.log("Saved to localStorage");
        }
        save() {
            var char_data = this.character.CharacterDataJSON;
            var inv_data = this.inventory.InventoryDataJSON;
            var data = new Blob([char_data, '<&/>', inv_data], { type: 'text/plain' });
            let textFile = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.setAttribute('download', this.character.name + '.json');
            link.href = textFile;
            document.body.appendChild(link);
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
            if (file) {
                let reader = new FileReader();
                reader.onload = () => {
                    var resArr = reader.result.split('<&/>');
                    this.character.CharacterDataJSON = resArr[0];
                    this.inventory.InventoryDataJSON = resArr[1];
                    input.value = '';
                };
                reader.readAsText(file);
            }
        }
        resetCharacter() {
            this.character.reset();
            this.inventory.reset();
            this.character.name = 'Galadin';
            this.character.currentHP = 99;
            this.character.race = new raceModel_1.RaceModel("Human");
            for (let i = 0; i < 16; i++) {
                this.character.addLevel(new levelModel_1.LevelModel('Paladin', 10));
            }
            this.character.setStat(enums_1.StatEnums.STR, 18);
            this.character.setStat(enums_1.StatEnums.DEX, 8);
            this.character.setStat(enums_1.StatEnums.CON, 14);
            this.character.setStat(enums_1.StatEnums.INT, 8);
            this.character.setStat(enums_1.StatEnums.WIS, 10);
            this.character.setStat(enums_1.StatEnums.CHA, 16);
            this.character.levels[0].skillProfiencies.push(enums_1.SkillEnums.ATHLETICS);
            this.character.levels[0].otherProfiencies.push(new profiencyModel_1.ProfiencyModel('Simple weapons'));
            this.character.levels[0].otherProfiencies.push(new profiencyModel_1.ProfiencyModel('Martial weapons'));
            this.character.levels[0].otherProfiencies.push(new profiencyModel_1.ProfiencyModel('Desert weapons'));
            this.character.levels[0].otherProfiencies.push(new profiencyModel_1.ProfiencyModel('All armor'));
            this.character.levels[0].otherProfiencies.push(new profiencyModel_1.ProfiencyModel('Shields'));
            this.character.levels[0].otherProfiencies.push(new profiencyModel_1.ProfiencyModel('Sami drum'));
            this.character.levels[0].traits.push(new traitModel_1.TraitModel('Divine Sense'));
            this.character.levels[0].traits.push(new traitModel_1.TraitModel('Lay on Hands'));
            this.character.levels[0].saveProfiencies.push(enums_1.StatEnums.CHA);
            this.character.levels[0].saveProfiencies.push(enums_1.StatEnums.WIS);
            this.character.levels[1].traits.push(new traitModel_1.TraitModel('Great Weapon Fighting'));
            this.character.levels[1].traits.push(new traitModel_1.TraitModel('Divine Smite'));
            this.character.levels[2].traits.push(new traitModel_1.TraitModel('Divine Health'));
            this.character.levels[2].traits.push(new traitModel_1.TraitModel('Oath of Vengeance'));
            this.character.levels[4].traits.push(new traitModel_1.TraitModel('Extra Attack'));
            this.character.levels[5].traits.push(new traitModel_1.TraitModel('Aura of Protection'));
            this.character.levels[5].bonusToSaves = 4;
            this.character.levels[6].traits.push(new traitModel_1.TraitModel('Relentless Avenger'));
            this.character.levels[9].traits.push(new traitModel_1.TraitModel('Aura of Courage'));
            this.character.levels[13].traits.push(new traitModel_1.TraitModel('Cleansing Touch'));
            this.character.levels[14].traits.push(new traitModel_1.TraitModel('Soul of Vengeance'));
            this.character.levels[15].addToStats.push(new characterModifyingElement_1.AddToStatModel(enums_1.StatEnums.CHA, 2));
            this.character.race.traits.push(new traitModel_1.TraitModel('Darkvision 120ft'));
            this.character.race.traits.push(new traitModel_1.TraitModel('Desert Nomad'));
            this.character.race.traits.push(new traitModel_1.TraitModel('Trance'));
            this.character.race.traits.push(new traitModel_1.TraitModel('Fey Ancestry'));
            this.character.race.traits.push(new traitModel_1.TraitModel('Keen Senses'));
            this.character.race.traits.push(new traitModel_1.TraitModel('Blessing of Light'));
            this.character.race.traits.push(new traitModel_1.TraitModel('Blessing of Understanding'));
            this.character.race.otherProfiencies.push(new profiencyModel_1.ProfiencyModel('Nubian (elven)'));
            this.character.race.otherProfiencies.push(new profiencyModel_1.ProfiencyModel('Trade common'));
            this.character.race.otherProfiencies.push(new profiencyModel_1.ProfiencyModel('Druidic'));
            this.character.race.skillProfiencies.push(enums_1.SkillEnums.PERCEPTION);
            this.character.race.addToStats.push(new characterModifyingElement_1.AddToStatModel(enums_1.StatEnums.CON, 2));
            this.character.race.addToStats.push(new characterModifyingElement_1.AddToStatModel(enums_1.StatEnums.WIS, 2));
            let arm1 = itemModel_1.ItemModel.ArmorModel('Adamantium full plate', itemModel_1.ArmorType.Heavy, 18, 0);
            arm1.traits.push(new traitModel_1.TraitModel('Critical hit immunity'));
            this.inventory.equip(arm1);
            let wep1 = itemModel_1.ItemModel.WeaponModel('Greatsword of Life Stealing +1', '2d6+1', 'Slashing');
            wep1.bonusAB = 1;
            this.inventory.equip(wep1);
            let wep2 = itemModel_1.ItemModel.WeaponModel('Javelin', '1d6', 'Piercing');
            this.inventory.equip(wep2);
            let cloak = itemModel_1.ItemModel.ItemModel('Cloak of Protection', true, true);
            cloak.bonusAC = 1;
            cloak.bonusToSaves = 1;
            this.inventory.equip(cloak);
            let gloves = itemModel_1.ItemModel.ItemModel('Belt of Frost Giant Strength', true, true);
            gloves.setStats.push(new characterModifyingElement_1.SetStatModel(enums_1.StatEnums.STR, 23));
            this.inventory.equip(gloves);
            let item2 = itemModel_1.ItemModel.ItemModel('Torch');
            this.inventory.moveToBackpack(item2);
        }
        get charModArrays() {
            return [this.inventory.equipped, this.character.levels, [this.character.race]];
        }
        statValue(statKey, base = false) {
            let val = this.character.getStat(statKey);
            if (!base) {
                let max = 0;
                for (let list of this.charModArrays) {
                    for (let item of list) {
                        for (let setstat of item.setStats) {
                            if (setstat.stat === statKey) {
                                max = Math.max(max, setstat.value);
                            }
                        }
                        for (let addstat of item.addToStats) {
                            if (addstat.stat === statKey) {
                                val += addstat.value;
                            }
                        }
                    }
                }
                val = Math.max(val, max);
            }
            return val;
        }
        statModifier(statKey) {
            return Math.floor((this.statValue(statKey) - 10) / 2);
        }
        savingThrow(statKey) {
            let save = this.statModifier(statKey);
            let prof = false;
            for (let list of this.charModArrays) {
                for (let item of list) {
                    if (!prof) {
                        for (let saveprof of item.saveProfiencies) {
                            if (saveprof === statKey) {
                                prof = true;
                            }
                        }
                    }
                    if (item.bonusToSaves) {
                        save += item.bonusToSaves;
                    }
                }
            }
            if (prof) {
                save += this.character.profiencyBonus;
            }
            return save;
        }
    };
    DataAccessor = __decorate([
        aurelia_framework_1.inject(characterAccessor_1.CharacterAccessor, inventoryAccessor_1.InventoryAccessor, translations_1.Translations),
        __metadata("design:paramtypes", [characterAccessor_1.CharacterAccessor, inventoryAccessor_1.InventoryAccessor, translations_1.Translations])
    ], DataAccessor);
    exports.DataAccessor = DataAccessor;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources([
            './value-converters/select',
            './value-converters/attackBonus',
            './value-converters/translate',
            './value-converters/statModifier',
            './value-converters/number',
            './value-converters/savingThrow',
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/combat/combat',["require", "exports", "aurelia-framework", "../../data/dataAccessor", "../../data/extra/enums", "../../data/models/components/itemModel"], function (require, exports, aurelia_framework_1, dataAccessor_1, enums_1, itemModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Combat = class Combat {
        constructor(data) {
            this.data = data;
            this.tempHP = 0;
        }
        get armorClass() {
            let ac = 10;
            if (this.data.inventory.armor) {
                ac = this.data.inventory.armor.baseAC;
                if (this.data.inventory.armor.armorType !== itemModel_1.ArmorType.Heavy) {
                    ac += Math.min(this.data.character.statModifier(enums_1.StatEnums.DEX), this.data.inventory.armor.maxDexBonus);
                }
            }
            else {
                ac += this.data.character.statModifier(enums_1.StatEnums.DEX);
            }
            return ac;
        }
        get initiative() {
            return this.data.character.statModifier(enums_1.StatEnums.DEX);
        }
        get speed() {
            return this.data.character.speed;
        }
        get currentHP() {
            return this.data.character.currentHP;
        }
        set currentHP(value) {
            this.data.character.currentHP = value;
        }
        get temporaryHP() {
            return this.tempHP;
        }
        set temporaryHP(value) {
            this.tempHP = value;
        }
        get maxHD() {
            return this.data.character.maxHD;
        }
        get currentHD() {
            return this.data.character.currentHD;
        }
        set currentHD(value) {
            this.data.character.currentHD = value;
        }
        get hitDie() {
            return this.data.character.levels[0].hd;
        }
        savingThrow(stat) {
        }
    };
    Combat = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Combat);
    exports.Combat = Combat;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/character/character',["require", "exports", "aurelia-framework", "../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Character = class Character {
        constructor(data) {
            this.data = data;
        }
    };
    Character = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Character);
    exports.Character = Character;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/levels/levels',["require", "exports", "aurelia-framework", "aurelia-templating-resources", "../../data/dataAccessor", "../../data/models/components/levelModel"], function (require, exports, aurelia_framework_1, aurelia_templating_resources_1, dataAccessor_1, levelModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Levels = class Levels {
        constructor(data, signaler) {
            this.data = data;
            this.signaler = signaler;
        }
        addNewLevel() {
            this.data.character.levels.push(new levelModel_1.LevelModel("", 8));
        }
        removeLevel(level) {
            this.data.character.levels.splice(this.data.character.levels.indexOf(level), 1);
        }
    };
    Levels = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler])
    ], Levels);
    exports.Levels = Levels;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/inventory/inventory',["require", "exports", "aurelia-framework", "../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Inventory = class Inventory {
        constructor(data) {
            this.data = data;
            this.showItemPopup = false;
            this.showEditPopup = false;
            this.itemToEdit = null;
        }
        equip(item) {
            this.data.inventory.equip(item);
        }
        unequip(item) {
            this.data.inventory.moveToBackpack(item);
        }
        startCreatingNewItem() {
            this.showItemPopup = true;
        }
        cancelCreatingNewItem() {
            this.showItemPopup = false;
        }
        createItem(item) {
            this.data.inventory.backpack.push(item);
        }
        editItem(item) {
            this.showEditPopup = true;
            this.itemToEdit = item;
        }
        cancelEditItem() {
            this.showEditPopup = false;
            this.itemToEdit = null;
        }
        deleteItem(item) {
            this.data.inventory.deleteItem(item);
        }
    };
    Inventory = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Inventory);
    exports.Inventory = Inventory;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/spells/spells',["require", "exports", "aurelia-framework", "../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Spells = class Spells {
        constructor(data) {
            this.data = data;
        }
    };
    Spells = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Spells);
    exports.Spells = Spells;
});

define('data/extra/enums',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StatEnums;
    (function (StatEnums) {
        StatEnums[StatEnums["STR"] = 1] = "STR";
        StatEnums[StatEnums["DEX"] = 2] = "DEX";
        StatEnums[StatEnums["CON"] = 3] = "CON";
        StatEnums[StatEnums["INT"] = 4] = "INT";
        StatEnums[StatEnums["WIS"] = 5] = "WIS";
        StatEnums[StatEnums["CHA"] = 6] = "CHA";
    })(StatEnums = exports.StatEnums || (exports.StatEnums = {}));
    var SkillEnums;
    (function (SkillEnums) {
        SkillEnums[SkillEnums["ACROBATICS"] = 11] = "ACROBATICS";
        SkillEnums[SkillEnums["ANIMALHANDLING"] = 12] = "ANIMALHANDLING";
        SkillEnums[SkillEnums["ARCANA"] = 13] = "ARCANA";
        SkillEnums[SkillEnums["ATHLETICS"] = 14] = "ATHLETICS";
        SkillEnums[SkillEnums["DECEPTION"] = 15] = "DECEPTION";
        SkillEnums[SkillEnums["HISTORY"] = 16] = "HISTORY";
        SkillEnums[SkillEnums["INSIGHT"] = 17] = "INSIGHT";
        SkillEnums[SkillEnums["INTIMIDATION"] = 18] = "INTIMIDATION";
        SkillEnums[SkillEnums["INVESTIGATION"] = 19] = "INVESTIGATION";
        SkillEnums[SkillEnums["MEDICINE"] = 20] = "MEDICINE";
        SkillEnums[SkillEnums["NATURE"] = 21] = "NATURE";
        SkillEnums[SkillEnums["PERCEPTION"] = 22] = "PERCEPTION";
        SkillEnums[SkillEnums["PERFORMANCE"] = 23] = "PERFORMANCE";
        SkillEnums[SkillEnums["PERSUASION"] = 24] = "PERSUASION";
        SkillEnums[SkillEnums["RELIGION"] = 25] = "RELIGION";
        SkillEnums[SkillEnums["SLEIGHTOFHAND"] = 26] = "SLEIGHTOFHAND";
        SkillEnums[SkillEnums["STEALTH"] = 27] = "STEALTH";
        SkillEnums[SkillEnums["SURVIVAL"] = 28] = "SURVIVAL";
    })(SkillEnums = exports.SkillEnums || (exports.SkillEnums = {}));
    var CharModEnums;
    (function (CharModEnums) {
        CharModEnums[CharModEnums["SKILLPROFIENCY"] = 1] = "SKILLPROFIENCY";
        CharModEnums[CharModEnums["OTHERPROFIENCY"] = 2] = "OTHERPROFIENCY";
        CharModEnums[CharModEnums["TRAIT"] = 3] = "TRAIT";
        CharModEnums[CharModEnums["SETSTAT"] = 4] = "SETSTAT";
        CharModEnums[CharModEnums["ADDTOSTAT"] = 5] = "ADDTOSTAT";
        CharModEnums[CharModEnums["SAVEPROFIENCY"] = 6] = "SAVEPROFIENCY";
        CharModEnums[CharModEnums["ALLSAVESBONUS"] = 7] = "ALLSAVESBONUS";
        CharModEnums[CharModEnums["ACBONUS"] = 8] = "ACBONUS";
        CharModEnums[CharModEnums["ABBONUS"] = 9] = "ABBONUS";
    })(CharModEnums = exports.CharModEnums || (exports.CharModEnums = {}));
    class CountryViewEngineHooks {
        beforeBind(view) {
            view.overrideContext.StatEnums = Object.keys(StatEnums).map(k => StatEnums[k]).filter(v => typeof v === "number");
            view.overrideContext.SkillEnums = Object.keys(SkillEnums).map(k => SkillEnums[k]).filter(v => typeof v === "number");
            view.overrideContext.CharModEnums = Object.keys(CharModEnums).map(k => CharModEnums[k]).filter(v => typeof v === "number");
        }
    }
    exports.CountryViewEngineHooks = CountryViewEngineHooks;
    exports.SkillStats = new Map();
    exports.SkillStats.set(SkillEnums.ACROBATICS, StatEnums.DEX);
    exports.SkillStats.set(SkillEnums.ANIMALHANDLING, StatEnums.WIS);
    exports.SkillStats.set(SkillEnums.ARCANA, StatEnums.INT);
    exports.SkillStats.set(SkillEnums.ATHLETICS, StatEnums.STR);
    exports.SkillStats.set(SkillEnums.DECEPTION, StatEnums.CHA);
    exports.SkillStats.set(SkillEnums.HISTORY, StatEnums.INT);
    exports.SkillStats.set(SkillEnums.INSIGHT, StatEnums.WIS);
    exports.SkillStats.set(SkillEnums.INTIMIDATION, StatEnums.CHA);
    exports.SkillStats.set(SkillEnums.INVESTIGATION, StatEnums.INT);
    exports.SkillStats.set(SkillEnums.MEDICINE, StatEnums.WIS);
    exports.SkillStats.set(SkillEnums.NATURE, StatEnums.INT);
    exports.SkillStats.set(SkillEnums.PERCEPTION, StatEnums.WIS);
    exports.SkillStats.set(SkillEnums.PERFORMANCE, StatEnums.CHA);
    exports.SkillStats.set(SkillEnums.PERSUASION, StatEnums.CHA);
    exports.SkillStats.set(SkillEnums.RELIGION, StatEnums.INT);
    exports.SkillStats.set(SkillEnums.SLEIGHTOFHAND, StatEnums.DEX);
    exports.SkillStats.set(SkillEnums.STEALTH, StatEnums.DEX);
    exports.SkillStats.set(SkillEnums.SURVIVAL, StatEnums.WIS);
});

define('data/extra/translations',["require", "exports", "./enums"], function (require, exports, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Translations {
        constructor() {
            this.statStrings = new Map();
            this.skillStrings = new Map();
            this.charModStrings = new Map();
            this.initStatStrings();
            this.initSkillStrings();
            this.initCharModStrings();
        }
        initStatStrings() {
            this.statStrings.set(enums_1.StatEnums.STR, 'Strength');
            this.statStrings.set(enums_1.StatEnums.DEX, 'Dexterity');
            this.statStrings.set(enums_1.StatEnums.CON, 'Constitution');
            this.statStrings.set(enums_1.StatEnums.INT, 'Intelligence');
            this.statStrings.set(enums_1.StatEnums.WIS, 'Wisdom');
            this.statStrings.set(enums_1.StatEnums.CHA, 'Charisma');
        }
        initSkillStrings() {
            this.skillStrings.set(enums_1.SkillEnums.ACROBATICS, 'Acrobatics');
            this.skillStrings.set(enums_1.SkillEnums.ANIMALHANDLING, 'Animal Handling');
            this.skillStrings.set(enums_1.SkillEnums.ARCANA, 'Arcana');
            this.skillStrings.set(enums_1.SkillEnums.ATHLETICS, 'Athletics');
            this.skillStrings.set(enums_1.SkillEnums.DECEPTION, 'Deception');
            this.skillStrings.set(enums_1.SkillEnums.HISTORY, 'History');
            this.skillStrings.set(enums_1.SkillEnums.INSIGHT, 'Insight');
            this.skillStrings.set(enums_1.SkillEnums.INTIMIDATION, 'Intimidation');
            this.skillStrings.set(enums_1.SkillEnums.INVESTIGATION, 'Investigation');
            this.skillStrings.set(enums_1.SkillEnums.MEDICINE, 'Medicine');
            this.skillStrings.set(enums_1.SkillEnums.NATURE, 'Nature');
            this.skillStrings.set(enums_1.SkillEnums.PERCEPTION, 'Perception');
            this.skillStrings.set(enums_1.SkillEnums.PERFORMANCE, 'Performance');
            this.skillStrings.set(enums_1.SkillEnums.PERSUASION, 'Persuasion');
            this.skillStrings.set(enums_1.SkillEnums.RELIGION, 'Religion');
            this.skillStrings.set(enums_1.SkillEnums.SLEIGHTOFHAND, 'Sleight of Hand');
            this.skillStrings.set(enums_1.SkillEnums.STEALTH, 'Stealth');
            this.skillStrings.set(enums_1.SkillEnums.SURVIVAL, 'Survival');
        }
        initCharModStrings() {
            this.charModStrings.set(enums_1.CharModEnums.SKILLPROFIENCY, 'Skill profiency');
            this.charModStrings.set(enums_1.CharModEnums.OTHERPROFIENCY, 'Other profiency');
            this.charModStrings.set(enums_1.CharModEnums.TRAIT, 'Trait');
            this.charModStrings.set(enums_1.CharModEnums.SETSTAT, 'Set stat to minimum');
            this.charModStrings.set(enums_1.CharModEnums.ADDTOSTAT, 'Stat bonus');
            this.charModStrings.set(enums_1.CharModEnums.SAVEPROFIENCY, 'Saving throw profiency');
            this.charModStrings.set(enums_1.CharModEnums.ALLSAVESBONUS, 'Bonus to all saves');
            this.charModStrings.set(enums_1.CharModEnums.ACBONUS, 'Bonus to AC');
            this.charModStrings.set(enums_1.CharModEnums.ABBONUS, 'Bonus to AB');
        }
        translateStat(stat) {
            return this.statStrings.get(stat);
        }
        translateSkill(skill) {
            return this.skillStrings.get(skill);
        }
        translateCharMod(charmod) {
            return this.charModStrings.get(charmod);
        }
    }
    exports.Translations = Translations;
});

define('data/models/characterAccessor',["require", "exports", "../extra/enums", "./components/characteModel", "./components/statModel"], function (require, exports, enums_1, characteModel_1, statModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterAccessor {
        constructor() {
            this.model = new characteModel_1.CharacterModel();
            this.setStat(enums_1.StatEnums.STR, 10);
            this.setStat(enums_1.StatEnums.DEX, 10);
            this.setStat(enums_1.StatEnums.CON, 10);
            this.setStat(enums_1.StatEnums.INT, 10);
            this.setStat(enums_1.StatEnums.WIS, 10);
            this.setStat(enums_1.StatEnums.CHA, 10);
        }
        get CharacterDataJSON() {
            return JSON.stringify(this.model, null, '\t');
        }
        set CharacterDataJSON(json) {
            this.model = JSON.parse(json);
        }
        reset() {
            this.model = new characteModel_1.CharacterModel();
        }
        get name() {
            return this.model.name;
        }
        set name(value) {
            this.model.name = value;
        }
        get race() {
            return this.model.race;
        }
        set race(value) {
            this.model.race = value;
        }
        get totalLevel() {
            return Math.max(this.model.levels.length, 1);
        }
        get speed() {
            return this.model.speed;
        }
        get profiencyBonus() {
            return Math.floor((this.totalLevel - 1) / 4) + 2;
        }
        get maxHP() {
            let hp = 0;
            if (this.model.levels.length > 0) {
                hp = this.model.levels[0].hd / 2 - 1;
                for (let level of this.model.levels) {
                    hp += level.hd / 2 + 1 + this.statModifier(enums_1.StatEnums.CON);
                }
            }
            return hp;
        }
        get currentHP() {
            return this.model.currentHP;
        }
        set currentHP(value) {
            this.model.currentHP = value;
        }
        get maxHD() {
            return this.model.levels.length;
        }
        get currentHD() {
            return this.model.currentHD;
        }
        set currentHD(value) {
            this.model.currentHD = value;
        }
        get stats() {
            return this.model.stats;
        }
        getStat(statKey) {
            let smodel = this.stats.find(stat => stat.key === statKey);
            if (smodel) {
                return smodel.value;
            }
            return -1000;
        }
        setStat(statKey, value) {
            let smodel = this.stats.find(stat => stat.key === statKey);
            if (smodel) {
                smodel.value = value;
            }
            else {
                smodel = new statModel_1.StatModel(statKey, value);
                this.model.stats.push(smodel);
            }
        }
        statModifier(statKey) {
            let smodel = this.stats.find(stat => stat.key === statKey);
            if (smodel) {
                return Math.floor((smodel.value - 10) / 2);
            }
            return -1000;
        }
        get levels() {
            return this.model.levels;
        }
        get skills() {
            let arr = [];
            let unique = {};
            for (let level of this.levels) {
                for (let skill of level.skillProfiencies) {
                    if (!unique[skill]) {
                        arr.push(skill);
                        unique[skill] = 1;
                    }
                }
            }
            for (let skill of this.race.skillProfiencies) {
                if (!unique[skill]) {
                    arr.push(skill);
                    unique[skill] = 1;
                }
            }
            return arr;
        }
        get expertises() {
            return [];
        }
        get profiencies() {
            let arr = [];
            let unique = {};
            for (let level of this.levels) {
                for (let prof of level.otherProfiencies) {
                    if (!unique[prof.name]) {
                        arr.push(prof);
                        unique[prof.name] = 1;
                    }
                }
            }
            for (let prof of this.race.otherProfiencies) {
                if (!unique[prof.name]) {
                    arr.push(prof);
                    unique[prof.name] = 1;
                }
            }
            return arr;
        }
        get traits() {
            let arr = [];
            let unique = {};
            for (let level of this.levels) {
                for (let trait of level.traits) {
                    if (!unique[trait.name]) {
                        arr.push(trait);
                        unique[trait.name] = 1;
                    }
                }
            }
            for (let trait of this.race.traits) {
                if (!unique[trait.name]) {
                    arr.push(trait);
                    unique[trait.name] = 1;
                }
            }
            return arr;
        }
        addLevel(level) {
            this.model.levels.push(level);
        }
    }
    exports.CharacterAccessor = CharacterAccessor;
});

define('data/models/inventoryAccessor',["require", "exports", "./components/itemModel", "./components/inventoryModel"], function (require, exports, itemModel_1, inventoryModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InventoryAccessor {
        constructor() {
            this.model = new inventoryModel_1.InventoryModel();
        }
        get InventoryDataJSON() {
            return JSON.stringify(this.model, null, '\t');
        }
        set InventoryDataJSON(json) {
            this.model = inventoryModel_1.InventoryModel.parseJSON(JSON.parse(json));
        }
        reset() {
            this.model = new inventoryModel_1.InventoryModel();
        }
        get equipped() {
            return this.model.equipped;
        }
        get backpack() {
            return this.model.backpack;
        }
        get armor() {
            for (let item of this.model.equipped) {
                if (item.itemType === itemModel_1.ItemType.Armor) {
                    return item;
                }
            }
            return null;
        }
        set armor(armor) {
            this.equip(armor);
        }
        get weapons() {
            return this.model.equipped.filter(i => i.itemType === itemModel_1.ItemType.Weapon);
        }
        get traits() {
            let arr = [];
            this.model.equipped.forEach(item => {
                arr = arr.concat(item.traits);
            });
            return arr;
        }
        get skills() {
            let arr = [];
            this.model.equipped.forEach(item => {
                arr = arr.concat(item.skillProfiencies);
            });
            return arr;
        }
        get profiencies() {
            let arr = [];
            this.model.equipped.forEach(item => {
                arr = arr.concat(item.otherProfiencies);
            });
            return arr;
        }
        equip(item) {
            if (!this.isEquipped(item)) {
                if (item.itemType === itemModel_1.ItemType.Armor) {
                    for (let equippedArmor of this.equipped) {
                        if (equippedArmor.itemType === itemModel_1.ItemType.Armor) {
                            this.model.equipped.splice(this.equipped.indexOf(equippedArmor), 1);
                            this.model.backpack.push(equippedArmor);
                            break;
                        }
                    }
                    this.model.backpack.splice(this.backpack.indexOf(item), 1);
                    this.model.equipped.push(item);
                }
                else {
                    if (this.model.backpack.includes(item)) {
                        this.model.backpack.splice(this.backpack.indexOf(item), 1);
                    }
                    this.model.equipped.push(item);
                }
                return true;
            }
            return false;
        }
        moveToBackpack(item) {
            if (!this.isInBackpack(item)) {
                if (this.isEquipped(item)) {
                    this.model.equipped.splice(this.equipped.indexOf(item), 1);
                }
                this.model.backpack.push(item);
                return true;
            }
            return false;
        }
        isEquipped(item) {
            return this.model.equipped.includes(item);
        }
        isInBackpack(item) {
            return this.model.backpack.includes(item);
        }
        deleteItem(item) {
            if (this.isInBackpack(item)) {
                this.model.backpack.splice(this.backpack.indexOf(item), 1);
                return true;
            }
            else if (this.isEquipped(item)) {
                this.model.equipped.splice(this.equipped.indexOf(item), 1);
                return true;
            }
            return false;
        }
    }
    exports.InventoryAccessor = InventoryAccessor;
});

define('resources/value-converters/attackBonus',["require", "exports", "../../data/models/components/itemModel", "../../data/extra/enums"], function (require, exports, itemModel_1, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AttackBonusValueConverter {
        toView(weapon, data) {
            let ab = data.character.profiencyBonus;
            if (weapon.light) {
                ab += data.character.statModifier(enums_1.StatEnums.DEX);
            }
            else {
                ab += data.character.statModifier(enums_1.StatEnums.STR);
            }
            for (let item of data.inventory.equipped) {
                if (item.bonusAB) {
                    if (item.itemType === itemModel_1.ItemType.Weapon) {
                        if (item === weapon) {
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
    exports.AttackBonusValueConverter = AttackBonusValueConverter;
});

define('resources/value-converters/number',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NumberValueConverter {
        toView(value) {
            return value;
        }
        fromView(value) {
            let parsed = parseInt(value);
            return parsed && parsed != NaN ? parsed : 0;
        }
    }
    exports.NumberValueConverter = NumberValueConverter;
});

define('resources/value-converters/savingThrow',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SavingThrowValueConverter {
        toView(stat, data) {
            return data.savingThrow(stat);
        }
    }
    exports.SavingThrowValueConverter = SavingThrowValueConverter;
});

define('resources/value-converters/select',["require", "exports", "../../data/extra/enums"], function (require, exports, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SelectValueConverter {
        toView(array, filterValue) {
            return array.filter(function (item) {
                return enums_1.SkillStats.get(item) === filterValue;
            });
        }
    }
    exports.SelectValueConverter = SelectValueConverter;
});

define('resources/value-converters/statModifier',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StatModifierValueConverter {
        toView(value) {
            var mod = Math.floor((value - 10) / 2);
            if (mod > 0)
                return '+' + mod;
            return mod;
        }
    }
    exports.StatModifierValueConverter = StatModifierValueConverter;
});

define('resources/value-converters/translate',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TranslateValueConverter {
        toView(valueToTranslate, translations, type) {
            if (translations) {
                if (type.toLowerCase() === 'skill') {
                    return translations.translateSkill(valueToTranslate);
                }
                else if (type.toLowerCase() === 'stat') {
                    return translations.translateStat(valueToTranslate);
                }
                else if (type.toLowerCase() === 'charmod') {
                    return translations.translateCharMod(valueToTranslate);
                }
            }
            return valueToTranslate;
        }
    }
    exports.TranslateValueConverter = TranslateValueConverter;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/character/skill/skill',["require", "exports", "aurelia-framework", "aurelia-framework", "../../../data/dataAccessor", "../../../data/extra/enums"], function (require, exports, aurelia_framework_1, aurelia_framework_2, dataAccessor_1, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Skill = class Skill {
        constructor(data) {
            this.data = data;
        }
        get name() {
            return this.data.translations.translateSkill(this.model);
        }
        get skillScore() {
            var score = this.data.statModifier(enums_1.SkillStats.get(this.model));
            if (this.hasProfiency) {
                score += this.data.character.profiencyBonus;
                if (this.hasExpertise) {
                    score += this.data.character.profiencyBonus;
                }
            }
            return score;
        }
        get hasProfiency() {
            return this.data.character.skills.includes(this.model) || this.data.inventory.skills.includes(this.model);
        }
        get hasExpertise() {
            return this.data.character.skills.includes(this.model) && this.data.character.expertises.includes(this.model);
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], Skill.prototype, "model", void 0);
    Skill = __decorate([
        aurelia_framework_2.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Skill);
    exports.Skill = Skill;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/inventory/itemPopup/itemPopup',["require", "exports", "aurelia-framework", "aurelia-framework", "../../../data/dataAccessor", "../../../data/models/components/itemModel"], function (require, exports, aurelia_framework_1, aurelia_framework_2, dataAccessor_1, itemModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ItemPopup = class ItemPopup {
        constructor(data) {
            this.data = data;
            this.model = null;
            this.reset();
        }
        modelChanged(newValue, oldValue) {
            if (newValue) {
                this.setup();
            }
        }
        setup() {
            this.innerModel = itemModel_1.ItemModel.ItemModel("");
            if (this.model) {
                this.innerModel.fillFromJSON(JSON.stringify(this.model));
            }
        }
        reset() {
            if (this.cancelItem) {
                this.cancelItem({ item: this });
            }
        }
        createItemInternal() {
            var item = itemModel_1.ItemModel.ItemModel(name);
            item.fillFromJSON(JSON.stringify(this.innerModel));
            this.saveItem({ item: item });
            this.reset();
        }
    };
    __decorate([
        aurelia_framework_2.bindable,
        __metadata("design:type", Function)
    ], ItemPopup.prototype, "saveItem", void 0);
    __decorate([
        aurelia_framework_2.bindable,
        __metadata("design:type", Function)
    ], ItemPopup.prototype, "cancelItem", void 0);
    __decorate([
        aurelia_framework_2.bindable,
        __metadata("design:type", itemModel_1.ItemModel)
    ], ItemPopup.prototype, "model", void 0);
    ItemPopup = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], ItemPopup);
    exports.ItemPopup = ItemPopup;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/shared/charmod/charmod',["require", "exports", "aurelia-framework", "aurelia-templating-resources", "../../../data/dataAccessor", "../../../data/models/components/characterModifyingElement", "../../../data/models/components/profiencyModel", "../../../data/extra/enums"], function (require, exports, aurelia_framework_1, aurelia_templating_resources_1, dataAccessor_1, characterModifyingElement_1, profiencyModel_1, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Charmod = class Charmod {
        constructor(data, signaler) {
            this.data = data;
            this.signaler = signaler;
        }
        addNewFeature(select) {
            if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.SKILLPROFIENCY]) {
                var i = enums_1.SkillEnums.ACROBATICS;
                while (this.model.skillProfiencies && this.model.skillProfiencies.includes(i)) {
                    i++;
                }
                this.model.skillProfiencies.push(i);
                this.signaler.signal('skill-list-changed');
            }
            else if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.OTHERPROFIENCY]) {
                this.model.otherProfiencies.push(new profiencyModel_1.ProfiencyModel("New profiency"));
            }
            else if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.TRAIT]) {
                this.model.traits.push(new profiencyModel_1.ProfiencyModel("New trait"));
            }
            else if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.SETSTAT]) {
                this.model.setStats.push(new characterModifyingElement_1.SetStatModel(enums_1.StatEnums.STR, 10));
            }
            else if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.ADDTOSTAT]) {
                this.model.addToStats.push(new characterModifyingElement_1.SetStatModel(enums_1.StatEnums.STR, 1));
            }
            else if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.SAVEPROFIENCY]) {
                this.model.saveProfiencies.push(enums_1.StatEnums.STR);
            }
            else if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.ALLSAVESBONUS]) {
                this.model.bonusToSaves = 1;
            }
            else if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.ACBONUS]) {
                this.model.bonusAC = 1;
            }
            else if (enums_1.CharModEnums[select] === enums_1.CharModEnums[enums_1.CharModEnums.ABBONUS]) {
                this.model.bonusAB = 1;
            }
        }
        removeSkill(skill) {
            this.model.skillProfiencies.splice(this.model.skillProfiencies.indexOf(skill), 1);
            this.signaler.signal('skill-list-changed');
        }
        removeOtherProf(prof) {
            this.model.otherProfiencies.splice(this.model.otherProfiencies.indexOf(prof), 1);
        }
        removeTrait(trait) {
            this.model.traits.splice(this.model.traits.indexOf(trait), 1);
        }
        removeAddStat(addstat) {
            this.model.addToStats.splice(this.model.addToStats.indexOf(addstat), 1);
        }
        removeSetStat(setstat) {
            this.model.setStats.splice(this.model.setStats.indexOf(setstat), 1);
        }
        removeSaveProfiency(saveprof) {
            this.model.saveProfiencies.splice(this.model.saveProfiencies.indexOf(saveprof), 1);
        }
        removeBonusToSaves() {
            this.model.bonusToSaves = undefined;
        }
        removeBonusToAC() {
            this.model.bonusAC = undefined;
        }
        removeBonusToAB() {
            this.model.bonusAB = undefined;
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", characterModifyingElement_1.CharacterModifyingElement)
    ], Charmod.prototype, "model", void 0);
    Charmod = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler])
    ], Charmod);
    exports.Charmod = Charmod;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/shared/stat/stat',["require", "exports", "aurelia-framework", "aurelia-framework", "../../../data/dataAccessor", "../../../data/extra/enums"], function (require, exports, aurelia_framework_1, aurelia_framework_2, dataAccessor_1, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Stat = class Stat {
        constructor(data) {
            this.data = data;
            this.editMode = false;
        }
        get name() {
            if (this.model) {
                return this.data.translations.translateStat(this.model);
            }
            return "N/A";
        }
        get value() {
            return this.data.statValue(this.model, this.editMode);
        }
        set value(value) {
            if (this.model && this.editMode) {
                this.data.character.setStat(this.model, value);
            }
        }
        add() {
            this.value += 1;
        }
        subtract() {
            this.value -= 1;
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], Stat.prototype, "editMode", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], Stat.prototype, "model", void 0);
    Stat = __decorate([
        aurelia_framework_2.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Stat);
    exports.Stat = Stat;
});

define('data/models/components/characteModel',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterModel {
        constructor() {
            this.name = '';
            this.speed = 30;
            this.levels = [];
            this.stats = [];
            this.currentHP = 0;
            this.currentHD = 0;
        }
    }
    exports.CharacterModel = CharacterModel;
});

define('data/models/components/characterModifyingElement',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterModifyingElement {
        constructor() {
            this.skillProfiencies = [];
            this.otherProfiencies = [];
            this.traits = [];
            this.saveProfiencies = [];
            this.setStats = [];
            this.addToStats = [];
        }
        fillFromJSON(json) {
            if (json) {
                this.skillProfiencies = json.skillProfiencies;
                this.otherProfiencies = json.otherProfiencies;
                this.traits = json.traits;
                this.saveProfiencies = json.saveProfiencies;
                this.setStats = json.setStats;
                this.addToStats = json.addToStats;
                this.baseAC = json.baseAC;
                this.maxDexBonus = json.maxDexBonus;
                this.bonusAC = json.bonusAC;
                this.bonusAB = json.bonusAB;
                this.bonusToSaves = json.bonusToSaves;
            }
        }
    }
    exports.CharacterModifyingElement = CharacterModifyingElement;
    class SetStatModel {
        constructor(stat, value) {
            this.stat = stat;
            this.value = value;
        }
    }
    exports.SetStatModel = SetStatModel;
    class AddToStatModel {
        constructor(stat, value) {
            this.stat = stat;
            this.value = value;
        }
    }
    exports.AddToStatModel = AddToStatModel;
});

define('data/models/components/inventoryModel',["require", "exports", "./itemModel"], function (require, exports, itemModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InventoryModel {
        constructor() {
            this.equipped = [];
            this.backpack = [];
        }
        static parseJSON(json) {
            var model;
            if (json) {
                model = new InventoryModel();
                for (var eItem of json.equipped) {
                    let item = itemModel_1.ItemModel.ItemModel("");
                    item.fillFromJSON(eItem);
                    model.equipped.push(item);
                }
                for (var eItem of json.backpack) {
                    let item = itemModel_1.ItemModel.ItemModel("");
                    item.fillFromJSON(eItem);
                    model.backpack.push(item);
                }
            }
            return model;
        }
    }
    exports.InventoryModel = InventoryModel;
});

define('data/models/components/itemModel',["require", "exports", "./characterModifyingElement"], function (require, exports, characterModifyingElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemModel extends characterModifyingElement_1.CharacterModifyingElement {
        constructor() {
            super();
        }
        static ItemModel(name, equippable = true, requiresAttunement = true) {
            let item = new ItemModel();
            item.itemType = ItemType.Item;
            item.name = name;
            item.equippable = equippable;
            item.requiresAttunement = requiresAttunement;
            return item;
        }
        static ArmorModel(name, armorType, baseAC, maxDexBonus) {
            let item = new ItemModel();
            item.itemType = ItemType.Armor;
            item.name = name;
            item.armorType = armorType;
            item.baseAC = baseAC;
            item.maxDexBonus = maxDexBonus;
            return item;
        }
        static WeaponModel(name, damage, damageType) {
            let item = new ItemModel();
            item.itemType = ItemType.Weapon;
            item.name = name;
            item.damage = damage;
            item.damageType = damageType;
            return item;
        }
        fillFromJSON(json) {
            if (json) {
                super.fillFromJSON(json);
                this.itemType = json.itemType;
                this.name = json.name;
                this.equippable = json.equippable;
                this.requiresAttunement = json.requiresAttunement;
                this.baseAC = json.baseAC;
                this.maxDexBonus = json.maxDexBonus;
                this.damage = json.damage;
                this.damageType = json.damageType;
                this.range = json.range;
                this.light = json.light;
                this.heavy = json.heavy;
                this.twohanded = json.twohanded;
            }
        }
    }
    exports.ItemModel = ItemModel;
    var ItemType;
    (function (ItemType) {
        ItemType[ItemType["Item"] = 0] = "Item";
        ItemType[ItemType["WonderousItem"] = 1] = "WonderousItem";
        ItemType[ItemType["Artifact"] = 2] = "Artifact";
        ItemType[ItemType["Armor"] = 3] = "Armor";
        ItemType[ItemType["Weapon"] = 4] = "Weapon";
    })(ItemType = exports.ItemType || (exports.ItemType = {}));
    var ArmorType;
    (function (ArmorType) {
        ArmorType[ArmorType["Clothing"] = 0] = "Clothing";
        ArmorType[ArmorType["Light"] = 1] = "Light";
        ArmorType[ArmorType["Medium"] = 2] = "Medium";
        ArmorType[ArmorType["Heavy"] = 3] = "Heavy";
    })(ArmorType = exports.ArmorType || (exports.ArmorType = {}));
});

define('data/models/components/levelModel',["require", "exports", "./characterModifyingElement"], function (require, exports, characterModifyingElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LevelModel extends characterModifyingElement_1.CharacterModifyingElement {
        constructor(characterClass, hd) {
            super();
            this.characterClass = characterClass;
            this.hd = hd;
        }
    }
    exports.LevelModel = LevelModel;
});

define('data/models/components/profiencyModel',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProfiencyModel {
        constructor(name) {
            this.name = name;
        }
    }
    exports.ProfiencyModel = ProfiencyModel;
});

define('data/models/components/raceModel',["require", "exports", "./characterModifyingElement"], function (require, exports, characterModifyingElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RaceModel extends characterModifyingElement_1.CharacterModifyingElement {
        constructor(name) {
            super();
            this.name = name;
        }
    }
    exports.RaceModel = RaceModel;
});

define('data/models/components/skillModel',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SkillModel {
        constructor(name, key, stat, profiency = false, expertise = false) {
            this.name = name;
            this.key = key;
            this.stat = stat;
            this.profiency = profiency;
            this.expertise = expertise;
        }
    }
    exports.SkillModel = SkillModel;
});

define('data/models/components/statModel',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StatModel {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }
    exports.StatModel = StatModel;
});

define('data/models/components/traitModel',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TraitModel {
        constructor(name) {
            this.name = name;
        }
    }
    exports.TraitModel = TraitModel;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/shared/charmod/numberSelect/numberSelect',["require", "exports", "aurelia-framework", "../../../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let NumberSelect = class NumberSelect {
        constructor(data) {
            this.data = data;
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], NumberSelect.prototype, "model", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], NumberSelect.prototype, "text", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Function)
    ], NumberSelect.prototype, "removeMethod", void 0);
    NumberSelect = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        aurelia_framework_1.containerless,
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], NumberSelect);
    exports.NumberSelect = NumberSelect;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/shared/charmod/skillSelect/skillSelect',["require", "exports", "aurelia-framework", "../../../../data/dataAccessor", "../../../../data/extra/enums", "aurelia-templating-resources"], function (require, exports, aurelia_framework_1, dataAccessor_1, enums_1, aurelia_templating_resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SkillSelect = class SkillSelect {
        constructor(data, signaler) {
            this.data = data;
            this.signaler = signaler;
        }
        currentSkillChanged(newValue, oldValue) {
            if (newValue && this.list) {
                this.list.splice(this.list.indexOf(oldValue), 1, newValue);
                this.signaler.signal('skill-list-changed');
            }
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], SkillSelect.prototype, "currentSkill", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], SkillSelect.prototype, "list", void 0);
    SkillSelect = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler])
    ], SkillSelect);
    exports.SkillSelect = SkillSelect;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/shared/charmod/statSelect/skillSelect',["require", "exports", "aurelia-framework", "../../../../data/dataAccessor", "../../../../data/extra/enums", "aurelia-templating-resources"], function (require, exports, aurelia_framework_1, dataAccessor_1, enums_1, aurelia_templating_resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let SkillSelect = class SkillSelect {
        constructor(data, signaler) {
            this.data = data;
            this.signaler = signaler;
        }
        currentSkillChanged(newValue, oldValue) {
            if (newValue && this.list) {
                this.list.splice(this.list.indexOf(oldValue), 1, newValue);
                this.signaler.signal('skill-list-changed');
            }
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], SkillSelect.prototype, "currentSkill", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], SkillSelect.prototype, "list", void 0);
    SkillSelect = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler])
    ], SkillSelect);
    exports.SkillSelect = SkillSelect;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('components/shared/charmod/statSelect/statSelect',["require", "exports", "aurelia-framework", "../../../../data/dataAccessor", "../../../../data/extra/enums", "aurelia-templating-resources"], function (require, exports, aurelia_framework_1, dataAccessor_1, enums_1, aurelia_templating_resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let StatSelect = class StatSelect {
        constructor(data, signaler) {
            this.data = data;
            this.signaler = signaler;
        }
        currentStatChanged(newValue, oldValue) {
            if (newValue && this.list) {
                this.list.splice(this.list.indexOf(oldValue), 1, newValue);
                this.signaler.signal('stat-list-changed');
            }
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], StatSelect.prototype, "currentStat", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], StatSelect.prototype, "list", void 0);
    StatSelect = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor, aurelia_templating_resources_1.BindingSignaler])
    ], StatSelect);
    exports.StatSelect = StatSelect;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./normalize.css\"></require><require from=\"./styles.css\"></require><require from=\"./resources/fonts/font-awesome.min.css\"></require><nav class=\"navbar\" role=\"navigation\"><div class=\"navbar-placeholder\"></div><a class=\"navbar-item ${row.isActive ? 'active' : ''}\" repeat.for=\"row of router.navigation\" href.bind=\"row.href\">${row.title}</a></nav><div class=\"generalinfo\"><h1>${data.character.name}</h1><div class=\"saveAndLoadButtons\"><button click.delegate=\"data.resetCharacter()\">Reset</button> <button click.delegate=\"data.save()\">Save</button> <input type=\"file\" ref=\"fileinput\" change.delegate=\"data.loadFile(fileinput)\" style=\"display:none\"> <button click.delegate=\"data.sendClickEvent(fileinput)\">Open</button></div></div><div class=\"content\"><router-view></router-view></div></template>"; });
define('text!normalize.css', ['module'], function(module) { module.exports = "/*! normalize.css v6.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0; }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n\n/* Eff focus highlights\n*/\ninput:focus,\nselect:focus,\ntextarea:focus,\nbutton:focus {\n  outline: none; }\n\n/*\n *  Custom normalize classes\n */\n* {\n  box-sizing: border-box; }\n\ntable {\n  padding: 0;\n  margin: 0;\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd {\n  padding: 0;\n  margin: 0; }\n\nul, ol {\n  list-style: none;\n  padding: 0;\n  margin: 0; }\n\nh1 {\n  margin: 0px;\n  padding: 0px;\n  font-size: 24px;\n  letter-spacing: 0;\n  font-weight: normal; }\n\nh2 {\n  font-size: 20px;\n  letter-spacing: 0;\n  font-weight: normal; }\n\nh3 {\n  font-size: 16px;\n  letter-spacing: 0;\n  font-weight: bold; }\n\ninput[type='text'] {\n  min-width: 0; }\n\n[disabled] {\n  pointer-events: none; }\n"; });
define('text!components/character/character.html', ['module'], function(module) { module.exports = "<template><require from=\"./character.css\"></require><require from=\"./skill/skill\"></require><require from=\"../shared/stat/stat\"></require><require from=\"../../data/extra/enums\"></require><div class=\"contentArea\"><div class=\"character\"><div class=\"attribute-area\"><table class=\"attribute-table\"><tr class=\"attribute\" repeat.for=\"stat of data.character.stats\"><td><stat model.bind=\"stat.key\"></stat></td><td><div class=\"skills\"><skill class=\"skill\" repeat.for=\"skillEnum of SkillEnums | select:stat.key\" model.bind=\"skillEnum\"></skill></div></td></tr></table></div><div class=\"features-area\"><div class=\"features\"><div class=\"profiency-area\"><h3 class=\"profiency-header\">Profiencies</h3><div class=\"profiency-list\"><ul><li class=\"flex-container profiency\" repeat.for=\"prof of data.character.profiencies\"><span class=\"flex-normal\">${prof.name}</span> <span class=\"flex-fixed type-placeholder\">CHAR</span></li><li class=\"flex-container profiency\" repeat.for=\"prof of data.inventory.profiencies\"><span class=\"flex-normal\">${prof.name}</span> <span class=\"flex-fixed type-placeholder\">ITEM</span></li></ul></div></div><div class=\"traits-area\"><h3 class=\"traits-header\">Features and Traits</h3><div class=\"traits-list\"><ul><li class=\"flex-container trait\" repeat.for=\"trait of data.character.traits\"><span class=\"flex-normal\">${trait.name}</span> <span class=\"flex-fixed type-placeholder\">CHAR</span></li><li class=\"flex-container trait\" repeat.for=\"trait of data.inventory.traits\"><span class=\"flex-normal\">${trait.name}</span> <span class=\"flex-fixed type-placeholder\">ITEM</span></li></ul></div></div></div></div></div></div></template>"; });
define('text!resources/fonts/font-awesome.css', ['module'], function(module) { module.exports = "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url('../fonts/fontawesome-webfont.eot?v=4.7.0');\n  src: url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.85714286em;\n}\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eeeeee;\n  border-radius: .1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: .3em;\n}\n.fa.fa-pull-right {\n  margin-left: .3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: .3em;\n}\n.fa.pull-right {\n  margin-left: .3em;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #ffffff;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\f000\";\n}\n.fa-music:before {\n  content: \"\\f001\";\n}\n.fa-search:before {\n  content: \"\\f002\";\n}\n.fa-envelope-o:before {\n  content: \"\\f003\";\n}\n.fa-heart:before {\n  content: \"\\f004\";\n}\n.fa-star:before {\n  content: \"\\f005\";\n}\n.fa-star-o:before {\n  content: \"\\f006\";\n}\n.fa-user:before {\n  content: \"\\f007\";\n}\n.fa-film:before {\n  content: \"\\f008\";\n}\n.fa-th-large:before {\n  content: \"\\f009\";\n}\n.fa-th:before {\n  content: \"\\f00a\";\n}\n.fa-th-list:before {\n  content: \"\\f00b\";\n}\n.fa-check:before {\n  content: \"\\f00c\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\f00d\";\n}\n.fa-search-plus:before {\n  content: \"\\f00e\";\n}\n.fa-search-minus:before {\n  content: \"\\f010\";\n}\n.fa-power-off:before {\n  content: \"\\f011\";\n}\n.fa-signal:before {\n  content: \"\\f012\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\f013\";\n}\n.fa-trash-o:before {\n  content: \"\\f014\";\n}\n.fa-home:before {\n  content: \"\\f015\";\n}\n.fa-file-o:before {\n  content: \"\\f016\";\n}\n.fa-clock-o:before {\n  content: \"\\f017\";\n}\n.fa-road:before {\n  content: \"\\f018\";\n}\n.fa-download:before {\n  content: \"\\f019\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\\f01a\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\\f01b\";\n}\n.fa-inbox:before {\n  content: \"\\f01c\";\n}\n.fa-play-circle-o:before {\n  content: \"\\f01d\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\f01e\";\n}\n.fa-refresh:before {\n  content: \"\\f021\";\n}\n.fa-list-alt:before {\n  content: \"\\f022\";\n}\n.fa-lock:before {\n  content: \"\\f023\";\n}\n.fa-flag:before {\n  content: \"\\f024\";\n}\n.fa-headphones:before {\n  content: \"\\f025\";\n}\n.fa-volume-off:before {\n  content: \"\\f026\";\n}\n.fa-volume-down:before {\n  content: \"\\f027\";\n}\n.fa-volume-up:before {\n  content: \"\\f028\";\n}\n.fa-qrcode:before {\n  content: \"\\f029\";\n}\n.fa-barcode:before {\n  content: \"\\f02a\";\n}\n.fa-tag:before {\n  content: \"\\f02b\";\n}\n.fa-tags:before {\n  content: \"\\f02c\";\n}\n.fa-book:before {\n  content: \"\\f02d\";\n}\n.fa-bookmark:before {\n  content: \"\\f02e\";\n}\n.fa-print:before {\n  content: \"\\f02f\";\n}\n.fa-camera:before {\n  content: \"\\f030\";\n}\n.fa-font:before {\n  content: \"\\f031\";\n}\n.fa-bold:before {\n  content: \"\\f032\";\n}\n.fa-italic:before {\n  content: \"\\f033\";\n}\n.fa-text-height:before {\n  content: \"\\f034\";\n}\n.fa-text-width:before {\n  content: \"\\f035\";\n}\n.fa-align-left:before {\n  content: \"\\f036\";\n}\n.fa-align-center:before {\n  content: \"\\f037\";\n}\n.fa-align-right:before {\n  content: \"\\f038\";\n}\n.fa-align-justify:before {\n  content: \"\\f039\";\n}\n.fa-list:before {\n  content: \"\\f03a\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\f03b\";\n}\n.fa-indent:before {\n  content: \"\\f03c\";\n}\n.fa-video-camera:before {\n  content: \"\\f03d\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\f03e\";\n}\n.fa-pencil:before {\n  content: \"\\f040\";\n}\n.fa-map-marker:before {\n  content: \"\\f041\";\n}\n.fa-adjust:before {\n  content: \"\\f042\";\n}\n.fa-tint:before {\n  content: \"\\f043\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\f044\";\n}\n.fa-share-square-o:before {\n  content: \"\\f045\";\n}\n.fa-check-square-o:before {\n  content: \"\\f046\";\n}\n.fa-arrows:before {\n  content: \"\\f047\";\n}\n.fa-step-backward:before {\n  content: \"\\f048\";\n}\n.fa-fast-backward:before {\n  content: \"\\f049\";\n}\n.fa-backward:before {\n  content: \"\\f04a\";\n}\n.fa-play:before {\n  content: \"\\f04b\";\n}\n.fa-pause:before {\n  content: \"\\f04c\";\n}\n.fa-stop:before {\n  content: \"\\f04d\";\n}\n.fa-forward:before {\n  content: \"\\f04e\";\n}\n.fa-fast-forward:before {\n  content: \"\\f050\";\n}\n.fa-step-forward:before {\n  content: \"\\f051\";\n}\n.fa-eject:before {\n  content: \"\\f052\";\n}\n.fa-chevron-left:before {\n  content: \"\\f053\";\n}\n.fa-chevron-right:before {\n  content: \"\\f054\";\n}\n.fa-plus-circle:before {\n  content: \"\\f055\";\n}\n.fa-minus-circle:before {\n  content: \"\\f056\";\n}\n.fa-times-circle:before {\n  content: \"\\f057\";\n}\n.fa-check-circle:before {\n  content: \"\\f058\";\n}\n.fa-question-circle:before {\n  content: \"\\f059\";\n}\n.fa-info-circle:before {\n  content: \"\\f05a\";\n}\n.fa-crosshairs:before {\n  content: \"\\f05b\";\n}\n.fa-times-circle-o:before {\n  content: \"\\f05c\";\n}\n.fa-check-circle-o:before {\n  content: \"\\f05d\";\n}\n.fa-ban:before {\n  content: \"\\f05e\";\n}\n.fa-arrow-left:before {\n  content: \"\\f060\";\n}\n.fa-arrow-right:before {\n  content: \"\\f061\";\n}\n.fa-arrow-up:before {\n  content: \"\\f062\";\n}\n.fa-arrow-down:before {\n  content: \"\\f063\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\f064\";\n}\n.fa-expand:before {\n  content: \"\\f065\";\n}\n.fa-compress:before {\n  content: \"\\f066\";\n}\n.fa-plus:before {\n  content: \"\\f067\";\n}\n.fa-minus:before {\n  content: \"\\f068\";\n}\n.fa-asterisk:before {\n  content: \"\\f069\";\n}\n.fa-exclamation-circle:before {\n  content: \"\\f06a\";\n}\n.fa-gift:before {\n  content: \"\\f06b\";\n}\n.fa-leaf:before {\n  content: \"\\f06c\";\n}\n.fa-fire:before {\n  content: \"\\f06d\";\n}\n.fa-eye:before {\n  content: \"\\f06e\";\n}\n.fa-eye-slash:before {\n  content: \"\\f070\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\f071\";\n}\n.fa-plane:before {\n  content: \"\\f072\";\n}\n.fa-calendar:before {\n  content: \"\\f073\";\n}\n.fa-random:before {\n  content: \"\\f074\";\n}\n.fa-comment:before {\n  content: \"\\f075\";\n}\n.fa-magnet:before {\n  content: \"\\f076\";\n}\n.fa-chevron-up:before {\n  content: \"\\f077\";\n}\n.fa-chevron-down:before {\n  content: \"\\f078\";\n}\n.fa-retweet:before {\n  content: \"\\f079\";\n}\n.fa-shopping-cart:before {\n  content: \"\\f07a\";\n}\n.fa-folder:before {\n  content: \"\\f07b\";\n}\n.fa-folder-open:before {\n  content: \"\\f07c\";\n}\n.fa-arrows-v:before {\n  content: \"\\f07d\";\n}\n.fa-arrows-h:before {\n  content: \"\\f07e\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\f080\";\n}\n.fa-twitter-square:before {\n  content: \"\\f081\";\n}\n.fa-facebook-square:before {\n  content: \"\\f082\";\n}\n.fa-camera-retro:before {\n  content: \"\\f083\";\n}\n.fa-key:before {\n  content: \"\\f084\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\f085\";\n}\n.fa-comments:before {\n  content: \"\\f086\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\\f087\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\\f088\";\n}\n.fa-star-half:before {\n  content: \"\\f089\";\n}\n.fa-heart-o:before {\n  content: \"\\f08a\";\n}\n.fa-sign-out:before {\n  content: \"\\f08b\";\n}\n.fa-linkedin-square:before {\n  content: \"\\f08c\";\n}\n.fa-thumb-tack:before {\n  content: \"\\f08d\";\n}\n.fa-external-link:before {\n  content: \"\\f08e\";\n}\n.fa-sign-in:before {\n  content: \"\\f090\";\n}\n.fa-trophy:before {\n  content: \"\\f091\";\n}\n.fa-github-square:before {\n  content: \"\\f092\";\n}\n.fa-upload:before {\n  content: \"\\f093\";\n}\n.fa-lemon-o:before {\n  content: \"\\f094\";\n}\n.fa-phone:before {\n  content: \"\\f095\";\n}\n.fa-square-o:before {\n  content: \"\\f096\";\n}\n.fa-bookmark-o:before {\n  content: \"\\f097\";\n}\n.fa-phone-square:before {\n  content: \"\\f098\";\n}\n.fa-twitter:before {\n  content: \"\\f099\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\f09a\";\n}\n.fa-github:before {\n  content: \"\\f09b\";\n}\n.fa-unlock:before {\n  content: \"\\f09c\";\n}\n.fa-credit-card:before {\n  content: \"\\f09d\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\f09e\";\n}\n.fa-hdd-o:before {\n  content: \"\\f0a0\";\n}\n.fa-bullhorn:before {\n  content: \"\\f0a1\";\n}\n.fa-bell:before {\n  content: \"\\f0f3\";\n}\n.fa-certificate:before {\n  content: \"\\f0a3\";\n}\n.fa-hand-o-right:before {\n  content: \"\\f0a4\";\n}\n.fa-hand-o-left:before {\n  content: \"\\f0a5\";\n}\n.fa-hand-o-up:before {\n  content: \"\\f0a6\";\n}\n.fa-hand-o-down:before {\n  content: \"\\f0a7\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\\f0a8\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\\f0a9\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\\f0aa\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\\f0ab\";\n}\n.fa-globe:before {\n  content: \"\\f0ac\";\n}\n.fa-wrench:before {\n  content: \"\\f0ad\";\n}\n.fa-tasks:before {\n  content: \"\\f0ae\";\n}\n.fa-filter:before {\n  content: \"\\f0b0\";\n}\n.fa-briefcase:before {\n  content: \"\\f0b1\";\n}\n.fa-arrows-alt:before {\n  content: \"\\f0b2\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\\f0c0\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\f0c1\";\n}\n.fa-cloud:before {\n  content: \"\\f0c2\";\n}\n.fa-flask:before {\n  content: \"\\f0c3\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\f0c4\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\f0c5\";\n}\n.fa-paperclip:before {\n  content: \"\\f0c6\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\f0c7\";\n}\n.fa-square:before {\n  content: \"\\f0c8\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\f0c9\";\n}\n.fa-list-ul:before {\n  content: \"\\f0ca\";\n}\n.fa-list-ol:before {\n  content: \"\\f0cb\";\n}\n.fa-strikethrough:before {\n  content: \"\\f0cc\";\n}\n.fa-underline:before {\n  content: \"\\f0cd\";\n}\n.fa-table:before {\n  content: \"\\f0ce\";\n}\n.fa-magic:before {\n  content: \"\\f0d0\";\n}\n.fa-truck:before {\n  content: \"\\f0d1\";\n}\n.fa-pinterest:before {\n  content: \"\\f0d2\";\n}\n.fa-pinterest-square:before {\n  content: \"\\f0d3\";\n}\n.fa-google-plus-square:before {\n  content: \"\\f0d4\";\n}\n.fa-google-plus:before {\n  content: \"\\f0d5\";\n}\n.fa-money:before {\n  content: \"\\f0d6\";\n}\n.fa-caret-down:before {\n  content: \"\\f0d7\";\n}\n.fa-caret-up:before {\n  content: \"\\f0d8\";\n}\n.fa-caret-left:before {\n  content: \"\\f0d9\";\n}\n.fa-caret-right:before {\n  content: \"\\f0da\";\n}\n.fa-columns:before {\n  content: \"\\f0db\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\f0dc\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\f0dd\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\f0de\";\n}\n.fa-envelope:before {\n  content: \"\\f0e0\";\n}\n.fa-linkedin:before {\n  content: \"\\f0e1\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\f0e2\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\f0e3\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\f0e4\";\n}\n.fa-comment-o:before {\n  content: \"\\f0e5\";\n}\n.fa-comments-o:before {\n  content: \"\\f0e6\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\f0e7\";\n}\n.fa-sitemap:before {\n  content: \"\\f0e8\";\n}\n.fa-umbrella:before {\n  content: \"\\f0e9\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\f0ea\";\n}\n.fa-lightbulb-o:before {\n  content: \"\\f0eb\";\n}\n.fa-exchange:before {\n  content: \"\\f0ec\";\n}\n.fa-cloud-download:before {\n  content: \"\\f0ed\";\n}\n.fa-cloud-upload:before {\n  content: \"\\f0ee\";\n}\n.fa-user-md:before {\n  content: \"\\f0f0\";\n}\n.fa-stethoscope:before {\n  content: \"\\f0f1\";\n}\n.fa-suitcase:before {\n  content: \"\\f0f2\";\n}\n.fa-bell-o:before {\n  content: \"\\f0a2\";\n}\n.fa-coffee:before {\n  content: \"\\f0f4\";\n}\n.fa-cutlery:before {\n  content: \"\\f0f5\";\n}\n.fa-file-text-o:before {\n  content: \"\\f0f6\";\n}\n.fa-building-o:before {\n  content: \"\\f0f7\";\n}\n.fa-hospital-o:before {\n  content: \"\\f0f8\";\n}\n.fa-ambulance:before {\n  content: \"\\f0f9\";\n}\n.fa-medkit:before {\n  content: \"\\f0fa\";\n}\n.fa-fighter-jet:before {\n  content: \"\\f0fb\";\n}\n.fa-beer:before {\n  content: \"\\f0fc\";\n}\n.fa-h-square:before {\n  content: \"\\f0fd\";\n}\n.fa-plus-square:before {\n  content: \"\\f0fe\";\n}\n.fa-angle-double-left:before {\n  content: \"\\f100\";\n}\n.fa-angle-double-right:before {\n  content: \"\\f101\";\n}\n.fa-angle-double-up:before {\n  content: \"\\f102\";\n}\n.fa-angle-double-down:before {\n  content: \"\\f103\";\n}\n.fa-angle-left:before {\n  content: \"\\f104\";\n}\n.fa-angle-right:before {\n  content: \"\\f105\";\n}\n.fa-angle-up:before {\n  content: \"\\f106\";\n}\n.fa-angle-down:before {\n  content: \"\\f107\";\n}\n.fa-desktop:before {\n  content: \"\\f108\";\n}\n.fa-laptop:before {\n  content: \"\\f109\";\n}\n.fa-tablet:before {\n  content: \"\\f10a\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\f10b\";\n}\n.fa-circle-o:before {\n  content: \"\\f10c\";\n}\n.fa-quote-left:before {\n  content: \"\\f10d\";\n}\n.fa-quote-right:before {\n  content: \"\\f10e\";\n}\n.fa-spinner:before {\n  content: \"\\f110\";\n}\n.fa-circle:before {\n  content: \"\\f111\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\f112\";\n}\n.fa-github-alt:before {\n  content: \"\\f113\";\n}\n.fa-folder-o:before {\n  content: \"\\f114\";\n}\n.fa-folder-open-o:before {\n  content: \"\\f115\";\n}\n.fa-smile-o:before {\n  content: \"\\f118\";\n}\n.fa-frown-o:before {\n  content: \"\\f119\";\n}\n.fa-meh-o:before {\n  content: \"\\f11a\";\n}\n.fa-gamepad:before {\n  content: \"\\f11b\";\n}\n.fa-keyboard-o:before {\n  content: \"\\f11c\";\n}\n.fa-flag-o:before {\n  content: \"\\f11d\";\n}\n.fa-flag-checkered:before {\n  content: \"\\f11e\";\n}\n.fa-terminal:before {\n  content: \"\\f120\";\n}\n.fa-code:before {\n  content: \"\\f121\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\f122\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\f123\";\n}\n.fa-location-arrow:before {\n  content: \"\\f124\";\n}\n.fa-crop:before {\n  content: \"\\f125\";\n}\n.fa-code-fork:before {\n  content: \"\\f126\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\f127\";\n}\n.fa-question:before {\n  content: \"\\f128\";\n}\n.fa-info:before {\n  content: \"\\f129\";\n}\n.fa-exclamation:before {\n  content: \"\\f12a\";\n}\n.fa-superscript:before {\n  content: \"\\f12b\";\n}\n.fa-subscript:before {\n  content: \"\\f12c\";\n}\n.fa-eraser:before {\n  content: \"\\f12d\";\n}\n.fa-puzzle-piece:before {\n  content: \"\\f12e\";\n}\n.fa-microphone:before {\n  content: \"\\f130\";\n}\n.fa-microphone-slash:before {\n  content: \"\\f131\";\n}\n.fa-shield:before {\n  content: \"\\f132\";\n}\n.fa-calendar-o:before {\n  content: \"\\f133\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\\f134\";\n}\n.fa-rocket:before {\n  content: \"\\f135\";\n}\n.fa-maxcdn:before {\n  content: \"\\f136\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\\f137\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\\f138\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\\f139\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\\f13a\";\n}\n.fa-html5:before {\n  content: \"\\f13b\";\n}\n.fa-css3:before {\n  content: \"\\f13c\";\n}\n.fa-anchor:before {\n  content: \"\\f13d\";\n}\n.fa-unlock-alt:before {\n  content: \"\\f13e\";\n}\n.fa-bullseye:before {\n  content: \"\\f140\";\n}\n.fa-ellipsis-h:before {\n  content: \"\\f141\";\n}\n.fa-ellipsis-v:before {\n  content: \"\\f142\";\n}\n.fa-rss-square:before {\n  content: \"\\f143\";\n}\n.fa-play-circle:before {\n  content: \"\\f144\";\n}\n.fa-ticket:before {\n  content: \"\\f145\";\n}\n.fa-minus-square:before {\n  content: \"\\f146\";\n}\n.fa-minus-square-o:before {\n  content: \"\\f147\";\n}\n.fa-level-up:before {\n  content: \"\\f148\";\n}\n.fa-level-down:before {\n  content: \"\\f149\";\n}\n.fa-check-square:before {\n  content: \"\\f14a\";\n}\n.fa-pencil-square:before {\n  content: \"\\f14b\";\n}\n.fa-external-link-square:before {\n  content: \"\\f14c\";\n}\n.fa-share-square:before {\n  content: \"\\f14d\";\n}\n.fa-compass:before {\n  content: \"\\f14e\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\f150\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\f151\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\f152\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\f153\";\n}\n.fa-gbp:before {\n  content: \"\\f154\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\f155\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\f156\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\f157\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\f158\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\f159\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\f15a\";\n}\n.fa-file:before {\n  content: \"\\f15b\";\n}\n.fa-file-text:before {\n  content: \"\\f15c\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\\f15d\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\\f15e\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\\f160\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\\f161\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\\f162\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\\f163\";\n}\n.fa-thumbs-up:before {\n  content: \"\\f164\";\n}\n.fa-thumbs-down:before {\n  content: \"\\f165\";\n}\n.fa-youtube-square:before {\n  content: \"\\f166\";\n}\n.fa-youtube:before {\n  content: \"\\f167\";\n}\n.fa-xing:before {\n  content: \"\\f168\";\n}\n.fa-xing-square:before {\n  content: \"\\f169\";\n}\n.fa-youtube-play:before {\n  content: \"\\f16a\";\n}\n.fa-dropbox:before {\n  content: \"\\f16b\";\n}\n.fa-stack-overflow:before {\n  content: \"\\f16c\";\n}\n.fa-instagram:before {\n  content: \"\\f16d\";\n}\n.fa-flickr:before {\n  content: \"\\f16e\";\n}\n.fa-adn:before {\n  content: \"\\f170\";\n}\n.fa-bitbucket:before {\n  content: \"\\f171\";\n}\n.fa-bitbucket-square:before {\n  content: \"\\f172\";\n}\n.fa-tumblr:before {\n  content: \"\\f173\";\n}\n.fa-tumblr-square:before {\n  content: \"\\f174\";\n}\n.fa-long-arrow-down:before {\n  content: \"\\f175\";\n}\n.fa-long-arrow-up:before {\n  content: \"\\f176\";\n}\n.fa-long-arrow-left:before {\n  content: \"\\f177\";\n}\n.fa-long-arrow-right:before {\n  content: \"\\f178\";\n}\n.fa-apple:before {\n  content: \"\\f179\";\n}\n.fa-windows:before {\n  content: \"\\f17a\";\n}\n.fa-android:before {\n  content: \"\\f17b\";\n}\n.fa-linux:before {\n  content: \"\\f17c\";\n}\n.fa-dribbble:before {\n  content: \"\\f17d\";\n}\n.fa-skype:before {\n  content: \"\\f17e\";\n}\n.fa-foursquare:before {\n  content: \"\\f180\";\n}\n.fa-trello:before {\n  content: \"\\f181\";\n}\n.fa-female:before {\n  content: \"\\f182\";\n}\n.fa-male:before {\n  content: \"\\f183\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\f184\";\n}\n.fa-sun-o:before {\n  content: \"\\f185\";\n}\n.fa-moon-o:before {\n  content: \"\\f186\";\n}\n.fa-archive:before {\n  content: \"\\f187\";\n}\n.fa-bug:before {\n  content: \"\\f188\";\n}\n.fa-vk:before {\n  content: \"\\f189\";\n}\n.fa-weibo:before {\n  content: \"\\f18a\";\n}\n.fa-renren:before {\n  content: \"\\f18b\";\n}\n.fa-pagelines:before {\n  content: \"\\f18c\";\n}\n.fa-stack-exchange:before {\n  content: \"\\f18d\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\\f18e\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\\f190\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\f191\";\n}\n.fa-dot-circle-o:before {\n  content: \"\\f192\";\n}\n.fa-wheelchair:before {\n  content: \"\\f193\";\n}\n.fa-vimeo-square:before {\n  content: \"\\f194\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\f195\";\n}\n.fa-plus-square-o:before {\n  content: \"\\f196\";\n}\n.fa-space-shuttle:before {\n  content: \"\\f197\";\n}\n.fa-slack:before {\n  content: \"\\f198\";\n}\n.fa-envelope-square:before {\n  content: \"\\f199\";\n}\n.fa-wordpress:before {\n  content: \"\\f19a\";\n}\n.fa-openid:before {\n  content: \"\\f19b\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\f19c\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\f19d\";\n}\n.fa-yahoo:before {\n  content: \"\\f19e\";\n}\n.fa-google:before {\n  content: \"\\f1a0\";\n}\n.fa-reddit:before {\n  content: \"\\f1a1\";\n}\n.fa-reddit-square:before {\n  content: \"\\f1a2\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\\f1a3\";\n}\n.fa-stumbleupon:before {\n  content: \"\\f1a4\";\n}\n.fa-delicious:before {\n  content: \"\\f1a5\";\n}\n.fa-digg:before {\n  content: \"\\f1a6\";\n}\n.fa-pied-piper-pp:before {\n  content: \"\\f1a7\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\\f1a8\";\n}\n.fa-drupal:before {\n  content: \"\\f1a9\";\n}\n.fa-joomla:before {\n  content: \"\\f1aa\";\n}\n.fa-language:before {\n  content: \"\\f1ab\";\n}\n.fa-fax:before {\n  content: \"\\f1ac\";\n}\n.fa-building:before {\n  content: \"\\f1ad\";\n}\n.fa-child:before {\n  content: \"\\f1ae\";\n}\n.fa-paw:before {\n  content: \"\\f1b0\";\n}\n.fa-spoon:before {\n  content: \"\\f1b1\";\n}\n.fa-cube:before {\n  content: \"\\f1b2\";\n}\n.fa-cubes:before {\n  content: \"\\f1b3\";\n}\n.fa-behance:before {\n  content: \"\\f1b4\";\n}\n.fa-behance-square:before {\n  content: \"\\f1b5\";\n}\n.fa-steam:before {\n  content: \"\\f1b6\";\n}\n.fa-steam-square:before {\n  content: \"\\f1b7\";\n}\n.fa-recycle:before {\n  content: \"\\f1b8\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\f1b9\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\f1ba\";\n}\n.fa-tree:before {\n  content: \"\\f1bb\";\n}\n.fa-spotify:before {\n  content: \"\\f1bc\";\n}\n.fa-deviantart:before {\n  content: \"\\f1bd\";\n}\n.fa-soundcloud:before {\n  content: \"\\f1be\";\n}\n.fa-database:before {\n  content: \"\\f1c0\";\n}\n.fa-file-pdf-o:before {\n  content: \"\\f1c1\";\n}\n.fa-file-word-o:before {\n  content: \"\\f1c2\";\n}\n.fa-file-excel-o:before {\n  content: \"\\f1c3\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\\f1c4\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\f1c5\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\f1c6\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\f1c7\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\f1c8\";\n}\n.fa-file-code-o:before {\n  content: \"\\f1c9\";\n}\n.fa-vine:before {\n  content: \"\\f1ca\";\n}\n.fa-codepen:before {\n  content: \"\\f1cb\";\n}\n.fa-jsfiddle:before {\n  content: \"\\f1cc\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\f1cd\";\n}\n.fa-circle-o-notch:before {\n  content: \"\\f1ce\";\n}\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\\f1d0\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\f1d1\";\n}\n.fa-git-square:before {\n  content: \"\\f1d2\";\n}\n.fa-git:before {\n  content: \"\\f1d3\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\f1d4\";\n}\n.fa-tencent-weibo:before {\n  content: \"\\f1d5\";\n}\n.fa-qq:before {\n  content: \"\\f1d6\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\f1d7\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\f1d8\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\f1d9\";\n}\n.fa-history:before {\n  content: \"\\f1da\";\n}\n.fa-circle-thin:before {\n  content: \"\\f1db\";\n}\n.fa-header:before {\n  content: \"\\f1dc\";\n}\n.fa-paragraph:before {\n  content: \"\\f1dd\";\n}\n.fa-sliders:before {\n  content: \"\\f1de\";\n}\n.fa-share-alt:before {\n  content: \"\\f1e0\";\n}\n.fa-share-alt-square:before {\n  content: \"\\f1e1\";\n}\n.fa-bomb:before {\n  content: \"\\f1e2\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\f1e3\";\n}\n.fa-tty:before {\n  content: \"\\f1e4\";\n}\n.fa-binoculars:before {\n  content: \"\\f1e5\";\n}\n.fa-plug:before {\n  content: \"\\f1e6\";\n}\n.fa-slideshare:before {\n  content: \"\\f1e7\";\n}\n.fa-twitch:before {\n  content: \"\\f1e8\";\n}\n.fa-yelp:before {\n  content: \"\\f1e9\";\n}\n.fa-newspaper-o:before {\n  content: \"\\f1ea\";\n}\n.fa-wifi:before {\n  content: \"\\f1eb\";\n}\n.fa-calculator:before {\n  content: \"\\f1ec\";\n}\n.fa-paypal:before {\n  content: \"\\f1ed\";\n}\n.fa-google-wallet:before {\n  content: \"\\f1ee\";\n}\n.fa-cc-visa:before {\n  content: \"\\f1f0\";\n}\n.fa-cc-mastercard:before {\n  content: \"\\f1f1\";\n}\n.fa-cc-discover:before {\n  content: \"\\f1f2\";\n}\n.fa-cc-amex:before {\n  content: \"\\f1f3\";\n}\n.fa-cc-paypal:before {\n  content: \"\\f1f4\";\n}\n.fa-cc-stripe:before {\n  content: \"\\f1f5\";\n}\n.fa-bell-slash:before {\n  content: \"\\f1f6\";\n}\n.fa-bell-slash-o:before {\n  content: \"\\f1f7\";\n}\n.fa-trash:before {\n  content: \"\\f1f8\";\n}\n.fa-copyright:before {\n  content: \"\\f1f9\";\n}\n.fa-at:before {\n  content: \"\\f1fa\";\n}\n.fa-eyedropper:before {\n  content: \"\\f1fb\";\n}\n.fa-paint-brush:before {\n  content: \"\\f1fc\";\n}\n.fa-birthday-cake:before {\n  content: \"\\f1fd\";\n}\n.fa-area-chart:before {\n  content: \"\\f1fe\";\n}\n.fa-pie-chart:before {\n  content: \"\\f200\";\n}\n.fa-line-chart:before {\n  content: \"\\f201\";\n}\n.fa-lastfm:before {\n  content: \"\\f202\";\n}\n.fa-lastfm-square:before {\n  content: \"\\f203\";\n}\n.fa-toggle-off:before {\n  content: \"\\f204\";\n}\n.fa-toggle-on:before {\n  content: \"\\f205\";\n}\n.fa-bicycle:before {\n  content: \"\\f206\";\n}\n.fa-bus:before {\n  content: \"\\f207\";\n}\n.fa-ioxhost:before {\n  content: \"\\f208\";\n}\n.fa-angellist:before {\n  content: \"\\f209\";\n}\n.fa-cc:before {\n  content: \"\\f20a\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\f20b\";\n}\n.fa-meanpath:before {\n  content: \"\\f20c\";\n}\n.fa-buysellads:before {\n  content: \"\\f20d\";\n}\n.fa-connectdevelop:before {\n  content: \"\\f20e\";\n}\n.fa-dashcube:before {\n  content: \"\\f210\";\n}\n.fa-forumbee:before {\n  content: \"\\f211\";\n}\n.fa-leanpub:before {\n  content: \"\\f212\";\n}\n.fa-sellsy:before {\n  content: \"\\f213\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\\f214\";\n}\n.fa-simplybuilt:before {\n  content: \"\\f215\";\n}\n.fa-skyatlas:before {\n  content: \"\\f216\";\n}\n.fa-cart-plus:before {\n  content: \"\\f217\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\\f218\";\n}\n.fa-diamond:before {\n  content: \"\\f219\";\n}\n.fa-ship:before {\n  content: \"\\f21a\";\n}\n.fa-user-secret:before {\n  content: \"\\f21b\";\n}\n.fa-motorcycle:before {\n  content: \"\\f21c\";\n}\n.fa-street-view:before {\n  content: \"\\f21d\";\n}\n.fa-heartbeat:before {\n  content: \"\\f21e\";\n}\n.fa-venus:before {\n  content: \"\\f221\";\n}\n.fa-mars:before {\n  content: \"\\f222\";\n}\n.fa-mercury:before {\n  content: \"\\f223\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\f224\";\n}\n.fa-transgender-alt:before {\n  content: \"\\f225\";\n}\n.fa-venus-double:before {\n  content: \"\\f226\";\n}\n.fa-mars-double:before {\n  content: \"\\f227\";\n}\n.fa-venus-mars:before {\n  content: \"\\f228\";\n}\n.fa-mars-stroke:before {\n  content: \"\\f229\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\\f22a\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\\f22b\";\n}\n.fa-neuter:before {\n  content: \"\\f22c\";\n}\n.fa-genderless:before {\n  content: \"\\f22d\";\n}\n.fa-facebook-official:before {\n  content: \"\\f230\";\n}\n.fa-pinterest-p:before {\n  content: \"\\f231\";\n}\n.fa-whatsapp:before {\n  content: \"\\f232\";\n}\n.fa-server:before {\n  content: \"\\f233\";\n}\n.fa-user-plus:before {\n  content: \"\\f234\";\n}\n.fa-user-times:before {\n  content: \"\\f235\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\f236\";\n}\n.fa-viacoin:before {\n  content: \"\\f237\";\n}\n.fa-train:before {\n  content: \"\\f238\";\n}\n.fa-subway:before {\n  content: \"\\f239\";\n}\n.fa-medium:before {\n  content: \"\\f23a\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\f23b\";\n}\n.fa-optin-monster:before {\n  content: \"\\f23c\";\n}\n.fa-opencart:before {\n  content: \"\\f23d\";\n}\n.fa-expeditedssl:before {\n  content: \"\\f23e\";\n}\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\\f240\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\f241\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\f242\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\f243\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\f244\";\n}\n.fa-mouse-pointer:before {\n  content: \"\\f245\";\n}\n.fa-i-cursor:before {\n  content: \"\\f246\";\n}\n.fa-object-group:before {\n  content: \"\\f247\";\n}\n.fa-object-ungroup:before {\n  content: \"\\f248\";\n}\n.fa-sticky-note:before {\n  content: \"\\f249\";\n}\n.fa-sticky-note-o:before {\n  content: \"\\f24a\";\n}\n.fa-cc-jcb:before {\n  content: \"\\f24b\";\n}\n.fa-cc-diners-club:before {\n  content: \"\\f24c\";\n}\n.fa-clone:before {\n  content: \"\\f24d\";\n}\n.fa-balance-scale:before {\n  content: \"\\f24e\";\n}\n.fa-hourglass-o:before {\n  content: \"\\f250\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\f251\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\f252\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\f253\";\n}\n.fa-hourglass:before {\n  content: \"\\f254\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\f255\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\f256\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\\f257\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\\f258\";\n}\n.fa-hand-spock-o:before {\n  content: \"\\f259\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\\f25a\";\n}\n.fa-hand-peace-o:before {\n  content: \"\\f25b\";\n}\n.fa-trademark:before {\n  content: \"\\f25c\";\n}\n.fa-registered:before {\n  content: \"\\f25d\";\n}\n.fa-creative-commons:before {\n  content: \"\\f25e\";\n}\n.fa-gg:before {\n  content: \"\\f260\";\n}\n.fa-gg-circle:before {\n  content: \"\\f261\";\n}\n.fa-tripadvisor:before {\n  content: \"\\f262\";\n}\n.fa-odnoklassniki:before {\n  content: \"\\f263\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\\f264\";\n}\n.fa-get-pocket:before {\n  content: \"\\f265\";\n}\n.fa-wikipedia-w:before {\n  content: \"\\f266\";\n}\n.fa-safari:before {\n  content: \"\\f267\";\n}\n.fa-chrome:before {\n  content: \"\\f268\";\n}\n.fa-firefox:before {\n  content: \"\\f269\";\n}\n.fa-opera:before {\n  content: \"\\f26a\";\n}\n.fa-internet-explorer:before {\n  content: \"\\f26b\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\f26c\";\n}\n.fa-contao:before {\n  content: \"\\f26d\";\n}\n.fa-500px:before {\n  content: \"\\f26e\";\n}\n.fa-amazon:before {\n  content: \"\\f270\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\\f271\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\\f272\";\n}\n.fa-calendar-times-o:before {\n  content: \"\\f273\";\n}\n.fa-calendar-check-o:before {\n  content: \"\\f274\";\n}\n.fa-industry:before {\n  content: \"\\f275\";\n}\n.fa-map-pin:before {\n  content: \"\\f276\";\n}\n.fa-map-signs:before {\n  content: \"\\f277\";\n}\n.fa-map-o:before {\n  content: \"\\f278\";\n}\n.fa-map:before {\n  content: \"\\f279\";\n}\n.fa-commenting:before {\n  content: \"\\f27a\";\n}\n.fa-commenting-o:before {\n  content: \"\\f27b\";\n}\n.fa-houzz:before {\n  content: \"\\f27c\";\n}\n.fa-vimeo:before {\n  content: \"\\f27d\";\n}\n.fa-black-tie:before {\n  content: \"\\f27e\";\n}\n.fa-fonticons:before {\n  content: \"\\f280\";\n}\n.fa-reddit-alien:before {\n  content: \"\\f281\";\n}\n.fa-edge:before {\n  content: \"\\f282\";\n}\n.fa-credit-card-alt:before {\n  content: \"\\f283\";\n}\n.fa-codiepie:before {\n  content: \"\\f284\";\n}\n.fa-modx:before {\n  content: \"\\f285\";\n}\n.fa-fort-awesome:before {\n  content: \"\\f286\";\n}\n.fa-usb:before {\n  content: \"\\f287\";\n}\n.fa-product-hunt:before {\n  content: \"\\f288\";\n}\n.fa-mixcloud:before {\n  content: \"\\f289\";\n}\n.fa-scribd:before {\n  content: \"\\f28a\";\n}\n.fa-pause-circle:before {\n  content: \"\\f28b\";\n}\n.fa-pause-circle-o:before {\n  content: \"\\f28c\";\n}\n.fa-stop-circle:before {\n  content: \"\\f28d\";\n}\n.fa-stop-circle-o:before {\n  content: \"\\f28e\";\n}\n.fa-shopping-bag:before {\n  content: \"\\f290\";\n}\n.fa-shopping-basket:before {\n  content: \"\\f291\";\n}\n.fa-hashtag:before {\n  content: \"\\f292\";\n}\n.fa-bluetooth:before {\n  content: \"\\f293\";\n}\n.fa-bluetooth-b:before {\n  content: \"\\f294\";\n}\n.fa-percent:before {\n  content: \"\\f295\";\n}\n.fa-gitlab:before {\n  content: \"\\f296\";\n}\n.fa-wpbeginner:before {\n  content: \"\\f297\";\n}\n.fa-wpforms:before {\n  content: \"\\f298\";\n}\n.fa-envira:before {\n  content: \"\\f299\";\n}\n.fa-universal-access:before {\n  content: \"\\f29a\";\n}\n.fa-wheelchair-alt:before {\n  content: \"\\f29b\";\n}\n.fa-question-circle-o:before {\n  content: \"\\f29c\";\n}\n.fa-blind:before {\n  content: \"\\f29d\";\n}\n.fa-audio-description:before {\n  content: \"\\f29e\";\n}\n.fa-volume-control-phone:before {\n  content: \"\\f2a0\";\n}\n.fa-braille:before {\n  content: \"\\f2a1\";\n}\n.fa-assistive-listening-systems:before {\n  content: \"\\f2a2\";\n}\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\\f2a3\";\n}\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\\f2a4\";\n}\n.fa-glide:before {\n  content: \"\\f2a5\";\n}\n.fa-glide-g:before {\n  content: \"\\f2a6\";\n}\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\\f2a7\";\n}\n.fa-low-vision:before {\n  content: \"\\f2a8\";\n}\n.fa-viadeo:before {\n  content: \"\\f2a9\";\n}\n.fa-viadeo-square:before {\n  content: \"\\f2aa\";\n}\n.fa-snapchat:before {\n  content: \"\\f2ab\";\n}\n.fa-snapchat-ghost:before {\n  content: \"\\f2ac\";\n}\n.fa-snapchat-square:before {\n  content: \"\\f2ad\";\n}\n.fa-pied-piper:before {\n  content: \"\\f2ae\";\n}\n.fa-first-order:before {\n  content: \"\\f2b0\";\n}\n.fa-yoast:before {\n  content: \"\\f2b1\";\n}\n.fa-themeisle:before {\n  content: \"\\f2b2\";\n}\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\\f2b3\";\n}\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\\f2b4\";\n}\n.fa-handshake-o:before {\n  content: \"\\f2b5\";\n}\n.fa-envelope-open:before {\n  content: \"\\f2b6\";\n}\n.fa-envelope-open-o:before {\n  content: \"\\f2b7\";\n}\n.fa-linode:before {\n  content: \"\\f2b8\";\n}\n.fa-address-book:before {\n  content: \"\\f2b9\";\n}\n.fa-address-book-o:before {\n  content: \"\\f2ba\";\n}\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\\f2bb\";\n}\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\\f2bc\";\n}\n.fa-user-circle:before {\n  content: \"\\f2bd\";\n}\n.fa-user-circle-o:before {\n  content: \"\\f2be\";\n}\n.fa-user-o:before {\n  content: \"\\f2c0\";\n}\n.fa-id-badge:before {\n  content: \"\\f2c1\";\n}\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\\f2c2\";\n}\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\\f2c3\";\n}\n.fa-quora:before {\n  content: \"\\f2c4\";\n}\n.fa-free-code-camp:before {\n  content: \"\\f2c5\";\n}\n.fa-telegram:before {\n  content: \"\\f2c6\";\n}\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\\f2c7\";\n}\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\\f2c8\";\n}\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\\f2c9\";\n}\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\\f2ca\";\n}\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\\f2cb\";\n}\n.fa-shower:before {\n  content: \"\\f2cc\";\n}\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\\f2cd\";\n}\n.fa-podcast:before {\n  content: \"\\f2ce\";\n}\n.fa-window-maximize:before {\n  content: \"\\f2d0\";\n}\n.fa-window-minimize:before {\n  content: \"\\f2d1\";\n}\n.fa-window-restore:before {\n  content: \"\\f2d2\";\n}\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\\f2d3\";\n}\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\\f2d4\";\n}\n.fa-bandcamp:before {\n  content: \"\\f2d5\";\n}\n.fa-grav:before {\n  content: \"\\f2d6\";\n}\n.fa-etsy:before {\n  content: \"\\f2d7\";\n}\n.fa-imdb:before {\n  content: \"\\f2d8\";\n}\n.fa-ravelry:before {\n  content: \"\\f2d9\";\n}\n.fa-eercast:before {\n  content: \"\\f2da\";\n}\n.fa-microchip:before {\n  content: \"\\f2db\";\n}\n.fa-snowflake-o:before {\n  content: \"\\f2dc\";\n}\n.fa-superpowers:before {\n  content: \"\\f2dd\";\n}\n.fa-wpexplorer:before {\n  content: \"\\f2de\";\n}\n.fa-meetup:before {\n  content: \"\\f2e0\";\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "html,\nbody {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  overflow: hidden;\n  font-family: 'Roboto Condensed';\n  font-size: 14px;\n  color: #333; }\n\nbutton {\n  border-radius: 0;\n  height: 21px;\n  background: dodgerblue;\n  border: 1px solid #333;\n  cursor: pointer; }\n\nselect {\n  height: 21px; }\n\ninput[type=\"text\"],\ninput[type=\"number\"] {\n  height: 21px; }\n\n.navbar {\n  display: flex;\n  flex-direction: column;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 50px;\n  height: 100vh;\n  background: #eee;\n  border-right: 1px solid #979797; }\n  .navbar .navbar-placeholder {\n    flex: 0 50px;\n    border-bottom: 1px solid #979797; }\n  .navbar .navbar-item {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    text-decoration: none;\n    text-transform: uppercase;\n    color: #333;\n    flex: 0 50px;\n    padding: 0 5px;\n    border-bottom: 1px solid #979797; }\n    .navbar .navbar-item:hover {\n      background: #ddd; }\n    .navbar .navbar-item.active {\n      text-decoration: underline; }\n\n.generalinfo {\n  position: fixed;\n  top: 0;\n  left: 50px;\n  line-height: 50px;\n  width: calc(100vw - 50px);\n  height: 50px;\n  border-bottom: 1px solid #979797;\n  padding-left: 10px; }\n  .generalinfo .saveAndLoadButtons {\n    position: fixed;\n    top: 0;\n    right: 0;\n    margin: 0 10px; }\n\n.content {\n  height: calc(100vh - 50px);\n  width: calc(100vw - 50px);\n  overflow: auto;\n  position: relative;\n  margin-left: 50px;\n  margin-top: 50px; }\n\n.fa-button {\n  background: none;\n  border: none;\n  font-size: 13px;\n  padding: 0;\n  margin: 0;\n  height: auto;\n  cursor: pointer;\n  height: 16px; }\n  .fa-button.red {\n    color: red; }\n  .fa-button.blue {\n    color: dodgerblue; }\n\n.flex-container {\n  display: flex; }\n  .flex-container.flex-wrap {\n    flex-wrap: wrap; }\n  .flex-container.flex-column {\n    flex-direction: column; }\n  .flex-container.flex-justify-center {\n    justify-content: center; }\n  .flex-container .flex-center {\n    text-align: center; }\n  .flex-container > * {\n    flex: 1 auto; }\n  .flex-container .flex-fixed {\n    flex: 0 auto; }\n  .flex-container .flex-50 {\n    flex: 1 50%; }\n\n.textInput > label {\n  display: block;\n  text-transform: uppercase;\n  font-size: 9px;\n  margin-bottom: 2px; }\n"; });
define('text!components/combat/combat.html', ['module'], function(module) { module.exports = "<template><require from=\"./combat.css\"></require><div class=\"combat\"><div class=\"column\"><div class=\"infoArea\"><div class=\"infoRow\"><div class=\"infoSquare\"><span class=\"header\">AC</span> <span class=\"value\">${armorClass}</span></div><div class=\"infoSquare\"><span class=\"header\">Initiative</span> <span class=\"value\">${initiative}</span></div><div class=\"infoSquare\"><span class=\"header\">Speed</span> <span class=\"value\">${speed}</span></div></div><div class=\"infoRow\"><div class=\"infoSquare\"><span class=\"header\">HP</span><div class=\"value\"><input class=\"hpInput\" type=\"number\" value.bind=\"currentHP\"> / ${data.character.maxHP}</div></div></div><div class=\"infoRow\"><div class=\"infoSquare\"><span class=\"header\">Temporary HP</span><div class=\"value\"><input class=\"hpInput\" type=\"number\" value.bind=\"temporaryHP\"></div></div><div class=\"infoSquare\"><span class=\"header\">HD</span><div class=\"value\"><input class=\"hdInput\" type=\"number\" value.bind=\"currentHD\">/${maxHD}d${hitDie}</div></div></div><div class=\"infoRow\"><div class=\"infoSquare\"><span class=\"header\">Saves</span><div class=\"flex-container\"><div repeat.for=\"stat of data.character.stats\"><span class=\"header\">${stat.key | translate:data.translations:'stat'}</span><div class=\"value\">${stat.key | savingThrow:data}</div></div></div></div></div></div><div class=\"weaponArea\"><table class=\"weaponTable\"><tr><th>Weapon</th><th>AB</th><th>Damage</th></tr><tr repeat.for=\"weapon of data.inventory.weapons\"><td>${weapon.name}</td><td>${weapon | attackBonus:data}</td><td>${weapon.damage} ${weapon.damageType}</td></tr></table></div></div><div class=\"column consumablesArea\">Consumables</div></div></template>"; });
define('text!variables.css', ['module'], function(module) { module.exports = ""; });
define('text!resources/fonts/font-awesome.min.css', ['module'], function(module) { module.exports = "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */@font-face{font-family:'FontAwesome';src:url('../fonts/fontawesome-webfont.eot?v=4.7.0');src:url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'),url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'),url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";-webkit-transform:scale(-1, 1);-ms-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";-webkit-transform:scale(1, -1);-ms-transform:scale(1, -1);transform:scale(1, -1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:\"\\f000\"}.fa-music:before{content:\"\\f001\"}.fa-search:before{content:\"\\f002\"}.fa-envelope-o:before{content:\"\\f003\"}.fa-heart:before{content:\"\\f004\"}.fa-star:before{content:\"\\f005\"}.fa-star-o:before{content:\"\\f006\"}.fa-user:before{content:\"\\f007\"}.fa-film:before{content:\"\\f008\"}.fa-th-large:before{content:\"\\f009\"}.fa-th:before{content:\"\\f00a\"}.fa-th-list:before{content:\"\\f00b\"}.fa-check:before{content:\"\\f00c\"}.fa-remove:before,.fa-close:before,.fa-times:before{content:\"\\f00d\"}.fa-search-plus:before{content:\"\\f00e\"}.fa-search-minus:before{content:\"\\f010\"}.fa-power-off:before{content:\"\\f011\"}.fa-signal:before{content:\"\\f012\"}.fa-gear:before,.fa-cog:before{content:\"\\f013\"}.fa-trash-o:before{content:\"\\f014\"}.fa-home:before{content:\"\\f015\"}.fa-file-o:before{content:\"\\f016\"}.fa-clock-o:before{content:\"\\f017\"}.fa-road:before{content:\"\\f018\"}.fa-download:before{content:\"\\f019\"}.fa-arrow-circle-o-down:before{content:\"\\f01a\"}.fa-arrow-circle-o-up:before{content:\"\\f01b\"}.fa-inbox:before{content:\"\\f01c\"}.fa-play-circle-o:before{content:\"\\f01d\"}.fa-rotate-right:before,.fa-repeat:before{content:\"\\f01e\"}.fa-refresh:before{content:\"\\f021\"}.fa-list-alt:before{content:\"\\f022\"}.fa-lock:before{content:\"\\f023\"}.fa-flag:before{content:\"\\f024\"}.fa-headphones:before{content:\"\\f025\"}.fa-volume-off:before{content:\"\\f026\"}.fa-volume-down:before{content:\"\\f027\"}.fa-volume-up:before{content:\"\\f028\"}.fa-qrcode:before{content:\"\\f029\"}.fa-barcode:before{content:\"\\f02a\"}.fa-tag:before{content:\"\\f02b\"}.fa-tags:before{content:\"\\f02c\"}.fa-book:before{content:\"\\f02d\"}.fa-bookmark:before{content:\"\\f02e\"}.fa-print:before{content:\"\\f02f\"}.fa-camera:before{content:\"\\f030\"}.fa-font:before{content:\"\\f031\"}.fa-bold:before{content:\"\\f032\"}.fa-italic:before{content:\"\\f033\"}.fa-text-height:before{content:\"\\f034\"}.fa-text-width:before{content:\"\\f035\"}.fa-align-left:before{content:\"\\f036\"}.fa-align-center:before{content:\"\\f037\"}.fa-align-right:before{content:\"\\f038\"}.fa-align-justify:before{content:\"\\f039\"}.fa-list:before{content:\"\\f03a\"}.fa-dedent:before,.fa-outdent:before{content:\"\\f03b\"}.fa-indent:before{content:\"\\f03c\"}.fa-video-camera:before{content:\"\\f03d\"}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:\"\\f03e\"}.fa-pencil:before{content:\"\\f040\"}.fa-map-marker:before{content:\"\\f041\"}.fa-adjust:before{content:\"\\f042\"}.fa-tint:before{content:\"\\f043\"}.fa-edit:before,.fa-pencil-square-o:before{content:\"\\f044\"}.fa-share-square-o:before{content:\"\\f045\"}.fa-check-square-o:before{content:\"\\f046\"}.fa-arrows:before{content:\"\\f047\"}.fa-step-backward:before{content:\"\\f048\"}.fa-fast-backward:before{content:\"\\f049\"}.fa-backward:before{content:\"\\f04a\"}.fa-play:before{content:\"\\f04b\"}.fa-pause:before{content:\"\\f04c\"}.fa-stop:before{content:\"\\f04d\"}.fa-forward:before{content:\"\\f04e\"}.fa-fast-forward:before{content:\"\\f050\"}.fa-step-forward:before{content:\"\\f051\"}.fa-eject:before{content:\"\\f052\"}.fa-chevron-left:before{content:\"\\f053\"}.fa-chevron-right:before{content:\"\\f054\"}.fa-plus-circle:before{content:\"\\f055\"}.fa-minus-circle:before{content:\"\\f056\"}.fa-times-circle:before{content:\"\\f057\"}.fa-check-circle:before{content:\"\\f058\"}.fa-question-circle:before{content:\"\\f059\"}.fa-info-circle:before{content:\"\\f05a\"}.fa-crosshairs:before{content:\"\\f05b\"}.fa-times-circle-o:before{content:\"\\f05c\"}.fa-check-circle-o:before{content:\"\\f05d\"}.fa-ban:before{content:\"\\f05e\"}.fa-arrow-left:before{content:\"\\f060\"}.fa-arrow-right:before{content:\"\\f061\"}.fa-arrow-up:before{content:\"\\f062\"}.fa-arrow-down:before{content:\"\\f063\"}.fa-mail-forward:before,.fa-share:before{content:\"\\f064\"}.fa-expand:before{content:\"\\f065\"}.fa-compress:before{content:\"\\f066\"}.fa-plus:before{content:\"\\f067\"}.fa-minus:before{content:\"\\f068\"}.fa-asterisk:before{content:\"\\f069\"}.fa-exclamation-circle:before{content:\"\\f06a\"}.fa-gift:before{content:\"\\f06b\"}.fa-leaf:before{content:\"\\f06c\"}.fa-fire:before{content:\"\\f06d\"}.fa-eye:before{content:\"\\f06e\"}.fa-eye-slash:before{content:\"\\f070\"}.fa-warning:before,.fa-exclamation-triangle:before{content:\"\\f071\"}.fa-plane:before{content:\"\\f072\"}.fa-calendar:before{content:\"\\f073\"}.fa-random:before{content:\"\\f074\"}.fa-comment:before{content:\"\\f075\"}.fa-magnet:before{content:\"\\f076\"}.fa-chevron-up:before{content:\"\\f077\"}.fa-chevron-down:before{content:\"\\f078\"}.fa-retweet:before{content:\"\\f079\"}.fa-shopping-cart:before{content:\"\\f07a\"}.fa-folder:before{content:\"\\f07b\"}.fa-folder-open:before{content:\"\\f07c\"}.fa-arrows-v:before{content:\"\\f07d\"}.fa-arrows-h:before{content:\"\\f07e\"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:\"\\f080\"}.fa-twitter-square:before{content:\"\\f081\"}.fa-facebook-square:before{content:\"\\f082\"}.fa-camera-retro:before{content:\"\\f083\"}.fa-key:before{content:\"\\f084\"}.fa-gears:before,.fa-cogs:before{content:\"\\f085\"}.fa-comments:before{content:\"\\f086\"}.fa-thumbs-o-up:before{content:\"\\f087\"}.fa-thumbs-o-down:before{content:\"\\f088\"}.fa-star-half:before{content:\"\\f089\"}.fa-heart-o:before{content:\"\\f08a\"}.fa-sign-out:before{content:\"\\f08b\"}.fa-linkedin-square:before{content:\"\\f08c\"}.fa-thumb-tack:before{content:\"\\f08d\"}.fa-external-link:before{content:\"\\f08e\"}.fa-sign-in:before{content:\"\\f090\"}.fa-trophy:before{content:\"\\f091\"}.fa-github-square:before{content:\"\\f092\"}.fa-upload:before{content:\"\\f093\"}.fa-lemon-o:before{content:\"\\f094\"}.fa-phone:before{content:\"\\f095\"}.fa-square-o:before{content:\"\\f096\"}.fa-bookmark-o:before{content:\"\\f097\"}.fa-phone-square:before{content:\"\\f098\"}.fa-twitter:before{content:\"\\f099\"}.fa-facebook-f:before,.fa-facebook:before{content:\"\\f09a\"}.fa-github:before{content:\"\\f09b\"}.fa-unlock:before{content:\"\\f09c\"}.fa-credit-card:before{content:\"\\f09d\"}.fa-feed:before,.fa-rss:before{content:\"\\f09e\"}.fa-hdd-o:before{content:\"\\f0a0\"}.fa-bullhorn:before{content:\"\\f0a1\"}.fa-bell:before{content:\"\\f0f3\"}.fa-certificate:before{content:\"\\f0a3\"}.fa-hand-o-right:before{content:\"\\f0a4\"}.fa-hand-o-left:before{content:\"\\f0a5\"}.fa-hand-o-up:before{content:\"\\f0a6\"}.fa-hand-o-down:before{content:\"\\f0a7\"}.fa-arrow-circle-left:before{content:\"\\f0a8\"}.fa-arrow-circle-right:before{content:\"\\f0a9\"}.fa-arrow-circle-up:before{content:\"\\f0aa\"}.fa-arrow-circle-down:before{content:\"\\f0ab\"}.fa-globe:before{content:\"\\f0ac\"}.fa-wrench:before{content:\"\\f0ad\"}.fa-tasks:before{content:\"\\f0ae\"}.fa-filter:before{content:\"\\f0b0\"}.fa-briefcase:before{content:\"\\f0b1\"}.fa-arrows-alt:before{content:\"\\f0b2\"}.fa-group:before,.fa-users:before{content:\"\\f0c0\"}.fa-chain:before,.fa-link:before{content:\"\\f0c1\"}.fa-cloud:before{content:\"\\f0c2\"}.fa-flask:before{content:\"\\f0c3\"}.fa-cut:before,.fa-scissors:before{content:\"\\f0c4\"}.fa-copy:before,.fa-files-o:before{content:\"\\f0c5\"}.fa-paperclip:before{content:\"\\f0c6\"}.fa-save:before,.fa-floppy-o:before{content:\"\\f0c7\"}.fa-square:before{content:\"\\f0c8\"}.fa-navicon:before,.fa-reorder:before,.fa-bars:before{content:\"\\f0c9\"}.fa-list-ul:before{content:\"\\f0ca\"}.fa-list-ol:before{content:\"\\f0cb\"}.fa-strikethrough:before{content:\"\\f0cc\"}.fa-underline:before{content:\"\\f0cd\"}.fa-table:before{content:\"\\f0ce\"}.fa-magic:before{content:\"\\f0d0\"}.fa-truck:before{content:\"\\f0d1\"}.fa-pinterest:before{content:\"\\f0d2\"}.fa-pinterest-square:before{content:\"\\f0d3\"}.fa-google-plus-square:before{content:\"\\f0d4\"}.fa-google-plus:before{content:\"\\f0d5\"}.fa-money:before{content:\"\\f0d6\"}.fa-caret-down:before{content:\"\\f0d7\"}.fa-caret-up:before{content:\"\\f0d8\"}.fa-caret-left:before{content:\"\\f0d9\"}.fa-caret-right:before{content:\"\\f0da\"}.fa-columns:before{content:\"\\f0db\"}.fa-unsorted:before,.fa-sort:before{content:\"\\f0dc\"}.fa-sort-down:before,.fa-sort-desc:before{content:\"\\f0dd\"}.fa-sort-up:before,.fa-sort-asc:before{content:\"\\f0de\"}.fa-envelope:before{content:\"\\f0e0\"}.fa-linkedin:before{content:\"\\f0e1\"}.fa-rotate-left:before,.fa-undo:before{content:\"\\f0e2\"}.fa-legal:before,.fa-gavel:before{content:\"\\f0e3\"}.fa-dashboard:before,.fa-tachometer:before{content:\"\\f0e4\"}.fa-comment-o:before{content:\"\\f0e5\"}.fa-comments-o:before{content:\"\\f0e6\"}.fa-flash:before,.fa-bolt:before{content:\"\\f0e7\"}.fa-sitemap:before{content:\"\\f0e8\"}.fa-umbrella:before{content:\"\\f0e9\"}.fa-paste:before,.fa-clipboard:before{content:\"\\f0ea\"}.fa-lightbulb-o:before{content:\"\\f0eb\"}.fa-exchange:before{content:\"\\f0ec\"}.fa-cloud-download:before{content:\"\\f0ed\"}.fa-cloud-upload:before{content:\"\\f0ee\"}.fa-user-md:before{content:\"\\f0f0\"}.fa-stethoscope:before{content:\"\\f0f1\"}.fa-suitcase:before{content:\"\\f0f2\"}.fa-bell-o:before{content:\"\\f0a2\"}.fa-coffee:before{content:\"\\f0f4\"}.fa-cutlery:before{content:\"\\f0f5\"}.fa-file-text-o:before{content:\"\\f0f6\"}.fa-building-o:before{content:\"\\f0f7\"}.fa-hospital-o:before{content:\"\\f0f8\"}.fa-ambulance:before{content:\"\\f0f9\"}.fa-medkit:before{content:\"\\f0fa\"}.fa-fighter-jet:before{content:\"\\f0fb\"}.fa-beer:before{content:\"\\f0fc\"}.fa-h-square:before{content:\"\\f0fd\"}.fa-plus-square:before{content:\"\\f0fe\"}.fa-angle-double-left:before{content:\"\\f100\"}.fa-angle-double-right:before{content:\"\\f101\"}.fa-angle-double-up:before{content:\"\\f102\"}.fa-angle-double-down:before{content:\"\\f103\"}.fa-angle-left:before{content:\"\\f104\"}.fa-angle-right:before{content:\"\\f105\"}.fa-angle-up:before{content:\"\\f106\"}.fa-angle-down:before{content:\"\\f107\"}.fa-desktop:before{content:\"\\f108\"}.fa-laptop:before{content:\"\\f109\"}.fa-tablet:before{content:\"\\f10a\"}.fa-mobile-phone:before,.fa-mobile:before{content:\"\\f10b\"}.fa-circle-o:before{content:\"\\f10c\"}.fa-quote-left:before{content:\"\\f10d\"}.fa-quote-right:before{content:\"\\f10e\"}.fa-spinner:before{content:\"\\f110\"}.fa-circle:before{content:\"\\f111\"}.fa-mail-reply:before,.fa-reply:before{content:\"\\f112\"}.fa-github-alt:before{content:\"\\f113\"}.fa-folder-o:before{content:\"\\f114\"}.fa-folder-open-o:before{content:\"\\f115\"}.fa-smile-o:before{content:\"\\f118\"}.fa-frown-o:before{content:\"\\f119\"}.fa-meh-o:before{content:\"\\f11a\"}.fa-gamepad:before{content:\"\\f11b\"}.fa-keyboard-o:before{content:\"\\f11c\"}.fa-flag-o:before{content:\"\\f11d\"}.fa-flag-checkered:before{content:\"\\f11e\"}.fa-terminal:before{content:\"\\f120\"}.fa-code:before{content:\"\\f121\"}.fa-mail-reply-all:before,.fa-reply-all:before{content:\"\\f122\"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:\"\\f123\"}.fa-location-arrow:before{content:\"\\f124\"}.fa-crop:before{content:\"\\f125\"}.fa-code-fork:before{content:\"\\f126\"}.fa-unlink:before,.fa-chain-broken:before{content:\"\\f127\"}.fa-question:before{content:\"\\f128\"}.fa-info:before{content:\"\\f129\"}.fa-exclamation:before{content:\"\\f12a\"}.fa-superscript:before{content:\"\\f12b\"}.fa-subscript:before{content:\"\\f12c\"}.fa-eraser:before{content:\"\\f12d\"}.fa-puzzle-piece:before{content:\"\\f12e\"}.fa-microphone:before{content:\"\\f130\"}.fa-microphone-slash:before{content:\"\\f131\"}.fa-shield:before{content:\"\\f132\"}.fa-calendar-o:before{content:\"\\f133\"}.fa-fire-extinguisher:before{content:\"\\f134\"}.fa-rocket:before{content:\"\\f135\"}.fa-maxcdn:before{content:\"\\f136\"}.fa-chevron-circle-left:before{content:\"\\f137\"}.fa-chevron-circle-right:before{content:\"\\f138\"}.fa-chevron-circle-up:before{content:\"\\f139\"}.fa-chevron-circle-down:before{content:\"\\f13a\"}.fa-html5:before{content:\"\\f13b\"}.fa-css3:before{content:\"\\f13c\"}.fa-anchor:before{content:\"\\f13d\"}.fa-unlock-alt:before{content:\"\\f13e\"}.fa-bullseye:before{content:\"\\f140\"}.fa-ellipsis-h:before{content:\"\\f141\"}.fa-ellipsis-v:before{content:\"\\f142\"}.fa-rss-square:before{content:\"\\f143\"}.fa-play-circle:before{content:\"\\f144\"}.fa-ticket:before{content:\"\\f145\"}.fa-minus-square:before{content:\"\\f146\"}.fa-minus-square-o:before{content:\"\\f147\"}.fa-level-up:before{content:\"\\f148\"}.fa-level-down:before{content:\"\\f149\"}.fa-check-square:before{content:\"\\f14a\"}.fa-pencil-square:before{content:\"\\f14b\"}.fa-external-link-square:before{content:\"\\f14c\"}.fa-share-square:before{content:\"\\f14d\"}.fa-compass:before{content:\"\\f14e\"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:\"\\f150\"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:\"\\f151\"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:\"\\f152\"}.fa-euro:before,.fa-eur:before{content:\"\\f153\"}.fa-gbp:before{content:\"\\f154\"}.fa-dollar:before,.fa-usd:before{content:\"\\f155\"}.fa-rupee:before,.fa-inr:before{content:\"\\f156\"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:\"\\f157\"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:\"\\f158\"}.fa-won:before,.fa-krw:before{content:\"\\f159\"}.fa-bitcoin:before,.fa-btc:before{content:\"\\f15a\"}.fa-file:before{content:\"\\f15b\"}.fa-file-text:before{content:\"\\f15c\"}.fa-sort-alpha-asc:before{content:\"\\f15d\"}.fa-sort-alpha-desc:before{content:\"\\f15e\"}.fa-sort-amount-asc:before{content:\"\\f160\"}.fa-sort-amount-desc:before{content:\"\\f161\"}.fa-sort-numeric-asc:before{content:\"\\f162\"}.fa-sort-numeric-desc:before{content:\"\\f163\"}.fa-thumbs-up:before{content:\"\\f164\"}.fa-thumbs-down:before{content:\"\\f165\"}.fa-youtube-square:before{content:\"\\f166\"}.fa-youtube:before{content:\"\\f167\"}.fa-xing:before{content:\"\\f168\"}.fa-xing-square:before{content:\"\\f169\"}.fa-youtube-play:before{content:\"\\f16a\"}.fa-dropbox:before{content:\"\\f16b\"}.fa-stack-overflow:before{content:\"\\f16c\"}.fa-instagram:before{content:\"\\f16d\"}.fa-flickr:before{content:\"\\f16e\"}.fa-adn:before{content:\"\\f170\"}.fa-bitbucket:before{content:\"\\f171\"}.fa-bitbucket-square:before{content:\"\\f172\"}.fa-tumblr:before{content:\"\\f173\"}.fa-tumblr-square:before{content:\"\\f174\"}.fa-long-arrow-down:before{content:\"\\f175\"}.fa-long-arrow-up:before{content:\"\\f176\"}.fa-long-arrow-left:before{content:\"\\f177\"}.fa-long-arrow-right:before{content:\"\\f178\"}.fa-apple:before{content:\"\\f179\"}.fa-windows:before{content:\"\\f17a\"}.fa-android:before{content:\"\\f17b\"}.fa-linux:before{content:\"\\f17c\"}.fa-dribbble:before{content:\"\\f17d\"}.fa-skype:before{content:\"\\f17e\"}.fa-foursquare:before{content:\"\\f180\"}.fa-trello:before{content:\"\\f181\"}.fa-female:before{content:\"\\f182\"}.fa-male:before{content:\"\\f183\"}.fa-gittip:before,.fa-gratipay:before{content:\"\\f184\"}.fa-sun-o:before{content:\"\\f185\"}.fa-moon-o:before{content:\"\\f186\"}.fa-archive:before{content:\"\\f187\"}.fa-bug:before{content:\"\\f188\"}.fa-vk:before{content:\"\\f189\"}.fa-weibo:before{content:\"\\f18a\"}.fa-renren:before{content:\"\\f18b\"}.fa-pagelines:before{content:\"\\f18c\"}.fa-stack-exchange:before{content:\"\\f18d\"}.fa-arrow-circle-o-right:before{content:\"\\f18e\"}.fa-arrow-circle-o-left:before{content:\"\\f190\"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:\"\\f191\"}.fa-dot-circle-o:before{content:\"\\f192\"}.fa-wheelchair:before{content:\"\\f193\"}.fa-vimeo-square:before{content:\"\\f194\"}.fa-turkish-lira:before,.fa-try:before{content:\"\\f195\"}.fa-plus-square-o:before{content:\"\\f196\"}.fa-space-shuttle:before{content:\"\\f197\"}.fa-slack:before{content:\"\\f198\"}.fa-envelope-square:before{content:\"\\f199\"}.fa-wordpress:before{content:\"\\f19a\"}.fa-openid:before{content:\"\\f19b\"}.fa-institution:before,.fa-bank:before,.fa-university:before{content:\"\\f19c\"}.fa-mortar-board:before,.fa-graduation-cap:before{content:\"\\f19d\"}.fa-yahoo:before{content:\"\\f19e\"}.fa-google:before{content:\"\\f1a0\"}.fa-reddit:before{content:\"\\f1a1\"}.fa-reddit-square:before{content:\"\\f1a2\"}.fa-stumbleupon-circle:before{content:\"\\f1a3\"}.fa-stumbleupon:before{content:\"\\f1a4\"}.fa-delicious:before{content:\"\\f1a5\"}.fa-digg:before{content:\"\\f1a6\"}.fa-pied-piper-pp:before{content:\"\\f1a7\"}.fa-pied-piper-alt:before{content:\"\\f1a8\"}.fa-drupal:before{content:\"\\f1a9\"}.fa-joomla:before{content:\"\\f1aa\"}.fa-language:before{content:\"\\f1ab\"}.fa-fax:before{content:\"\\f1ac\"}.fa-building:before{content:\"\\f1ad\"}.fa-child:before{content:\"\\f1ae\"}.fa-paw:before{content:\"\\f1b0\"}.fa-spoon:before{content:\"\\f1b1\"}.fa-cube:before{content:\"\\f1b2\"}.fa-cubes:before{content:\"\\f1b3\"}.fa-behance:before{content:\"\\f1b4\"}.fa-behance-square:before{content:\"\\f1b5\"}.fa-steam:before{content:\"\\f1b6\"}.fa-steam-square:before{content:\"\\f1b7\"}.fa-recycle:before{content:\"\\f1b8\"}.fa-automobile:before,.fa-car:before{content:\"\\f1b9\"}.fa-cab:before,.fa-taxi:before{content:\"\\f1ba\"}.fa-tree:before{content:\"\\f1bb\"}.fa-spotify:before{content:\"\\f1bc\"}.fa-deviantart:before{content:\"\\f1bd\"}.fa-soundcloud:before{content:\"\\f1be\"}.fa-database:before{content:\"\\f1c0\"}.fa-file-pdf-o:before{content:\"\\f1c1\"}.fa-file-word-o:before{content:\"\\f1c2\"}.fa-file-excel-o:before{content:\"\\f1c3\"}.fa-file-powerpoint-o:before{content:\"\\f1c4\"}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:\"\\f1c5\"}.fa-file-zip-o:before,.fa-file-archive-o:before{content:\"\\f1c6\"}.fa-file-sound-o:before,.fa-file-audio-o:before{content:\"\\f1c7\"}.fa-file-movie-o:before,.fa-file-video-o:before{content:\"\\f1c8\"}.fa-file-code-o:before{content:\"\\f1c9\"}.fa-vine:before{content:\"\\f1ca\"}.fa-codepen:before{content:\"\\f1cb\"}.fa-jsfiddle:before{content:\"\\f1cc\"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-saver:before,.fa-support:before,.fa-life-ring:before{content:\"\\f1cd\"}.fa-circle-o-notch:before{content:\"\\f1ce\"}.fa-ra:before,.fa-resistance:before,.fa-rebel:before{content:\"\\f1d0\"}.fa-ge:before,.fa-empire:before{content:\"\\f1d1\"}.fa-git-square:before{content:\"\\f1d2\"}.fa-git:before{content:\"\\f1d3\"}.fa-y-combinator-square:before,.fa-yc-square:before,.fa-hacker-news:before{content:\"\\f1d4\"}.fa-tencent-weibo:before{content:\"\\f1d5\"}.fa-qq:before{content:\"\\f1d6\"}.fa-wechat:before,.fa-weixin:before{content:\"\\f1d7\"}.fa-send:before,.fa-paper-plane:before{content:\"\\f1d8\"}.fa-send-o:before,.fa-paper-plane-o:before{content:\"\\f1d9\"}.fa-history:before{content:\"\\f1da\"}.fa-circle-thin:before{content:\"\\f1db\"}.fa-header:before{content:\"\\f1dc\"}.fa-paragraph:before{content:\"\\f1dd\"}.fa-sliders:before{content:\"\\f1de\"}.fa-share-alt:before{content:\"\\f1e0\"}.fa-share-alt-square:before{content:\"\\f1e1\"}.fa-bomb:before{content:\"\\f1e2\"}.fa-soccer-ball-o:before,.fa-futbol-o:before{content:\"\\f1e3\"}.fa-tty:before{content:\"\\f1e4\"}.fa-binoculars:before{content:\"\\f1e5\"}.fa-plug:before{content:\"\\f1e6\"}.fa-slideshare:before{content:\"\\f1e7\"}.fa-twitch:before{content:\"\\f1e8\"}.fa-yelp:before{content:\"\\f1e9\"}.fa-newspaper-o:before{content:\"\\f1ea\"}.fa-wifi:before{content:\"\\f1eb\"}.fa-calculator:before{content:\"\\f1ec\"}.fa-paypal:before{content:\"\\f1ed\"}.fa-google-wallet:before{content:\"\\f1ee\"}.fa-cc-visa:before{content:\"\\f1f0\"}.fa-cc-mastercard:before{content:\"\\f1f1\"}.fa-cc-discover:before{content:\"\\f1f2\"}.fa-cc-amex:before{content:\"\\f1f3\"}.fa-cc-paypal:before{content:\"\\f1f4\"}.fa-cc-stripe:before{content:\"\\f1f5\"}.fa-bell-slash:before{content:\"\\f1f6\"}.fa-bell-slash-o:before{content:\"\\f1f7\"}.fa-trash:before{content:\"\\f1f8\"}.fa-copyright:before{content:\"\\f1f9\"}.fa-at:before{content:\"\\f1fa\"}.fa-eyedropper:before{content:\"\\f1fb\"}.fa-paint-brush:before{content:\"\\f1fc\"}.fa-birthday-cake:before{content:\"\\f1fd\"}.fa-area-chart:before{content:\"\\f1fe\"}.fa-pie-chart:before{content:\"\\f200\"}.fa-line-chart:before{content:\"\\f201\"}.fa-lastfm:before{content:\"\\f202\"}.fa-lastfm-square:before{content:\"\\f203\"}.fa-toggle-off:before{content:\"\\f204\"}.fa-toggle-on:before{content:\"\\f205\"}.fa-bicycle:before{content:\"\\f206\"}.fa-bus:before{content:\"\\f207\"}.fa-ioxhost:before{content:\"\\f208\"}.fa-angellist:before{content:\"\\f209\"}.fa-cc:before{content:\"\\f20a\"}.fa-shekel:before,.fa-sheqel:before,.fa-ils:before{content:\"\\f20b\"}.fa-meanpath:before{content:\"\\f20c\"}.fa-buysellads:before{content:\"\\f20d\"}.fa-connectdevelop:before{content:\"\\f20e\"}.fa-dashcube:before{content:\"\\f210\"}.fa-forumbee:before{content:\"\\f211\"}.fa-leanpub:before{content:\"\\f212\"}.fa-sellsy:before{content:\"\\f213\"}.fa-shirtsinbulk:before{content:\"\\f214\"}.fa-simplybuilt:before{content:\"\\f215\"}.fa-skyatlas:before{content:\"\\f216\"}.fa-cart-plus:before{content:\"\\f217\"}.fa-cart-arrow-down:before{content:\"\\f218\"}.fa-diamond:before{content:\"\\f219\"}.fa-ship:before{content:\"\\f21a\"}.fa-user-secret:before{content:\"\\f21b\"}.fa-motorcycle:before{content:\"\\f21c\"}.fa-street-view:before{content:\"\\f21d\"}.fa-heartbeat:before{content:\"\\f21e\"}.fa-venus:before{content:\"\\f221\"}.fa-mars:before{content:\"\\f222\"}.fa-mercury:before{content:\"\\f223\"}.fa-intersex:before,.fa-transgender:before{content:\"\\f224\"}.fa-transgender-alt:before{content:\"\\f225\"}.fa-venus-double:before{content:\"\\f226\"}.fa-mars-double:before{content:\"\\f227\"}.fa-venus-mars:before{content:\"\\f228\"}.fa-mars-stroke:before{content:\"\\f229\"}.fa-mars-stroke-v:before{content:\"\\f22a\"}.fa-mars-stroke-h:before{content:\"\\f22b\"}.fa-neuter:before{content:\"\\f22c\"}.fa-genderless:before{content:\"\\f22d\"}.fa-facebook-official:before{content:\"\\f230\"}.fa-pinterest-p:before{content:\"\\f231\"}.fa-whatsapp:before{content:\"\\f232\"}.fa-server:before{content:\"\\f233\"}.fa-user-plus:before{content:\"\\f234\"}.fa-user-times:before{content:\"\\f235\"}.fa-hotel:before,.fa-bed:before{content:\"\\f236\"}.fa-viacoin:before{content:\"\\f237\"}.fa-train:before{content:\"\\f238\"}.fa-subway:before{content:\"\\f239\"}.fa-medium:before{content:\"\\f23a\"}.fa-yc:before,.fa-y-combinator:before{content:\"\\f23b\"}.fa-optin-monster:before{content:\"\\f23c\"}.fa-opencart:before{content:\"\\f23d\"}.fa-expeditedssl:before{content:\"\\f23e\"}.fa-battery-4:before,.fa-battery:before,.fa-battery-full:before{content:\"\\f240\"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:\"\\f241\"}.fa-battery-2:before,.fa-battery-half:before{content:\"\\f242\"}.fa-battery-1:before,.fa-battery-quarter:before{content:\"\\f243\"}.fa-battery-0:before,.fa-battery-empty:before{content:\"\\f244\"}.fa-mouse-pointer:before{content:\"\\f245\"}.fa-i-cursor:before{content:\"\\f246\"}.fa-object-group:before{content:\"\\f247\"}.fa-object-ungroup:before{content:\"\\f248\"}.fa-sticky-note:before{content:\"\\f249\"}.fa-sticky-note-o:before{content:\"\\f24a\"}.fa-cc-jcb:before{content:\"\\f24b\"}.fa-cc-diners-club:before{content:\"\\f24c\"}.fa-clone:before{content:\"\\f24d\"}.fa-balance-scale:before{content:\"\\f24e\"}.fa-hourglass-o:before{content:\"\\f250\"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:\"\\f251\"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:\"\\f252\"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:\"\\f253\"}.fa-hourglass:before{content:\"\\f254\"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:\"\\f255\"}.fa-hand-stop-o:before,.fa-hand-paper-o:before{content:\"\\f256\"}.fa-hand-scissors-o:before{content:\"\\f257\"}.fa-hand-lizard-o:before{content:\"\\f258\"}.fa-hand-spock-o:before{content:\"\\f259\"}.fa-hand-pointer-o:before{content:\"\\f25a\"}.fa-hand-peace-o:before{content:\"\\f25b\"}.fa-trademark:before{content:\"\\f25c\"}.fa-registered:before{content:\"\\f25d\"}.fa-creative-commons:before{content:\"\\f25e\"}.fa-gg:before{content:\"\\f260\"}.fa-gg-circle:before{content:\"\\f261\"}.fa-tripadvisor:before{content:\"\\f262\"}.fa-odnoklassniki:before{content:\"\\f263\"}.fa-odnoklassniki-square:before{content:\"\\f264\"}.fa-get-pocket:before{content:\"\\f265\"}.fa-wikipedia-w:before{content:\"\\f266\"}.fa-safari:before{content:\"\\f267\"}.fa-chrome:before{content:\"\\f268\"}.fa-firefox:before{content:\"\\f269\"}.fa-opera:before{content:\"\\f26a\"}.fa-internet-explorer:before{content:\"\\f26b\"}.fa-tv:before,.fa-television:before{content:\"\\f26c\"}.fa-contao:before{content:\"\\f26d\"}.fa-500px:before{content:\"\\f26e\"}.fa-amazon:before{content:\"\\f270\"}.fa-calendar-plus-o:before{content:\"\\f271\"}.fa-calendar-minus-o:before{content:\"\\f272\"}.fa-calendar-times-o:before{content:\"\\f273\"}.fa-calendar-check-o:before{content:\"\\f274\"}.fa-industry:before{content:\"\\f275\"}.fa-map-pin:before{content:\"\\f276\"}.fa-map-signs:before{content:\"\\f277\"}.fa-map-o:before{content:\"\\f278\"}.fa-map:before{content:\"\\f279\"}.fa-commenting:before{content:\"\\f27a\"}.fa-commenting-o:before{content:\"\\f27b\"}.fa-houzz:before{content:\"\\f27c\"}.fa-vimeo:before{content:\"\\f27d\"}.fa-black-tie:before{content:\"\\f27e\"}.fa-fonticons:before{content:\"\\f280\"}.fa-reddit-alien:before{content:\"\\f281\"}.fa-edge:before{content:\"\\f282\"}.fa-credit-card-alt:before{content:\"\\f283\"}.fa-codiepie:before{content:\"\\f284\"}.fa-modx:before{content:\"\\f285\"}.fa-fort-awesome:before{content:\"\\f286\"}.fa-usb:before{content:\"\\f287\"}.fa-product-hunt:before{content:\"\\f288\"}.fa-mixcloud:before{content:\"\\f289\"}.fa-scribd:before{content:\"\\f28a\"}.fa-pause-circle:before{content:\"\\f28b\"}.fa-pause-circle-o:before{content:\"\\f28c\"}.fa-stop-circle:before{content:\"\\f28d\"}.fa-stop-circle-o:before{content:\"\\f28e\"}.fa-shopping-bag:before{content:\"\\f290\"}.fa-shopping-basket:before{content:\"\\f291\"}.fa-hashtag:before{content:\"\\f292\"}.fa-bluetooth:before{content:\"\\f293\"}.fa-bluetooth-b:before{content:\"\\f294\"}.fa-percent:before{content:\"\\f295\"}.fa-gitlab:before{content:\"\\f296\"}.fa-wpbeginner:before{content:\"\\f297\"}.fa-wpforms:before{content:\"\\f298\"}.fa-envira:before{content:\"\\f299\"}.fa-universal-access:before{content:\"\\f29a\"}.fa-wheelchair-alt:before{content:\"\\f29b\"}.fa-question-circle-o:before{content:\"\\f29c\"}.fa-blind:before{content:\"\\f29d\"}.fa-audio-description:before{content:\"\\f29e\"}.fa-volume-control-phone:before{content:\"\\f2a0\"}.fa-braille:before{content:\"\\f2a1\"}.fa-assistive-listening-systems:before{content:\"\\f2a2\"}.fa-asl-interpreting:before,.fa-american-sign-language-interpreting:before{content:\"\\f2a3\"}.fa-deafness:before,.fa-hard-of-hearing:before,.fa-deaf:before{content:\"\\f2a4\"}.fa-glide:before{content:\"\\f2a5\"}.fa-glide-g:before{content:\"\\f2a6\"}.fa-signing:before,.fa-sign-language:before{content:\"\\f2a7\"}.fa-low-vision:before{content:\"\\f2a8\"}.fa-viadeo:before{content:\"\\f2a9\"}.fa-viadeo-square:before{content:\"\\f2aa\"}.fa-snapchat:before{content:\"\\f2ab\"}.fa-snapchat-ghost:before{content:\"\\f2ac\"}.fa-snapchat-square:before{content:\"\\f2ad\"}.fa-pied-piper:before{content:\"\\f2ae\"}.fa-first-order:before{content:\"\\f2b0\"}.fa-yoast:before{content:\"\\f2b1\"}.fa-themeisle:before{content:\"\\f2b2\"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:\"\\f2b3\"}.fa-fa:before,.fa-font-awesome:before{content:\"\\f2b4\"}.fa-handshake-o:before{content:\"\\f2b5\"}.fa-envelope-open:before{content:\"\\f2b6\"}.fa-envelope-open-o:before{content:\"\\f2b7\"}.fa-linode:before{content:\"\\f2b8\"}.fa-address-book:before{content:\"\\f2b9\"}.fa-address-book-o:before{content:\"\\f2ba\"}.fa-vcard:before,.fa-address-card:before{content:\"\\f2bb\"}.fa-vcard-o:before,.fa-address-card-o:before{content:\"\\f2bc\"}.fa-user-circle:before{content:\"\\f2bd\"}.fa-user-circle-o:before{content:\"\\f2be\"}.fa-user-o:before{content:\"\\f2c0\"}.fa-id-badge:before{content:\"\\f2c1\"}.fa-drivers-license:before,.fa-id-card:before{content:\"\\f2c2\"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:\"\\f2c3\"}.fa-quora:before{content:\"\\f2c4\"}.fa-free-code-camp:before{content:\"\\f2c5\"}.fa-telegram:before{content:\"\\f2c6\"}.fa-thermometer-4:before,.fa-thermometer:before,.fa-thermometer-full:before{content:\"\\f2c7\"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:\"\\f2c8\"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:\"\\f2c9\"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:\"\\f2ca\"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:\"\\f2cb\"}.fa-shower:before{content:\"\\f2cc\"}.fa-bathtub:before,.fa-s15:before,.fa-bath:before{content:\"\\f2cd\"}.fa-podcast:before{content:\"\\f2ce\"}.fa-window-maximize:before{content:\"\\f2d0\"}.fa-window-minimize:before{content:\"\\f2d1\"}.fa-window-restore:before{content:\"\\f2d2\"}.fa-times-rectangle:before,.fa-window-close:before{content:\"\\f2d3\"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:\"\\f2d4\"}.fa-bandcamp:before{content:\"\\f2d5\"}.fa-grav:before{content:\"\\f2d6\"}.fa-etsy:before{content:\"\\f2d7\"}.fa-imdb:before{content:\"\\f2d8\"}.fa-ravelry:before{content:\"\\f2d9\"}.fa-eercast:before{content:\"\\f2da\"}.fa-microchip:before{content:\"\\f2db\"}.fa-snowflake-o:before{content:\"\\f2dc\"}.fa-superpowers:before{content:\"\\f2dd\"}.fa-wpexplorer:before{content:\"\\f2de\"}.fa-meetup:before{content:\"\\f2e0\"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}\n"; });
define('text!components/inventory/inventory.html', ['module'], function(module) { module.exports = "<template><require from=\"./inventory.css\"></require><require from=\"./itemPopup/itemPopup\"></require><div class=\"contentArea\"><div class=\"itemArea\"><table class=\"itemTable\"><tr><th>Equipped</th><th>Attuned</th><th>Quantity</th></tr><tr repeat.for=\"item of data.inventory.equipped\"><td><span class=\"itemName\">${item.name}</span></td><td>-</td><td>-</td><td class=\"buttonArea\"><div><button click.delegate=\"unequip(item)\">Unequip</button> <button click.delegate=\"editItem(item)\">Edit</button> <button click.delegate=\"deleteItem(item)\">Discard</button></div></td></tr><tr class=\"secondTable\"><th>Backpack</th><th>Attunable</th><th>Quantity</th></tr><tr repeat.for=\"item of data.inventory.backpack\"><td><span class=\"itemName\">${item.name}</span></td><td>-</td><td>-</td><td class=\"buttonArea\"><div><button show.bind=\"item.equippable\" click.delegate=\"equip(item)\">Equip</button> <button click.delegate=\"editItem(item)\">Edit</button> <button click.delegate=\"deleteItem(item)\">Discard</button></div></td></tr></table></div><div class=\"functionsArea\"><button class=\"functionButton\" click.delegate=\"startCreatingNewItem()\">Create a new item</button></div></div><item-popup show.bind=\"showItemPopup\" save-item.call=\"createItem(item)\" cancel-item.call=\"cancelCreatingNewItem()\"></item-popup><item-popup show.bind=\"showEditPopup\" model.bind=\"itemToEdit\" cancel-item.call=\"cancelEditItem()\"></item-popup></template>"; });
define('text!components/functionsArea.css', ['module'], function(module) { module.exports = ".contentArea {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n  .contentArea > *:not(.functionsArea) {\n    flex: 1 1 auto;\n    overflow-y: auto; }\n  .contentArea .functionsArea {\n    flex: 0 40px;\n    display: flex;\n    flex-direction: row-reverse;\n    height: 50px;\n    background: #eee;\n    border-top: 1px solid #979797; }\n    .contentArea .functionsArea .functionButton {\n      flex: 0 auto;\n      margin: auto 10px; }\n"; });
define('text!components/levels/levels.html', ['module'], function(module) { module.exports = "<template><require from=\"./levels.css\"></require><require from=\"../shared/stat/stat\"></require><require from=\"../shared/charmod/charmod\"></require><div class=\"flex-container\"><div class=\"flex-50 levels-area\"><table class=\"levelTable\"><tr><th>Level</th><th>Class</th><th>HD</th><th>Bonuses</th></tr><tr repeat.for=\"level of data.character.levels\"><td>${data.character.levels.indexOf(level) + 1}</td><td><input type=\"text\" value.bind=\"level.characterClass\"></td><td><input type=\"number\" value.bind=\"level.hd\" class=\"hdInput\"></td><td><div class=\"bonusesArea\"><charmod model.bind=\"level\"></charmod></div></td><td><button show.bind=\"data.character.levels[data.character.levels.length-1] === level\" class=\"fa-button red removeLevelButton\" click.delegate=\"removeLevel(level)\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button></td></tr><tr><td colspan=\"4\"><button disabled.bind=\"data.character.levels.length > 19\" click.delegate=\"addNewLevel()\">Levelup</button></td></tr></table></div><div class=\"flex-50 flex-container flex-column\"><div class=\"flex-fixed\"><div class=\"stat-area\"><stat repeat.for=\"stat of data.character.stats\" model.bind=\"stat.key\" edit-mode=\"true\"></stat></div></div><div class=\"flex-fixed race-area\"><div class=\"textInput\"><label>Race</label><input type=\"text\" value.bind=\"data.character.race.name\" placeholder=\"race\"></div><div class=\"race-charmod\"><charmod model.bind=\"data.character.race\"></charmod></div></div></div></div></template>"; });
define('text!components/spells/spells.html', ['module'], function(module) { module.exports = "<template><h1>Spells</h1></template>"; });
define('text!components/character/character.css', ['module'], function(module) { module.exports = ".contentArea {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n  .contentArea > *:not(.functionsArea) {\n    flex: 1 1 auto;\n    overflow-y: auto; }\n  .contentArea .functionsArea {\n    flex: 0 40px;\n    display: flex;\n    flex-direction: row-reverse;\n    height: 50px;\n    background: #eee;\n    border-top: 1px solid #979797; }\n    .contentArea .functionsArea .functionButton {\n      flex: 0 auto;\n      margin: auto 10px; }\n\n.character {\n  display: flex;\n  flex-flow: wrap;\n  height: calc(100% - 90px); }\n  .character .editbutton {\n    position: fixed;\n    top: 50px;\n    right: 0;\n    margin: 10px; }\n  .character .attribute-area {\n    flex: 1 60%;\n    padding: 0 10px; }\n  .character .attribute-table {\n    border-collapse: separate;\n    border-spacing: 0 10px; }\n  .character .attribute {\n    margin-top: 10px; }\n    .character .attribute .skills {\n      display: flex;\n      max-height: 60px;\n      flex-direction: column;\n      rows: 3;\n      flex-wrap: wrap; }\n      .character .attribute .skills .skill {\n        flex: 0 auto;\n        padding: 0 10px;\n        margin: auto 0 0; }\n        .character .attribute .skills .skill .skill-header {\n          display: inline-block;\n          font-size: 10px;\n          text-transform: uppercase;\n          vertical-align: middle;\n          line-height: 18px; }\n        .character .attribute .skills .skill .skill-value {\n          width: 20px;\n          display: inline-block;\n          font-size: 16px;\n          margin-left: 5px;\n          vertical-align: middle; }\n          .character .attribute .skills .skill .skill-value.proficient {\n            font-weight: bold; }\n        .character .attribute .skills .skill .skill-edit {\n          width: 20px;\n          margin-left: 5px;\n          display: inline-block; }\n  .character .features-area {\n    flex: 1 40%;\n    padding: 0 10px 10px;\n    min-width: 185px; }\n    .character .features-area .features {\n      display: flex;\n      margin-bottom: 10px;\n      flex-direction: column; }\n      .character .features-area .features > * {\n        flex: 1 auto; }\n  .character .profiency-area {\n    padding: 0; }\n    .character .profiency-area .profiency-header {\n      margin: 10px 0; }\n    .character .profiency-area .profiency-list {\n      border: 1px solid black;\n      padding: 10px; }\n  .character .traits-area {\n    padding: 0; }\n    .character .traits-area .traits-header {\n      margin: 10px 0; }\n    .character .traits-area .traits-list {\n      border: 1px solid black;\n      padding: 10px; }\n  .character .profiency-area .add-button,\n  .character .traits-area .add-button {\n    margin-left: 5px; }\n  .character .profiency-area .trait > .type-placeholder,\n  .character .profiency-area .profiency > .type-placeholder,\n  .character .traits-area .trait > .type-placeholder,\n  .character .traits-area .profiency > .type-placeholder {\n    display: none;\n    color: #aaa;\n    font-size: 10px;\n    line-height: 16px; }\n  .character .profiency-area .trait:hover > .type-placeholder,\n  .character .profiency-area .profiency:hover > .type-placeholder,\n  .character .traits-area .trait:hover > .type-placeholder,\n  .character .traits-area .profiency:hover > .type-placeholder {\n    display: inline-block; }\n"; });
define('text!components/combat/combat.css', ['module'], function(module) { module.exports = ".combat {\n  display: flex;\n  flex-wrap: wrap; }\n  .combat .column {\n    flex: 1 50%;\n    display: flex;\n    flex-direction: column; }\n  .combat .weaponArea {\n    flex: 1 auto; }\n    .combat .weaponArea .weaponTable {\n      margin: 10px;\n      margin-top: 0;\n      width: 100%; }\n      .combat .weaponArea .weaponTable th {\n        text-align: left;\n        padding-right: 10px; }\n  .combat .infoArea {\n    flex: 1 auto;\n    display: flex;\n    flex-direction: column;\n    margin: 5px; }\n    .combat .infoArea .infoRow {\n      display: flex;\n      flex-grow: 1 auto; }\n      .combat .infoArea .infoRow .infoSquare {\n        padding: 5px;\n        padding-bottom: 10px;\n        text-align: center;\n        margin: 5px;\n        flex: 1 auto;\n        border: 1px solid black;\n        display: flex;\n        flex-direction: column; }\n        .combat .infoArea .infoRow .infoSquare .header {\n          flex: 0 auto;\n          text-transform: uppercase;\n          font-size: 10px;\n          text-align: center; }\n        .combat .infoArea .infoRow .infoSquare .value {\n          flex: 1 auto;\n          font-size: 24px;\n          vertical-align: middle;\n          text-align: center; }\n          .combat .infoArea .infoRow .infoSquare .value .hpInput {\n            padding-left: 5px;\n            width: 70px;\n            height: auto;\n            font-size: 24px; }\n          .combat .infoArea .infoRow .infoSquare .value .hdInput {\n            padding-left: 5px;\n            width: 50px;\n            height: auto;\n            font-size: 24px; }\n  .combat .consumablesArea {\n    padding: 10px; }\n"; });
define('text!components/character/skill/skill.html', ['module'], function(module) { module.exports = "<template><div class=\"skill-header\">${name}</div><div class=\"skill-value ${hasProfiency ? 'proficient' : ''}\" show.bind=\"!editMode\">${skillScore}</div></template>"; });
define('text!components/shared/charmod/charmod.html', ['module'], function(module) { module.exports = "<template><require from=\"./charmod.css\"></require><require from=\"./skillSelect/skillSelect\"></require><require from=\"./statSelect/statSelect\"></require><require from=\"./numberSelect/numberSelect\"></require><require from=\"../../../data/extra/enums\"></require><table class=\"bonusesTable\"><tr repeat.for=\"skillProf of model.skillProfiencies\"><td>Skill profiency</td><td><skill-select current-skill.bind=\"skillProf\" list.bind=\"model.skillProfiencies\"></skill-select></td><td><button class=\"fa-button red removeButton\" click.delegate=\"removeSkill(skillProf)\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button></td></tr><tr repeat.for=\"otherProf of model.otherProfiencies\"><td>Other profiency</td><td><input type=\"text\" class=\"inputElement\" value.bind=\"otherProf.name\"></td><td><button class=\"fa-button red removeButton\" click.delegate=\"removeOtherProf(otherProf)\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button></td></tr><tr repeat.for=\"trait of model.traits\"><td>Trait</td><td><input type=\"text\" class=\"inputElement\" value.bind=\"trait.name\"></td><td><button class=\"fa-button red removeButton\" click.delegate=\"removeTrait(trait)\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button></td></tr><tr repeat.for=\"setstat of model.setStats\"><td>Set stat to</td><td><select value.bind=\"setstat.stat\"><option repeat.for=\"statEnum of StatEnums\" model.bind=\"statEnum\">${statEnum | translate:data.translations:'stat'}</option></select><input type=\"number\" value.bind=\"setstat.value | number & throttle\"></td><td><button class=\"fa-button red removeButton\" click.delegate=\"removeSetStat(setstat)\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button></td></tr><tr repeat.for=\"addstat of model.addToStats\"><td>Add to stat</td><td><select value.bind=\"addstat.stat\"><option repeat.for=\"statEnum of StatEnums\" model.bind=\"statEnum\">${statEnum | translate:data.translations:'stat'}</option></select><input type=\"number\" value.bind=\"addstat.value | number & throttle\"></td><td><button class=\"fa-button red removeButton\" click.delegate=\"removeAddStat(addstat)\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button></td></tr><tr repeat.for=\"saveprof of model.saveProfiencies\"><td>Saving throw profiency</td><td><stat-select current-stat.bind=\"saveprof\" list.bind=\"model.saveProfiencies\"></stat-select></td><td><button class=\"fa-button red removeButton\" click.delegate=\"removeSaveProfiency(saveprof)\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button></td></tr><tr as-element=\"number-select\" model.bind=\"model.bonusToSaves\" text=\"Bonus to all saves\" remove-method.call=\"removeBonusToSaves()\"></tr><tr as-element=\"number-select\" model.bind=\"model.bonusAC\" text=\"Bonus AC\" remove-method.call=\"removeBonusToAC()\"></tr><tr as-element=\"number-select\" model.bind=\"model.bonusAB\" text=\"Bonus AB\" remove-method.call=\"removeBonusToAB()\"></tr><tr><td><select ref=\"featureTypeSelect\"><option repeat.for=\"charmod of CharModEnums\" value.bind=\"charmod\">${charmod | translate:data.translations:'charmod'}</option></select></td><td><button class=\"addButton\" click.delegate=\"addNewFeature(featureTypeSelect.value)\">Add</button></td></tr></table></template>"; });
define('text!components/inventory/inventory.css', ['module'], function(module) { module.exports = ".contentArea {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n  .contentArea > *:not(.functionsArea) {\n    flex: 1 1 auto;\n    overflow-y: auto; }\n  .contentArea .functionsArea {\n    flex: 0 40px;\n    display: flex;\n    flex-direction: row-reverse;\n    height: 50px;\n    background: #eee;\n    border-top: 1px solid #979797; }\n    .contentArea .functionsArea .functionButton {\n      flex: 0 auto;\n      margin: auto 10px; }\n\n.itemArea {\n  padding: 10px 10px 0 10px; }\n  .itemArea .itemTable {\n    width: 100%; }\n    .itemArea .itemTable tr.secondTable > th {\n      padding-top: 10px; }\n    .itemArea .itemTable td.buttonArea {\n      width: 1px;\n      text-align: right;\n      white-space: nowrap; }\n    .itemArea .itemTable th {\n      text-align: left;\n      padding-right: 10px; }\n    .itemArea .itemTable .itemName {\n      padding-right: 10px; }\n"; });
define('text!components/levels/levels.css', ['module'], function(module) { module.exports = ".levels-area {\n  padding: 5px; }\n  .levels-area .levelTable > tbody > tr > td {\n    padding-bottom: 10px;\n    vertical-align: top; }\n    .levels-area .levelTable > tbody > tr > td:first-child {\n      font-size: 16px;\n      line-height: 21px;\n      text-align: center; }\n  .levels-area .levelTable .hdInput {\n    width: 50px; }\n  .levels-area .levelTable .bonusesArea {\n    border: 1px solid black;\n    padding: 10px;\n    margin-left: 10px; }\n  .levels-area .levelTable .removeLevelButton {\n    margin-left: 5px;\n    line-height: 21px; }\n\n.stat-area {\n  padding: 5px;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap; }\n  .stat-area > * {\n    margin: 5px; }\n\n.race-area {\n  padding: 0 5px 5px; }\n  .race-area .race-charmod {\n    margin-top: 5px; }\n"; });
define('text!components/inventory/itemPopup/itemPopup.html', ['module'], function(module) { module.exports = "<template><require from=\"./itemPopup.css\"></require><require from=\"../../shared/charmod/charmod\"></require><require from=\"../../../data/extra/enums\"></require><div class=\"newItemArea\"><input class=\"itemName\" type=\"text\" placeholder=\"Name\" value.bind=\"innerModel.name\"><div class=\"typeSelectArea\"><div class=\"typeTabs\"><div><input type=\"radio\" name=\"typeradio\" value=\"ItemType.Item\" checked.bind=\"innerModel.itemType\" id=\"itemradio\" ref=\"itemradio\"><label for=\"itemradio\">Item</label></div><div><input type=\"radio\" name=\"typeradio\" value=\"ItemType.Armor\" checked.bind=\"innerModel.itemType\" id=\"armorradio\" ref=\"armorradio\"><label for=\"armorradio\">Armor</label></div><div><input type=\"radio\" name=\"typeradio\" value=\"ItemType.Weapon\" checked.bind=\"innerModel.itemType\" id=\"weaponradio\" ref=\"weaponradio\"><label for=\"weaponradio\">Weapon</label></div></div><div class=\"itemContentArea\"><div show.bind=\"itemradio.checked\" class=\"flex-container\"><div class=\"textInput flex-center\"><label>Quantity</label><input type=\"number\" value.bind=\"innerModel.quantity\" placeholder=\"quantity\"></div><div class=\"flex-center itemEquippable\"><label><input type=\"checkbox\" class=\"labelCheckBox\" checked.bind=\"innerModel.equippable\">Equippable</label></div></div><div show.bind=\"armorradio.checked\" class=\"flex-container\"><div class=\"textInput flex-center\"><label>Base AC</label><input type=\"number\" value.bind=\"innerModel.baseAC\" placeholder=\"base AC\"></div><div class=\"textInput flex-center\"><label>Max Dex bonus</label><input type=\"number\" value.bind=\"innerModel.maxDexBonus\" placeholder=\"Max Dex bonus\"></div></div><div show.bind=\"weaponradio.checked\" class=\"flex-container\"><div class=\"textInput flex-center\"><label>Damage</label><input type=\"text\" value.bind=\"innerModel.damage\" placeholder=\"1d8\"></div><div class=\"textInput flex-center\"><label>Type</label><input type=\"text\" value.bind=\"innerModel.damageType\" placeholder=\"slashing\"></div></div></div></div><div class=\"flexArea\"><div class=\"itemContentArea\"><label><input type=\"checkbox\" class=\"labelCheckBox\" checked.bind=\"innerModel.requiresAttunement\">Requires attunement</label></div><div class=\"charmodeArea\"><charmod model.bind=\"innerModel\"></charmod></div></div><div class=\"buttonArea\"><button class=\"createButton\" click.delegate=\"reset()\">Cancel</button> <button class=\"createButton\" disabled.bind=\"!name\" click.delegate=\"createItemInternal()\">Create</button></div></div></template>"; });
define('text!components/shared/stat/stat.html', ['module'], function(module) { module.exports = "<template><require from=\"./stat.css\"></require><div class=\"stat\"><div class=\"stat-header\">${name}</div><div class=\"stat-value flex-container flex-justify-center\"><button show.bind=\"editMode\" class=\"fa-button blue flex-fixed stat-editButton left\" click.delegate=\"subtract()\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button> <span class=\"flex-fixeds\">${value}</span> <button show.bind=\"editMode\" class=\"fa-button blue flex-fixed stat-editButton right\" click.delegate=\"add()\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i></button></div><div class=\"stat-modifier\">${value | statModifier}</div></div></template>"; });
define('text!components/shared/charmod/charmod.css', ['module'], function(module) { module.exports = ".bonusesTable > tbody > tr:not(:last-child) > td {\n  padding-bottom: 5px; }\n\n.bonusesTable .inputElement {\n  width: 130px; }\n\n.addButton,\n.removeButton {\n  margin-left: 5px; }\n"; });
define('text!components/shared/charmod/skillSelect/skillSelect.html', ['module'], function(module) { module.exports = "<template><require from=\"../../../../data/extra/enums\"></require><select class=\"inputElement\" value.bind=\"currentSkill\"><option repeat.for=\"skill of SkillEnums\" model.bind=\"skill\" disabled.bind=\"list.includes(skill) & signal:'skill-list-changed'\">${skill | translate:data.translations:'skill'}</option></select></template>"; });
define('text!components/inventory/itemPopup/itemPopup.css', ['module'], function(module) { module.exports = ".newItemArea {\n  display: flex;\n  flex-direction: column;\n  margin-right: 1px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  background: #eee;\n  border: 1px solid #979797;\n  box-shadow: 0 2px 3px #aaa;\n  max-height: 90vh;\n  /* Generic styles */\n  /* Area styles */ }\n  .newItemArea .labelCheckBox {\n    margin-right: 5px; }\n  .newItemArea .itemName {\n    margin: 10px;\n    padding: 3px; }\n  .newItemArea .typeSelectArea {\n    border-top: 1px solid #979797;\n    border-bottom: 1px solid #979797; }\n    .newItemArea .typeSelectArea .typeTabs {\n      display: flex;\n      flex-direction: row; }\n      .newItemArea .typeSelectArea .typeTabs > div {\n        flex: 1 auto;\n        border-right: 1px solid #979797;\n        border-bottom: 1px solid #979797; }\n        .newItemArea .typeSelectArea .typeTabs > div:last-child {\n          border-right: none; }\n        .newItemArea .typeSelectArea .typeTabs > div > input {\n          display: none; }\n        .newItemArea .typeSelectArea .typeTabs > div > label {\n          display: inline-block;\n          width: 100%;\n          padding: 5px;\n          text-align: center;\n          text-transform: uppercase;\n          font-size: 12px; }\n        .newItemArea .typeSelectArea .typeTabs > div input:not([disabled]) + label:hover {\n          background-color: #ddd; }\n        .newItemArea .typeSelectArea .typeTabs > div input[disabled] + label {\n          color: grey; }\n  .newItemArea .itemContentArea {\n    margin: 10px; }\n    .newItemArea .itemContentArea .itemEquippable {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      margin-left: 10px; }\n  .newItemArea .flexArea {\n    overflow-y: auto;\n    margin-right: 1px;\n    margin-bottom: 1px;\n    flex: 1 auto; }\n    .newItemArea .flexArea .charmodeArea {\n      padding: 0 10px 10px 10px; }\n  .newItemArea .buttonArea {\n    padding: 10px;\n    display: flex;\n    flex-direction: row-reverse;\n    border-top: 1px solid #979797; }\n    .newItemArea .buttonArea .createButton {\n      flex: 0 auto;\n      margin-left: 10px; }\n"; });
define('text!components/shared/charmod/numberSelect/numberSelect.html', ['module'], function(module) { module.exports = "<template><tr if.bind=\"model !== undefined\"><td>${text}</td><td><input type=\"number\" value.bind=\"model | number & throttle\"></td><td><button class=\"fa-button red removeButton\" click.delegate=\"removeMethod()\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></button></td></tr></template>"; });
define('text!components/shared/stat/stat.css', ['module'], function(module) { module.exports = ".stat {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid black;\n  padding: 5px;\n  width: 75px; }\n  .stat .stat-header {\n    flex: 0 auto;\n    text-transform: uppercase;\n    font-size: 10px;\n    text-align: center; }\n  .stat .stat-value {\n    flex: 1 auto;\n    font-size: 24px;\n    vertical-align: middle;\n    text-align: center; }\n    .stat .stat-value .stat-editButton {\n      height: auto; }\n      .stat .stat-value .stat-editButton.left {\n        margin-left: 5px; }\n      .stat .stat-value .stat-editButton.right {\n        margin-right: 5px; }\n  .stat .stat-modifier {\n    flex: 0 auto;\n    font-size: 16px;\n    text-align: center; }\n"; });
define('text!components/shared/charmod/statSelect/skillSelect.html', ['module'], function(module) { module.exports = "<template><require from=\"../../../../data/extra/enums\"></require><select class=\"inputElement\" value.bind=\"currentSkill\"><option repeat.for=\"skill of SkillEnums\" model.bind=\"skill\" disabled.bind=\"list.includes(skill) & signal:'skill-list-changed'\">${skill | translate:data.translations:'skill'}</option></select></template>"; });
define('text!components/shared/charmod/statSelect/statSelect.html', ['module'], function(module) { module.exports = "<template><require from=\"../../../../data/extra/enums\"></require><select class=\"inputElement\" value.bind=\"currentStat\"><option repeat.for=\"stat of StatEnums\" model.bind=\"stat\" disabled.bind=\"list.includes(stat) & signal:'stat-list-changed'\">${stat | translate:data.translations:'stat'}</option></select></template>"; });
//# sourceMappingURL=app-bundle.js.map