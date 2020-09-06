import { autoinject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router, RouterConfiguration} from 'aurelia-router';
import { Store, MiddlewarePlacement } from 'aurelia-store';  
import { State, initialState } from './state';
import { Subscription } from 'rxjs';
import { localStorageMiddleware, logMiddleware, LogLevel } from 'aurelia-store';
import { rehydrateFromLocalStorage } from 'aurelia-store';

@autoinject
export class App {
  public router: Router;
  public state: State;
  private subscription: Subscription;

  public configureRouter(config: RouterConfiguration, router: Router): Promise<void> | PromiseLike<void> | void {
    //config.title = 'Cornhole Counter';
    config.map([
      {
        route: ['', 'counter'],
        name: 'counter',
        moduleId: PLATFORM.moduleName('./pages/counter/counter'),
        nav: true,
        title: 'Cornhole Counter'
      },
      {
        route: 'settings',
        name: 'settings',
        moduleId: PLATFORM.moduleName('./pages/settings/settings'),
        nav: true,
        title: 'Settings'
      }
    ]);

    this.router = router;
  }

  constructor(private store: Store<State>) {
    store.registerMiddleware(logMiddleware, MiddlewarePlacement.After, { logType: LogLevel.log });
    this.store.registerMiddleware(localStorageMiddleware, MiddlewarePlacement.After, { key: 'cornhole-counter' });
    this.store.registerAction('Rehydrate', rehydrateFromLocalStorage);

    const refresh = (state: State, amount: number) => {
      const newState = Object.assign({}, state);
      return newState;
    };
    this.store.registerAction('refresh', refresh);

    const reset = (state: State, amount: number) => {
      const newState = Object.assign({}, initialState);
      return newState;
    };
    this.store.registerAction('reset', reset);
  }

  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
    this.store.dispatch(rehydrateFromLocalStorage, 'cornhole-counter');
  }

  unbind() {
    this.subscription.unsubscribe();
  }
}
