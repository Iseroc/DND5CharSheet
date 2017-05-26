import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './value-converters/select',
    './value-converters/attackBonus',
    './value-converters/translate',
    './value-converters/statModifier',
    './value-converters/number',
    './value-converters/savingThrow',
  ]);
  //'./value-converters/number'
}
