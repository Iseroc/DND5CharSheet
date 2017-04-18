import {Router, RouterConfiguration} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {DataAccessor} from './data/dataAccessor';

@inject(DataAccessor)
export class App {
  constructor(private data: DataAccessor) { }
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: '',          moduleId: 'components/character/character', title: 'CHA', nav: true},
      { route: 'inventory', moduleId: 'components/inventory/inventory', title: 'INV', nav: true},
      { route: 'combat',    moduleId: 'components/combat/combat',       title: 'COM', nav: true},
      { route: 'spells',    moduleId: 'components/spells/spells',       title: 'SPE', nav: true},
    ]);

    this.router = router;
  }
}
