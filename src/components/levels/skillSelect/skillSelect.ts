import {inject, bindable} from 'aurelia-framework';
import {DataAccessor} from '../../../data/dataAccessor';
import {SkillEnums} from '../../../data/extra/enums';
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(DataAccessor, BindingSignaler)
export class SkillSelect {
  constructor(private data: DataAccessor, private signaler: BindingSignaler) { }

  @bindable
  currentSkill: SkillEnums;

  @bindable
  list: SkillEnums[];

  private currentSkillChanged(newValue: SkillEnums, oldValue: SkillEnums): void {
    if(newValue && this.list) {
      this.list.splice(this.list.indexOf(oldValue), 1);
      this.list.push(newValue);
      this.signaler.signal('skill-list-changed');
    }
  }
}
