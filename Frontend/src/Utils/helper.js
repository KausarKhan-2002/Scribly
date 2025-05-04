export const addThousandsSeprator = (num) => {
  if (num == null || isNaN(num)) return "";
  // console.log(num);
  const [integerPart, fractionalPart] = num.toString().split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3}) + (?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};
