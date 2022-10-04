export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    notation: "compact",
    minimumFractionDigits: 2,
  }).format(n);

export const mass = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "unit",
    unit: "kilogram",
    maximumFractionDigits: 0,
  })
    .format(n / 1000)
    .replace("kg", "tons");

export const compoundInterest = (
  principal: number,
  time: number,
  rate: number
) => {
  return principal * Math.pow(1 + rate, time);
};
