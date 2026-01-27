export const formatListPrice = (amount, currency) => {
  if (amount === null || amount === undefined) return null;
  if (currency) {
    try {
      return new Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (error) {
      return `${amount} ${currency}`;
    }
  }
  return String(amount);
};

export const formatDetailPrice = (amount, currency) => {
  if (amount == null) return "-";
  if (!currency) return String(amount);
  return `${amount} ${currency}`;
};
