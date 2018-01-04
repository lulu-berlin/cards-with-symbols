export const generateSymbols = (places: number) => Array.from(
  {length: places * places - places + 1},
  (_, i) => i + 1
);

export const generateFirstBlock = (places: number): number[][] => {
  const symbols = generateSymbols(places);
  const first = symbols[0];

  return Array.from(
    {length: places},
    (_, i) => {
      const size = places - 1;
      const index = i * size + 1;
      const rest =  symbols.slice(index, index + size);

      return [first, ...rest];
    }
  );
};
