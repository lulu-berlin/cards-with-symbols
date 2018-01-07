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

export const generateCards = (places: number): number[][] => {
  const symbols = generateSymbols(places);
  const firstBlock = generateFirstBlock(places);

  return Array.prototype.concat.apply(
    firstBlock,
    Array.from(
      {length: places - 1},
      (_, s) => Array.from(
        {length: places - 1},
        (_, x) => [
          symbols[s + 1],
          ...Array.from(
            {length: places - 1},
            (_, y) => firstBlock[y + 1][(y * s + x) % (places - 1) + 1]
          )
        ]
      )
    )
  );
};
