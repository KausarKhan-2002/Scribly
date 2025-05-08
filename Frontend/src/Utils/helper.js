import moment from "moment";

export const addThousandsSeprator = (num) => {
  if (num == null || isNaN(num)) return "";
  // console.log(num);
  const [integerPart, fractionalPart] = num.toString().split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3}) + (?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};


export const getGreeting = () => {
    const currentHour = moment().hour();
  
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning!';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon!';
    } else if (currentHour >= 17 && currentHour < 21) {
      return 'Good Evening!';
    } else {
      return 'Good Night!';
    }
  }