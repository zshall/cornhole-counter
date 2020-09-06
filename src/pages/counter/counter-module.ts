import { State } from './../../state';
import { bindable, autoinject } from 'aurelia-framework';
import { connectTo, Store } from 'aurelia-store';

@connectTo()
@autoinject
export class CounterModule {
  public state: State;
  @bindable score: number;

  constructor(private store: Store<State>) {}

  plusOne() {
    this.score++;
    this.calculateScore();
    this.store.dispatch('refresh');
  }

  plusThree() {
    this.score += 3;
    this.calculateScore();
    this.store.dispatch('refresh');
  }

  minusOne() {
    if (this.score > 0) {
      this.score--;
      this.store.dispatch('refresh');
    }
  }

  calculateScore() {
    if (this.score === this.state.targetScore) {
      alert('Winner!');
    } else if (this.score > this.state.targetScore) {
      this.score = parseInt(this.state.overGoBack.toString());
    }
  }
}
