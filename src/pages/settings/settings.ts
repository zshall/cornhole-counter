import { Router } from 'aurelia-router';
import { autoinject, computedFrom } from 'aurelia-framework';
import { connectTo, Store } from 'aurelia-store';
import { State } from './../../state';
import iro from '@jaames/iro';

@autoinject
@connectTo()
export class Settings {
  public state: State;
  bagColorPicker1: iro.ColorPicker;
  bagColorPicker2: iro.ColorPicker;
  targetScore: string;
  overGoBack: string;
  bag1Color: string;
  bag1TextColor: string;
  bag2Color: string;
  bag2TextColor: string;

  constructor(private readonly router: Router, private store: Store<State>) {}

  colorPickerSettings(color: string) {
    return {
      color,
      width: 180,
      borderWidth: 1,
      borderColor: "#fff",
      layout: [
        {
          component: iro.ui.Box,
        },
        {
          component: iro.ui.Slider,
          options: {
            sliderType: 'hue'
          }
        }
      ]
    };
  }

  attached() {
    // Box & hue slider
    this.bagColorPicker1 = iro.ColorPicker("#bagColor1", this.colorPickerSettings(this.state.bag1Color));
    this.bagColorPicker2 = iro.ColorPicker("#bagColor2", this.colorPickerSettings(this.state.bag2Color));

    this.bagColorPicker1.on('color:change', (color: iro.Color) => {
      this.bag1Color = color.hexString;
      this.bag1TextColor = this.calculateTextColor(color.rgb);
    });

    this.bagColorPicker2.on('color:change', (color) => {
      this.bag2Color = color.hexString;
      this.bag2TextColor = this.calculateTextColor(color.rgb);
    });

    this.targetScore = this.state.targetScore.toString();
    this.overGoBack = this.state.overGoBack.toString();
    this.bag1Color = this.state.bag1Color;
    this.bag1TextColor = this.state.bag1TextColor;
    this.bag2Color = this.state.bag2Color;
    this.bag2TextColor = this.state.bag2TextColor;
  }

  calculateTextColor(rgb) {
    return (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186 ? '#000' : '#fff';
  }

  @computedFrom('targetScore', 'overGoBack')
  get canSave() {
    return parseInt(this.overGoBack) >= parseInt(this.targetScore);
  }

  save() {
    this.state.targetScore = parseInt(this.targetScore);
    this.state.overGoBack = parseInt(this.overGoBack);
    this.state.bag1Color = this.bag1Color;
    this.state.bag1TextColor = this.bag1TextColor;
    this.state.bag2Color = this.bag2Color;
    this.state.bag2TextColor = this.bag2TextColor;
    this.store.dispatch('refresh');
    this.router.navigateToRoute('counter');
  }

  cancel() {
    this.router.navigateBack();
  }

  reset() {
    if (confirm('Reset to default settings? All data will be lost.')) {
      this.store.dispatch('reset');
      this.router.navigateToRoute('counter');
    }
  }
}
