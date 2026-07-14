import validator from "validator";

// this req is coming from /signup
const validateSignupData = (req) => {
  const { name, email, password, gender } = req.body;

  // Name validation
  if (!name) {
    throw new Error("Name is not valid!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

  if (gender && !["male", "female"].includes(gender)) {
    throw new Error("Gender is not valid");
  }

  return true;
};

export { validateSignupData };
