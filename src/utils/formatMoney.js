const formatMoney = (amount, currency = "USD") => {
  const options = {
    style: "currency",
    currency,
    minimumFractionDigits: 2
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat("en-US", options);
  return formatter.format(amount);
};

export default formatMoney;
