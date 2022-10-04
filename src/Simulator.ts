import { compoundInterest } from "./untils";
import { Defaults } from "./types";

const CO2_MASS = 44 / 12;

export class Simulator {
  defaults: Defaults;
  price: number;
  saving = 0;
  saving10 = 0;
  biochar = 0;
  co2 = 0;

  constructor(defaults: Defaults) {
    this.defaults = defaults;
    this.price = defaults.price.initial;

    this.calculate();
  }

  setPrice(price: number) {
    this.price = price;
    this.calculate();
  }

  calculate() {
    const { pyrolsis, feedstock, sell, interest } = this.defaults;

    this.saving = (this.price - sell) * pyrolsis.energy * pyrolsis.hours;

    this.saving10 = Array(10)
      .fill(this.saving)
      .reduce((sum, v, i) => sum + compoundInterest(v, i, interest), 0);

    this.biochar =
      pyrolsis.throughtput * pyrolsis.hours * feedstock.biocharRatio;

    this.co2 =
      this.biochar *
      feedstock.co2Ratio *
      feedstock.carbonDegradeRatio *
      CO2_MASS;
  }
}
