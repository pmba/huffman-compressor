export const numberToBinString = (value: number, pad: number = 0): string => {
  return (value >>> 0).toString(2).padStart(pad, "0");
};
