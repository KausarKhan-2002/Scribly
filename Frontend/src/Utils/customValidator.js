export const isValidPassword = (password) => {
  const hasAlphabet = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isLongEnough = password.length >= 6;

  return hasAlphabet && hasNumber && isLongEnough;
};