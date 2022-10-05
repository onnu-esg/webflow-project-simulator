import { Defaults, Feedstock } from "./types";
import { App } from "./App";

const feedstocks: Feedstock[] = [
  {
    name: "Miscanthus",
    energy: 17,
    biocharYield: 0.27,
    carbonContent: 0.79,
    carbonDecay: 0.8,
  },
  {
    name: "Poultry litter",
    energy: 14,
    biocharYield: 0.45,
    carbonContent: 0.33,
    carbonDecay: 0.89,
  },
  {
    name: "Wheat straw",
    energy: 15.6,
    biocharYield: 0.28,
    carbonContent: 0.65,
    carbonDecay: 0.89,
  },
  {
    name: "Wood",
    energy: 20,
    biocharYield: 0.275,
    carbonContent: 0.825,
    carbonDecay: 0.8,
  },
  {
    name: "Hemp",
    energy: 17.6,
    biocharYield: 0.33,
    carbonContent: 0.77,
    carbonDecay: 0.8,
  },
];

const defaults: Defaults = {
  sell: 0.1,
  inflation: 0.05,
  emissionFactor: 0.3,
  price: {
    initial: 0.3,
    min: 0.1,
    max: 1,
    step: 0.01,
  },
  energy: {
    initial: 1500,
    min: 500,
    max: 15000,
    step: 100,
  },
  pyrolsis: {
    hours: 7500,
    throughtput: 500,
  },
  feedstocks,
};

$(() => new App(defaults));
