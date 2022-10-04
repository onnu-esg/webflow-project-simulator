import "jquery-ui";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/slider";

import { Simulator } from "./Simulator";
import { Defaults } from "./types";
import { gbp, mass } from "./untils";

export class App {
  sim: Simulator;

  constructor(private readonly defaults: Defaults) {
    this.sim = new Simulator(defaults);

    this.render();
    this.initSlider();
  }

  initSlider() {
    const { price } = this.defaults;

    $(".simulator_slider-track").slider({
      classes: {
        "ui-slider-handle": "simulator_track-toggle",
      },
      min: price.min,
      max: price.max,
      step: price.step,
      value: this.sim.price,

      slide: (_event, ui) => {
        if (!ui.value) return;

        this.sim.setPrice(ui.value);
        this.render();
      },
    });

    // should be moved to CSS file
    $(".simulator_slider-track").children().css("position", "absolute");
  }

  render() {
    const sim = this.sim;

    $(".simulator_amount-text").text(gbp(sim.price));
    $(".simulator_energy-text").text(gbp(sim.saving));
    $(".simulator_energy_10-text").text(gbp(sim.saving10));
    $(".simulator_biochar-text").text(mass(sim.biochar));
    $(".simulator_biochar_10-text").text(mass(sim.biochar * 10));
    $(".simulator_co2-text").text(mass(sim.co2));
    $(".simulator_co2_10-text").text(mass(sim.co2 * 10));
  }
}
