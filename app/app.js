import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'ember-app/config/environment';

import MyApolloService from 'ember-app/services/apollo';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  customOptions = {
    apollo: {
      service: true,
    },
  };

  customServices = {
    apollo: MyApolloService,
  };
}

loadInitializers(App, config.modulePrefix);
