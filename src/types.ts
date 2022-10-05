export type Defaults = {
  sell: number;
  inflation: number;
  emissionFactor: number;
  price: {
    initial: number;
    min: number;
    max: number;
    step: number;
  };
  energy: {
    initial: number;
    min: number;
    max: number;
    step: number;
  };
  pyrolsis: {
    hours: number;
    throughtput: number;
  };
  feedstocks: Feedstock[];
};

export type Feedstock = {
  name: string;
  energy: number;
  biocharYield: number; // Ratio of feedstock to biochar
  carbonContent: number; // Ratio of biochar carbon to CO2
  carbonDecay: number; // Ratio of carbon remaining after 100 years
};
