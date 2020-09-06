import { autoinject } from 'aurelia-framework';
import { connectTo, Store } from 'aurelia-store';
import { State } from './../../state';

@autoinject
@connectTo()
export class Counter {
  public state: State;

  constructor(private store: Store<State>) {}

  reset() {
    const result = confirm('Start new game?');
    if (result) {
      this.state.team1Score = 0;
      this.state.team2Score = 0;
      this.store.dispatch('refresh');
    }
  }

  getPercent(score) {
    return `${score / this.state?.targetScore * 100}%`;
  }
}
