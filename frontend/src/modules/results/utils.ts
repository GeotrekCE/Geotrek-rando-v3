export const formatDistance = (distance: number): string => {
  if (distance >= 1000) {
    return `${roundWithDecimals(distance / 1000)}km`;
  }
  return `${Math.round(distance)}m`;
};

const roundWithDecimals = (number: number, decimals = 1) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(number);
};
