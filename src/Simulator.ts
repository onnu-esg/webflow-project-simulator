import { compoundInterest } from "./utils";
import { Defaults, Feedstock } from "./types";

const CO2_MASS = 44 / 12;
const PYROLSIS_EFFICIENCY = 6.3;

export class Simulator {
  defaults: Defaults;

  // Inputs
  price: number;
  energy: number;
  feedstock: Feedstock;

  // Outputs
  saving = 0;
  co2 = 0;
  fossils = 0;
  biochar = 0;
  waste = 0;

  saving10 = 0;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.price = defaults.price.initial;
    this.energy = defaults.energy.initial;
    this.feedstock = defaults.feedstocks[0];

    this.calculate();
  }
  setPrice(price: number) {
    this.price = price;
    this.calculate();
  }

  setEnergy(energy: number) {
    this.energy = energy;
    this.calculate();
  }

  setFeedstock(index: number) {
    this.feedstock = this.defaults.feedstocks[index];
    this.calculate();
  }

  calculate() {
    const { pyrolsis, sell, inflation, emissionFactor } = this.defaults;

    this.saving = (this.price - sell) * this.energy * pyrolsis.hours;

    this.saving10 = Array(10)
      .fill(this.saving)
      .reduce((sum, v, i) => sum + compoundInterest(v, i, inflation), 0);

    this.fossils = this.energy * pyrolsis.hours * emissionFactor;

    this.waste =
      (this.energy / this.feedstock.energy) *
      PYROLSIS_EFFICIENCY *
      pyrolsis.hours;

    this.biochar = this.waste * this.feedstock.biocharYield;

    this.co2 =
      this.biochar *
      this.feedstock.carbonContent *
      this.feedstock.carbonDecay *
      CO2_MASS;
  }
}
