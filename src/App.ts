import "jquery-ui";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/slider";

import { Simulator } from "./Simulator";
import { Defaults } from "./types";
import { gbp, tons, kWh } from "./utils";

export class App {
  sim: Simulator;

  constructor(private readonly defaults: Defaults) {
    this.sim = new Simulator(defaults);

    this.render();
    this.initFeedstockSelector();
    this.initPriceSlider();
    this.initEnergySlider();
  }

  initFeedstockSelector() {
    $<HTMLSelectElement>(".simulator_select-field").on("change", (event) => {
      this.sim.setFeedstock(parseInt(event.target.value));
      this.render();
    });
  }

  initPriceSlider() {
    const { price } = this.defaults;

    $(".simulator_slider-price").slider({
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
    $(".simulator_slider-price").children().css("position", "absolute");
  }

  initEnergySlider() {
    const { energy } = this.defaults;

    $(".simulator_slider-energy").slider({
      classes: {
        "ui-slider-handle": "simulator_track-toggle",
      },
      min: energy.min,
      max: energy.max,
      step: energy.step,
      value: this.sim.energy,

      slide: (_event, { value }) => {
        if (typeof value === "undefined") return;

        this.sim.setEnergy(value);
        this.render();
      },
    });

    // should be moved to CSS file
    $(".simulator_slider-energy").children().css("position", "absolute");
  }

  render() {
    const sim = this.sim;

    $(".simulator_price-text").text(gbp(sim.price));
    $(".simulator_energy-text").text(kWh(sim.energy));

    $(".simulator_saving-text").text(gbp(sim.saving));
    $(".simulator_saving_10-text").text(gbp(sim.saving10));

    $(".simulator_co2-text").text(tons(sim.co2));
    $(".simulator_co2_10-text").text(tons(sim.co2 * 10));
    $(".simulator_fossil-text").text(tons(sim.fossils));
    $(".simulator_fossil_10-text").text(tons(sim.fossils * 10));
    $(".simulator_biochar-text").text(tons(sim.biochar));
    $(".simulator_biochar_10-text").text(tons(sim.biochar * 10));
    $(".simulator_waste-text").text(tons(sim.waste));
    $(".simulator_waste_10-text").text(tons(sim.waste * 10));
  }
}
