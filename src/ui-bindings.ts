import "jquery-ui";
import "jquery-ui/ui/widgets/mouse";
import "jquery-ui/ui/widgets/slider";

import { Simulator } from "./Simulator";
import { Defaults } from "./types";
import { gbp, mass } from "./formatters";

function render(sim: Simulator) {
  $(".simulator_amount-text").text(gbp(sim.price));
  $(".simulator_energy-text").text(gbp(sim.saving));
  $(".simulator_energy_10-text").text(gbp(sim.saving10));
  $(".simulator_biochar-text").text(mass(sim.biochar));
  $(".simulator_biochar_10-text").text(mass(sim.biochar * 10));
  $(".simulator_co2-text").text(mass(sim.co2));
  $(".simulator_co2_10-text").text(mass(sim.co2 * 10));
}

export function bindUI(sim: Simulator, defaults: Defaults) {
  render(sim);

  $(".simulator_slider-track").slider({
    classes: {
      "ui-slider-handle": "simulator_track-toggle",
    },
    min: defaults.price.min,
    max: defaults.price.max,
    step: defaults.price.step,
    value: sim.price,

    slide: (_event, ui) => {
      if (!ui.value) return;

      sim.setPrice(ui.value);
      render(sim);
    },
  });

  // should be moved to CSS file
  $(".simulator_slider-track").children().css("position", "absolute");
}
