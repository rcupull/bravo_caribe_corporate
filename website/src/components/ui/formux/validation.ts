export const getIsValidPhone = (phone: string): boolean => {
  if (!phone) {
    /**
     * thsi function not valids required value. so we return true
     */
    return true;
  }

  /**
   * Only cuban phone for now
   */
  return (
    (phone.startsWith("536") || phone.startsWith("535")) && phone.length === 10
  );
};

export const getIsValidNumber = (number: string): boolean => {
  const value = Number(number);
  return !isNaN(value);
};

export const getIsValidPositiveNumber = (number: string): boolean => {
  const isValidNumber = getIsValidNumber(number);
  return isValidNumber && Number(number) >= 0;
};
