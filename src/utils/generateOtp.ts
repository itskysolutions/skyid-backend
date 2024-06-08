export const generateOtp = () => {
  try {
    return `${Math.floor(100000 + Math.random() * 900000)}`;
  } catch (ex) {
    throw ex;
  }
};
