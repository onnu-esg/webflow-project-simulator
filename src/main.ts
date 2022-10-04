import { Defaults } from "./types";
import { App } from "./App";

const defaults: Defaults = {
  sell: 0.1,
  interest: 0.05,
  price: {
    initial: 0.3,
    min: 0.1,
    max: 1,
    step: 0.01,
  },
  pyrolsis: {
    hours: 7500,
    energy: 1500,
    throughtput: 500,
  },
  feedstock: {
    energy: 19,
    biocharRatio: 0.25,
    co2Ratio: 0.75,
    carbonDegradeRatio: 0.75,
  },
};

$(() => new App(defaults));
