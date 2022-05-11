export const validateUsername = (value: string) => {
  let error;
  if (!value) {
    error = "Required!";
  }
  if (value === "admin") {
    error = "Nice try!";
  }
  return error;
};

export const validatePassword = (value: string) => {
  let error;
  if (!value) {
    error = "Required!";
  }
  if (value === "password") {
    error = "Nice try!";
  }
  return error;
};
