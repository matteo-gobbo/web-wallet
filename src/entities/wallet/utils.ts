export const validateSellAmount = (value: number, actualAmount: number) => {
  let error;
  if (value < 0) {
    error = "Not allowed!";
  }
  if (value > actualAmount) {
    error = "Insufficient balance";
  }
  return error;
};

export const validateBuyAmount = (value: number, actualAmount: number) => {
  let error;
  if (value < 0) {
    error = "Not allowed!";
  }
  return error;
};
