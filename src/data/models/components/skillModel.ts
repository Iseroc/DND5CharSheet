import {StatEnums, SkillEnums} from '../../extra/enums';

export class SkillModel {
  constructor(
    public name: string,
    public key: SkillEnums,
    public stat: StatEnums,
    public profiency: boolean = false,
    public expertise: boolean = false) { }
}
