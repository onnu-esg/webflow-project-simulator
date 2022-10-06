import "jquery-ui";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/slider";
import "./jquery.ui.touch-punch.js";

import { Simulator } from "./Simulator";
import { Defaults } from "./types";
import { gbp, tons, kW } from "./utils";

export class App {
  sim: Simulator;

  constructor(private readonly defaults: Defaults) {
    this.sim = new Simulator(defaults);

    this.render();

    this.initYearsSwitch();
    this.initFeedstockSelector();
    this.initPriceSlider();
    this.initEnergySlider();
  }

  initYearsSwitch() {
    let state = false;
    $("#simulator_switch-years").on("click", () => {
      state = !state;
      $("#simulator_switch-years .simulator_switch-toggle").css(
        "left",
        state ? "2rem" : "0rem"
      );
      this.sim.setYears(state ? 10 : 1);
      this.render();
    });
  }

  initFeedstockSelector() {
    $<HTMLSelectElement>("#simulator-select-feedstock").on(
      "change",
      (event) => {
        this.sim.setFeedstock(parseInt(event.target.value));
        this.render();
      }
    );
  }

  initPriceSlider() {
    const { price } = this.defaults;

    $("#simulator_slider-price").slider({
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
  }

  initEnergySlider() {
    const { energy } = this.defaults;

    $("#simulator_slider-energy").slider({
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
  }

  render() {
    const sim = this.sim;

    $("#simulator_saving").text(gbp(sim.saving));

    $("#simulator_price").text(`${gbp(sim.price)} per kWh`);
    $("#simulator_energy").text(kW(sim.energy));

    $("#simulator_co2").text(tons(sim.co2));
    $("#simulator_fossil").text(tons(sim.fossils));
    $("#simulator_biochar").text(tons(sim.biochar));
    $("#simulator_waste").text(tons(sim.waste));
  }
}
