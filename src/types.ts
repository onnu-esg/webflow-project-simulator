export type Defaults = {
  sell: number;
  interest: number;
  price: {
    initial: number;
    min: number;
    max: number;
    step: number;
  };
  pyrolsis: {
    hours: number;
    energy: number;
    throughtput: number;
  };
  feedstock: {
    energy: number;
    biocharRatio: number; // Ratio of feedstock to biochar
    co2Ratio: number; // Ratio of biochar carbon to CO2
    carbonDegradeRatio: number; // Ratio of carbon remaining after 100 years
  };
};
