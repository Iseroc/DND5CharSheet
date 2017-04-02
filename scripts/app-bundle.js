define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        configureRouter(config, router) {
            config.title = 'Contacts';
            config.map([
                { route: '', moduleId: 'components/character/character', title: 'character', nav: true },
                { route: 'inventory', moduleId: 'components/inventory/inventory', title: 'inventory', nav: true },
                { route: 'combat', moduleId: 'components/combat/combat', title: 'combat', nav: true },
                { route: 'spells', moduleId: 'components/spells/spells', title: 'spells', nav: true },
                { route: 'levelup', moduleId: 'components/levelup/levelup', title: 'levelup', nav: true }
            ]);
            this.router = router;
        }
    }
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
define('data/dataAccessor',["require", "exports", "aurelia-framework", "./models/characterModel", "./models/inventoryModel", "./extra/translations", "./models/components/traitModel", "./models/components/itemModel", "./extra/enums", "./models/components/profiency"], function (require, exports, aurelia_framework_1, characterModel_1, inventoryModel_1, translations_1, traitModel_1, itemModel_1, enums_1, profiency_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let DataAccessor = class DataAccessor {
        constructor(character, inventory, translations) {
            this.character = character;
            this.inventory = inventory;
            this.translations = translations;
            this.openCharacter('Galadin');
        }
        openCharacter(charName) {
            if (charName === 'Galadin') {
                this.character.level = 16;
                this.character.stats.set(enums_1.StatEnums.STR, 18);
                this.character.stats.set(enums_1.StatEnums.DEX, 8);
                this.character.stats.set(enums_1.StatEnums.CON, 16);
                this.character.stats.set(enums_1.StatEnums.INT, 8);
                this.character.stats.set(enums_1.StatEnums.WIS, 12);
                this.character.stats.set(enums_1.StatEnums.CHA, 18);
                this.character.skills.push(enums_1.SkillEnums.ATHLETICS);
                this.character.profiencies.push(new profiency_1.Profiency('Simple weapons', 'equipment'));
                this.character.profiencies.push(new profiency_1.Profiency('Martial weapons', 'equipment'));
                this.character.profiencies.push(new profiency_1.Profiency('Desert weapons', 'equipment'));
                this.character.profiencies.push(new profiency_1.Profiency('Light armor', 'equipment'));
                this.character.profiencies.push(new profiency_1.Profiency('Medium armor', 'equipment'));
                this.character.profiencies.push(new profiency_1.Profiency('Heavy armor', 'equipment'));
                this.character.profiencies.push(new profiency_1.Profiency('Shields', 'equipment'));
                this.character.profiencies.push(new profiency_1.Profiency('Sami drum', 'instrument'));
                this.character.profiencies.push(new profiency_1.Profiency('Nubian (elven)', 'language'));
                this.character.profiencies.push(new profiency_1.Profiency('Trade common', 'language'));
                this.character.profiencies.push(new profiency_1.Profiency('Druidic', 'language'));
                this.character.traits.push(new traitModel_1.TraitModel('Darkvision 120ft'));
                this.character.traits.push(new traitModel_1.TraitModel('Keen Hearing'));
                let item = new itemModel_1.Armor('Adamantium full plate', 18, 0);
                item.additionalTraits.push(new traitModel_1.TraitModel('Critical hit immunity'));
                this.inventory.equipped.push(item);
                let item2 = new itemModel_1.ItemModel('Torch');
                this.inventory.backpack.push(item2);
            }
        }
    };
    DataAccessor = __decorate([
        aurelia_framework_1.inject(characterModel_1.CharacterModel, inventoryModel_1.InventoryModel, translations_1.Translations),
        __metadata("design:paramtypes", [characterModel_1.CharacterModel, inventoryModel_1.InventoryModel, translations_1.Translations])
    ], DataAccessor);
    exports.DataAccessor = DataAccessor;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
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
define('components/combat/combat',["require", "exports", "aurelia-framework", "../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Combat = class Combat {
        constructor(data) {
            this.data = data;
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
define('components/inventory/inventory',["require", "exports", "aurelia-framework", "../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Inventory = class Inventory {
        constructor(data) {
            this.data = data;
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
define('components/levelup/levelup',["require", "exports", "aurelia-framework", "../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Levelup = class Levelup {
        constructor(data) {
            this.data = data;
        }
    };
    Levelup = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Levelup);
    exports.Levelup = Levelup;
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
        StatEnums[StatEnums["STR"] = 0] = "STR";
        StatEnums[StatEnums["DEX"] = 1] = "DEX";
        StatEnums[StatEnums["CON"] = 2] = "CON";
        StatEnums[StatEnums["INT"] = 3] = "INT";
        StatEnums[StatEnums["WIS"] = 4] = "WIS";
        StatEnums[StatEnums["CHA"] = 5] = "CHA";
    })(StatEnums = exports.StatEnums || (exports.StatEnums = {}));
    var SkillEnums;
    (function (SkillEnums) {
        SkillEnums[SkillEnums["ACROBATICS"] = 0] = "ACROBATICS";
        SkillEnums[SkillEnums["ANIMALHANDLING"] = 1] = "ANIMALHANDLING";
        SkillEnums[SkillEnums["ARCANA"] = 2] = "ARCANA";
        SkillEnums[SkillEnums["ATHLETICS"] = 3] = "ATHLETICS";
        SkillEnums[SkillEnums["DECEPTION"] = 4] = "DECEPTION";
        SkillEnums[SkillEnums["HISTORY"] = 5] = "HISTORY";
        SkillEnums[SkillEnums["INSIGHT"] = 6] = "INSIGHT";
        SkillEnums[SkillEnums["INTIMIDATION"] = 7] = "INTIMIDATION";
        SkillEnums[SkillEnums["INVESTIGATION"] = 8] = "INVESTIGATION";
        SkillEnums[SkillEnums["MEDICINE"] = 9] = "MEDICINE";
        SkillEnums[SkillEnums["NATURE"] = 10] = "NATURE";
        SkillEnums[SkillEnums["PERCEPTION"] = 11] = "PERCEPTION";
        SkillEnums[SkillEnums["PERFORMANCE"] = 12] = "PERFORMANCE";
        SkillEnums[SkillEnums["PERSUASION"] = 13] = "PERSUASION";
        SkillEnums[SkillEnums["RELIGION"] = 14] = "RELIGION";
        SkillEnums[SkillEnums["SLEIGHTOFHAND"] = 15] = "SLEIGHTOFHAND";
        SkillEnums[SkillEnums["STEALTH"] = 16] = "STEALTH";
        SkillEnums[SkillEnums["SURVIVAL"] = 17] = "SURVIVAL";
    })(SkillEnums = exports.SkillEnums || (exports.SkillEnums = {}));
    class CountryViewEngineHooks {
        beforeBind(view) {
            view.overrideContext.SkillEnums = Object.keys(SkillEnums).map(k => SkillEnums[k]).filter(v => typeof v === "number");
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
            this.init();
        }
        init() {
            this.initStatStrings();
            this.initSkillStrings();
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
        translateStat(stat) {
            return this.statStrings.get(stat);
        }
        translateSkill(skill) {
            return this.skillStrings.get(skill);
        }
    }
    exports.Translations = Translations;
});

define('data/models/characterModel',["require", "exports", "../extra/enums"], function (require, exports, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterModel {
        constructor() {
            this.level = 1;
            this.stats = new Map();
            this.skills = [];
            this.expertises = [];
            this.profiencies = [];
            this.traits = [];
            this.stats.set(enums_1.StatEnums.STR, 10);
            this.stats.set(enums_1.StatEnums.DEX, 10);
            this.stats.set(enums_1.StatEnums.CON, 10);
            this.stats.set(enums_1.StatEnums.INT, 10);
            this.stats.set(enums_1.StatEnums.WIS, 10);
            this.stats.set(enums_1.StatEnums.CHA, 10);
        }
        get profiencyBonus() {
            return Math.floor((this.level - 1) / 4) + 2;
        }
        statModifier(statKey) {
            if (this.stats.has(statKey)) {
                return Math.floor((this.stats.get(statKey) - 10) / 2);
            }
            return -1000;
        }
    }
    exports.CharacterModel = CharacterModel;
});

define('data/models/inventoryModel',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InventoryModel {
        constructor() {
            this.armor = null;
            this.weapon = [];
            this.equipped = [];
            this.backpack = [];
        }
        get traits() {
            let arr = [];
            this.equipped.forEach(item => {
                arr = arr.concat(item.additionalTraits);
            });
            return arr;
        }
        get skills() {
            let arr = [];
            this.equipped.forEach(item => {
                arr = arr.concat(item.additionalSkillProfiencies);
            });
            return arr;
        }
        get profiencies() {
            let arr = [];
            this.equipped.forEach(item => {
                arr = arr.concat(item.additionalOtherProfiencies);
            });
            return arr;
        }
    }
    exports.InventoryModel = InventoryModel;
});

define('resources/value-converters/pointBuy',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PointBuyValueConverter {
        toView(array) {
            let points = 0;
            for (let stat of array) {
                points += stat.baseValue - 8;
                if (stat.baseValue > 13)
                    points += stat.baseValue - 13;
            }
            return points;
        }
    }
    exports.PointBuyValueConverter = PointBuyValueConverter;
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
            var score = this.data.character.statModifier(enums_1.SkillStats.get(this.model));
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
define('components/character/stat/stat',["require", "exports", "aurelia-framework", "aurelia-framework", "../../../data/dataAccessor"], function (require, exports, aurelia_framework_1, aurelia_framework_2, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Stat = class Stat {
        constructor(data) {
            this.data = data;
        }
        get name() {
            if (this.model) {
                return this.data.translations.translateStat(this.model[0]);
            }
            return "N/A";
        }
        get value() {
            if (this.model) {
                return this.model[1];
            }
            return -1000;
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], Stat.prototype, "model", void 0);
    Stat = __decorate([
        aurelia_framework_2.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Stat);
    exports.Stat = Stat;
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
define('components/inventory/item/item',["require", "exports", "aurelia-framework", "../../../data/dataAccessor", "../../../data/models/components/itemModel", "aurelia-framework"], function (require, exports, aurelia_framework_1, dataAccessor_1, itemModel_1, aurelia_framework_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Item = class Item {
        constructor(data) {
            this.data = data;
        }
        unequip() {
            if (this.data.inventory.equipped.includes(this.model)) {
                this.data.inventory.equipped.splice(this.data.inventory.equipped.indexOf(this.model), 1);
                this.data.inventory.backpack.push(this.model);
            }
        }
        equip() {
            if (this.data.inventory.backpack.includes(this.model)) {
                this.data.inventory.backpack.splice(this.data.inventory.backpack.indexOf(this.model), 1);
                this.data.inventory.equipped.push(this.model);
            }
        }
    };
    __decorate([
        aurelia_framework_2.bindable,
        __metadata("design:type", itemModel_1.ItemModel)
    ], Item.prototype, "model", void 0);
    Item = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Item);
    exports.Item = Item;
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
define('components/inventory/newitem/newtem',["require", "exports", "aurelia-framework", "../../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Newitem = class Newitem {
        constructor(data) {
            this.data = data;
        }
    };
    Newitem = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Newitem);
    exports.Newitem = Newitem;
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
define('components/levelup/lvskill/lvskill',["require", "exports", "aurelia-framework", "aurelia-framework", "../../../data/dataAccessor", "../../../data/extra/enums"], function (require, exports, aurelia_framework_1, aurelia_framework_2, dataAccessor_1, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Lvskill = class Lvskill {
        constructor(data) {
            this.data = data;
        }
        get name() {
            return this.data.translations.translateSkill(this.model);
        }
        get profiency() {
            return this.data.character.skills.includes(this.model);
        }
        set profiency(value) {
            if (!value) {
                this.data.character.skills.splice(this.data.character.skills.indexOf(this.model), 1);
            }
            if (value) {
                this.data.character.skills.push(this.model);
            }
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], Lvskill.prototype, "model", void 0);
    Lvskill = __decorate([
        aurelia_framework_2.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Lvskill);
    exports.Lvskill = Lvskill;
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
define('components/levelup/lvstat/lvstat',["require", "exports", "aurelia-framework", "aurelia-framework", "../../../data/dataAccessor", "../../../data/extra/enums"], function (require, exports, aurelia_framework_1, aurelia_framework_2, dataAccessor_1, enums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Lvstat = class Lvstat {
        constructor(data) {
            this.data = data;
        }
        get name() {
            return this.data.translations.translateStat(this.model);
        }
        get value() {
            return this.data.character.stats.get(this.model);
        }
        set value(value) {
            this.data.character.stats.set(this.model, value);
        }
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], Lvstat.prototype, "model", void 0);
    Lvstat = __decorate([
        aurelia_framework_2.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Lvstat);
    exports.Lvstat = Lvstat;
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
define('components/levelup/traits/traits',["require", "exports", "aurelia-framework", "../../../data/dataAccessor", "../../../data/models/components/traitModel"], function (require, exports, aurelia_framework_1, dataAccessor_1, traitModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Traits = class Traits {
        constructor(data) {
            this.data = data;
        }
        removeTrait(trait) {
            let i = this.data.character.traits.indexOf(trait);
            if (i > -1) {
                this.data.character.traits.splice(i, 1);
            }
        }
        addTrait() {
            if (this.newTraitText) {
                let trait = new traitModel_1.TraitModel(this.newTraitText);
                this.data.character.traits.push(trait);
                this.newTraitText = '';
            }
        }
    };
    Traits = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], Traits);
    exports.Traits = Traits;
});

define('data/models/components/characterModifyingElement',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CharacterModifyingElement {
        constructor() {
            this.additionalSkillProfiencies = [];
            this.additionalOtherProfiencies = [];
            this.additionalTraits = [];
        }
    }
    exports.CharacterModifyingElement = CharacterModifyingElement;
});

define('data/models/components/itemModel',["require", "exports", "./characterModifyingElement"], function (require, exports, characterModifyingElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemModel extends characterModifyingElement_1.CharacterModifyingElement {
        constructor(name, equippable = false, requiresAttunement = false) {
            super();
            this.name = name;
            this.equippable = equippable;
            this.requiresAttunement = requiresAttunement;
        }
    }
    exports.ItemModel = ItemModel;
    class Armor extends ItemModel {
        constructor(name, baseAC, maxDexBonus, requiresAttunement = false) {
            super(name, true, requiresAttunement);
            this.maxDexBonus = maxDexBonus;
            this.baseAC = baseAC;
        }
    }
    exports.Armor = Armor;
    class Weapon extends ItemModel {
        constructor(name, damage, damageType, requiresAttunement = false) {
            super(name, true, requiresAttunement);
            this.damage = damage;
            this.damageType = damageType;
        }
    }
    exports.Weapon = Weapon;
});

define('data/models/components/profiency',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Profiency {
        constructor(name, type) {
            this.name = name;
            this.type = type;
        }
    }
    exports.Profiency = Profiency;
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

define('data/models/components/traitModel',["require", "exports", "./characterModifyingElement"], function (require, exports, characterModifyingElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TraitModel extends characterModifyingElement_1.CharacterModifyingElement {
        constructor(name) {
            super();
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
define('components/inventory/newitem/newitem',["require", "exports", "aurelia-framework", "../../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let NewItem = class NewItem {
        constructor(data) {
            this.data = data;
        }
    };
    NewItem = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], NewItem);
    exports.NewItem = NewItem;
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
define('components/inventory/newitem/newItem',["require", "exports", "aurelia-framework", "../../../data/dataAccessor"], function (require, exports, aurelia_framework_1, dataAccessor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let NewItem = class NewItem {
        constructor(data) {
            this.data = data;
        }
    };
    NewItem = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], NewItem);
    exports.NewItem = NewItem;
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
define('components/inventory/newItem/newItem',["require", "exports", "aurelia-framework", "../../../data/dataAccessor", "../../../data/models/components/itemModel", "../../../data/models/components/profiency", "../../../data/models/components/traitModel"], function (require, exports, aurelia_framework_1, dataAccessor_1, itemModel_1, profiency_1, traitModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let NewItem = class NewItem {
        constructor(data) {
            this.data = data;
            this.additionalSkillProfiencies = [];
            this.additionalOtherProfiencies = [];
            this.additionalTraits = [];
        }
        addSkillProfiency() {
            if (!this.additionalSkillProfiencies.includes(this.selectedSkillProfiency)) {
                this.additionalSkillProfiencies.push(this.selectedSkillProfiency);
            }
        }
        addOtherProfiency() {
            if (this.newOtherProfiencyName) {
                this.additionalOtherProfiencies.push(new profiency_1.Profiency(this.newOtherProfiencyName, 'other'));
                this.newOtherProfiencyName = '';
            }
        }
        addTrait() {
            if (this.newTraitName) {
                this.additionalTraits.push(new traitModel_1.TraitModel(this.newTraitName));
                this.newTraitName = '';
            }
        }
        createItem() {
            var item = new itemModel_1.ItemModel(this.name, true);
            item.additionalOtherProfiencies = this.additionalOtherProfiencies;
            item.additionalSkillProfiencies = this.additionalSkillProfiencies;
            item.additionalTraits = this.additionalTraits;
            this.data.inventory.backpack.push(item);
        }
    };
    NewItem = __decorate([
        aurelia_framework_1.inject(dataAccessor_1.DataAccessor),
        __metadata("design:paramtypes", [dataAccessor_1.DataAccessor])
    ], NewItem);
    exports.NewItem = NewItem;
});

define('resources/value-converters/skillCalculator',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SkillCalculatorValueConverter {
        toView(profiencyBonus, baseStat, profiency, expertise) {
            var statBonus = Math.floor((baseStat - 10) / 2);
            var skill = statBonus;
            if (profiency)
                skill += profiencyBonus;
            if (expertise)
                skill += profiencyBonus;
            if (skill > 0)
                return "+" + skill;
            return skill;
        }
    }
    exports.SkillCalculatorValueConverter = SkillCalculatorValueConverter;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./styles.css\"></require><nav class=\"navbar\" role=\"navigation\"><a class=\"navbar-item ${row.isActive ? 'active' : ''}\" repeat.for=\"row of router.navigation\" href.bind=\"row.href\">${row.title}</a></nav><div class=\"content\"><router-view></router-view></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\n  overflow: hidden;\n  font-family: 'Roboto';\n  margin: 0;\n  padding: 0;\n}\n\ntable {\n  padding: 0;\n  margin: 0;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd {\n  padding: 0;\n  margin: 0;\n}\n\nul, ol {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.navbar {\n  display: flex;\n  flex-direction: row;\n  position: fixed;\n  top: 0;\n  height: 50px;\n  width: 100vw;\n  background: #aaa;\n}\n  .navbar .navbar-item {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    height: 100%;\n    text-decoration: none;\n    text-transform: uppercase;\n    color: #333;\n    flex: 0 auto;\n    padding: 0 20px;\n    border-right: 1px solid black;\n  }\n  .navbar .navbar-item:hover {\n    background: #999;\n  }\n  .navbar .navbar-item.active {\n    text-decoration: underline;\n  }\n\n.content {\n  height: calc(100vh - 50px);\n  overflow: auto;\n  position: relative;\n  margin-top: 50px;\n}\n"; });
define('text!components/character/character.html', ['module'], function(module) { module.exports = "<template><require from=\"./character.css\"></require><require from=\"./skill/skill\"></require><require from=\"./stat/stat\"></require><require from=\"../../data/extra/enums\"></require><require from=\"../../resources/value-converters/select\"></require><div class=\"attribute-area\"><table class=\"attribute-table\"><tr class=\"attribute\" repeat.for=\"[statKey, statValue] of data.character.stats\"><td><stat model.bind=\"[statKey, statValue]\"></stat></td><td><div class=\"skills\"><skill repeat.for=\"skillEnum of SkillEnums | select:statKey\" model.bind=\"skillEnum\"></skill></div></td></tr></table></div><div class=\"features\"><div class=\"profiency-area\"><h3 class=\"profiency-header\">Profiencies</h3><div class=\"profiency-list\"><ul><li repeat.for=\"prof of data.character.profiencies\">${prof.name}</li><li repeat.for=\"prof of data.inventory.profiencies\">${prof.name}</li></ul></div></div><div class=\"traits-area\"><h3 class=\"traits-header\">Features and Traits</h3><div class=\"traits-list\"><ul><li repeat.for=\"trait of data.character.traits\">${trait.name}</li><li repeat.for=\"trait of data.inventory.traits\">${trait.name}</li></ul></div></div></div></template>"; });
define('text!components/character/character.css', ['module'], function(module) { module.exports = ".attribute-area {\n  padding: 0 10px;\n}\n.attribute-table {\n  border-collapse: separate;\n  border-spacing: 0 10px;\n}\n.attribute {\n  margin-top: 10px;\n}\n  .attribute .stat {\n    border: 1px solid black;\n    padding: 5px;\n  }\n    .attribute .stat .stat-header {\n      text-transform: uppercase;\n      font-size: 10px;\n      text-align: center;\n    }\n    .attribute .stat .stat-value {\n      font-size: 24px;\n      text-align: center;\n    }\n    .attribute .stat .stat-modifier {\n      font-size: 16px;\n      text-align: center;\n    }\n\n  .attribute .skills {\n    display: flex;\n    flex-wrap: wrap;\n  }\n    .attribute .skills .skill {\n      flex: 0 auto;\n      padding: 0 10px;\n      margin: auto 0 0;\n    }\n      .attribute .skills .skill .skill-header {\n        text-align: center;\n        font-size: 10px;\n        text-transform: uppercase;\n        text-align: center;\n      }\n        .attribute .skills .skill-header.proficient::after {\n          content: '*';\n        }\n      .attribute .skills .skill .skill-value {\n        text-align: center;\n        font-size: 16px;\n        text-align: center;\n      }\n.features {\n  display: flex;\n  margin-bottom: 10px;\n}\n.features > * {\n  flex: 1 auto;\n}\n\n.profiency-area {\n  padding: 0 5px 0 10px;\n}\n.traits-area {\n  padding: 0 10px 0 5px;\n}\n.profiency-area .profiency-header,\n.traits-area .traits-header {\n  margin: 0 0 10px 0;\n}\n.profiency-area .profiency-list,\n.traits-area .traits-list {\n  border: 1px solid black;\n  padding: 10px;\n}\n"; });
define('text!components/combat/combat.html', ['module'], function(module) { module.exports = "<template><h1>Combat</h1></template>"; });
define('text!components/inventory/inventory.css', ['module'], function(module) { module.exports = ".btn-newItem {\n  position: fixed;\n  top: 50px;\n  right: 0;\n  margin: 10px;\n  z-index: 100;\n}\n\n.newItem-area {\n  position: fixed;\n  top: 50px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  background: white;\n  border: 1px solid #333;\n  width: 400px;\n  height: 300px;\n  box-shadow: 0 2px 3px #888;\n}\n.newItem-createBtn {\n}\n"; });
define('text!components/inventory/inventory.html', ['module'], function(module) { module.exports = "<template><require from=\"./inventory.css\"></require><require from=\"./item/item\"></require><require from=\"./newItem/newItem\"></require><h3>Equipped items</h3><ul><li repeat.for=\"item of data.inventory.equipped\"><item model.bind=\"item\"></item></li></ul><h3>Backpack</h3><ul><li repeat.for=\"item of data.inventory.backpack\"><item model.bind=\"item\"></item></li></ul><button class=\"btn-newItem\">Create a new item</button><new-item></new-item></template>"; });
define('text!components/levelup/levelup.html', ['module'], function(module) { module.exports = "<template><require from=\"../../resources/value-converters/pointBuy\"></require><require from=\"./traits/traits\"></require><require from=\"./lvskill/lvskill\"></require><require from=\"./lvstat/lvstat\"></require><require from=\"../../data/extra/enums\"></require><div class=\"stats\"><h3>Stats</h3><lvstat repeat.for=\"[statKey, statValue] of data.character.stats\" model.bind=\"statKey\"></lvstat></div><div class=\"profiencies\"><h3>Skill profiencies</h3><lvskill repeat.for=\"skillEnum of SkillEnums\" model.bind=\"skillEnum\"></lvskill></div><h3>Traits and features</h3><traits></traits></template>"; });
define('text!components/spells/spells.html', ['module'], function(module) { module.exports = "<template><h1>Spells</h1></template>"; });
define('text!components/character/skill/skill.html', ['module'], function(module) { module.exports = "<template><require from=\"../../../resources/value-converters/skillCalculator\"></require><div class=\"skill\"><div class=\"skill-header ${hasProfiency ? 'proficient' : ''}\">${name}</div><div class=\"skill-value\">${skillScore}</div></div></template>"; });
define('text!components/character/stat/stat.html', ['module'], function(module) { module.exports = "<template><require from=\"../../../resources/value-converters/statModifier\"></require><div class=\"stat\"><div class=\"stat-header\">${name}</div><div class=\"stat-value\">${value}</div><div class=\"stat-modifier\">${value | statModifier}</div></div></template>"; });
define('text!components/inventory/item/item.html', ['module'], function(module) { module.exports = "<template>${model.name}<ul><li repeat.for=\"prof of model.skillProfiency\">Grants profiency in ${prof}</li></ul><template if.bind=\"model.equippable\"><button click.delegate=\"unequip()\">Unequip</button> <button click.delegate=\"equip()\">Equip</button></template></template>"; });
define('text!components/inventory/newitem/newitem.html', ['module'], function(module) { module.exports = "<template><div class=\"newItem-area\"><input type=\"text\" placeholder=\"Name\"></div></template>"; });
define('text!components/levelup/lvskill/lvskill.html', ['module'], function(module) { module.exports = "<template><div><input id=\"check-${model}\" type=\"checkbox\" checked.bind=\"profiency\"><label for=\"check-${model}\">${name}</label></div></template>"; });
define('text!components/levelup/lvstat/lvstat.html', ['module'], function(module) { module.exports = "<template><div class=\"stat\"><div>${name}</div><input type=\"number\" value.bind=\"value\"></div></template>"; });
define('text!components/levelup/traits/traits.html', ['module'], function(module) { module.exports = "<template><div class=\"traits-area\"><ul><li repeat.for=\"trait of data.character.traits\">${trait.name} <button click.delegate=\"removeTrait(trait)\">Remove</button></li></ul><div><input placeholder=\"Trait name\" type=\"text\" id=\"trait-name\" value.bind=\"newTraitText\"> <button click.delegate=\"addTrait()\">Add</button></div></div></template>"; });
define('text!components/inventory/newitem/newItem.html', ['module'], function(module) { module.exports = "<template><div class=\"newItem-area\"><input type=\"text\" placeholder=\"Name\"></div></template>"; });
define('text!components/inventory/newItem/newItem.html', ['module'], function(module) { module.exports = "<template><require from=\"../../../data/extra/enums\"></require><div class=\"newItem-area\"><input type=\"text\" placeholder=\"Name\" value.bind=\"name\"><div class=\"newItem-skills\"><ul><li repeat.for=\"skill of additionalSkillProfiencies\">${skill}</li></ul><select value.bind=\"selectedSkillProfiency\"><option repeat.for=\"skillEnum of SkillEnums\" model.bind=\"skillEnum\">${skillEnum}</option></select><button click.delegate=\"addSkillProfiency()\">Add skill</button></div><div class=\"newItem-profiencies\"><ul><li repeat.for=\"profiency of additionalOtherProfiencies\">${profiency.name}</li></ul><input type=\"text\" placeholder=\"New profiency name\" value.bind=\"newOtherProfiencyName\"> <button click.delegate=\"addOtherProfiency()\">Add profiency</button></div><div class=\"newItem-traits\"><ul><li repeat.for=\"trait of additionalTraits\">${trait.name}</li></ul><input type=\"text\" placeholder=\"New trait name\" value.bind=\"newTraitName\"> <button click.delegate=\"addTrait()\">Add trait</button></div><button class=\"newItem-createBtn\" click.delegate=\"createItem()\">Create item</button></div></template>"; });
//# sourceMappingURL=app-bundle.js.map