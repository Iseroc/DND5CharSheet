import {Translations} from '../../data/extra/translations';

export class TranslateValueConverter {
  toView(valueToTranslate, translations: Translations, type: string) {
    if(translations) {
      if(type.toLowerCase() === 'skill') {
        return translations.translateSkill(valueToTranslate);
      }
      else if(type.toLowerCase() === 'stat') {
        return translations.translateStat(valueToTranslate);
      }
      else if(type.toLowerCase() === 'charmod') {
        return translations.translateCharMod(valueToTranslate);
      }
    }

    return valueToTranslate;
  }
}
