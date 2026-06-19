export const PRICING = {
  basic: 75000,
  premium: 99000,
};

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID").format(n);
