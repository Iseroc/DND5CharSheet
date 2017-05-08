import {CharacterModifyingElement} from './characterModifyingElement';

export class LevelModel extends CharacterModifyingElement {
  constructor(public characterClass: string, public hd: number) {
    super();
  }
}
