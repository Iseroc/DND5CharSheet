import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: '',          moduleId: 'components/character/character', title: 'character', nav: true},
      { route: 'inventory', moduleId: 'components/inventory/inventory', title: 'inventory', nav: true},
      { route: 'combat',    moduleId: 'components/combat/combat',       title: 'combat',    nav: true},
      { route: 'spells',    moduleId: 'components/spells/spells',       title: 'spells',    nav: true},
      { route: 'levelup',   moduleId: 'components/levelup/levelup',     title: 'levelup',   nav: true}
    ]);

    this.router = router;
  }
}
