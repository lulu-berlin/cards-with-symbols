import {expect} from 'chai';
import jsc = require('jsverify');

import {
  generateSymbols,
  generateFirstBlock,
  generateCards
} from './cards';

describe('generateSymbols()', () => {
  it('should return 1 symbols for 1 place', () => {
    const result = generateSymbols(1);
    expect(result).to.have.lengthOf(1);
  });

  it('should return 3 symbols for 2 places', () => {
    const result = generateSymbols(2);
    expect(result).to.have.lengthOf(3);
  });

  it('should return 13 symbols for 4 places', () => {
    const result = generateSymbols(4);
    expect(result).to.have.lengthOf(13);
  });

  it('should return a list of numbers from 1 to 7 for 3 places', () => {
    const result = generateSymbols(3);
    expect(result).to.eql([1, 2, 3, 4, 5, 6, 7]);
  });

  jsc.property('generateSymbols(n)[0] === 1', jsc.integer(1, 50), n => generateSymbols(n)[0] === 1);

  jsc.property('generateSymbols(n).length === n^2 - n + 1', jsc.integer(1, 50), n => {
    return generateSymbols(n).length === Math.pow(n, 2) - n + 1;
  });

  jsc.property('every element is index + 1', jsc.integer(1, 50), n => {
    return generateSymbols(n).every((x, i) => x === i + 1);
  });
});

describe('generateFirstBlock()', () => {
  it('should return the first block with 3 places', () => {
    const result = generateFirstBlock(3);
    expect(result).to.eql([
      [1, 2, 3],
      [1, 4, 5],
      [1, 6, 7]
    ]);
  });

  it('should return the first block with 4 places', () => {
    const result = generateFirstBlock(4);
    expect(result).to.eql([
      [1, 2, 3, 4],
      [1, 5, 6, 7],
      [1, 8, 9, 10],
      [1, 11, 12, 13]
    ]);
  });

  jsc.property(
    'generateFirstBlock(n).length === n',
    jsc.integer(1, 50),
    n => generateFirstBlock(n).length === n
  );

  jsc.property(
    'every subarray in generateFirstBlock(n) has length n',
    jsc.integer(1, 50),
    n => generateFirstBlock(n).every(a => a.length === n)
  );

  jsc.property(
    'every subarray in generateFirstBlock(n) starts with 1',
    jsc.integer(1, 50),
    n => generateFirstBlock(n).every(a => a[0] === 1)
  );

  jsc.property(
    'every subarray in generateFirstBlock(n) has numbers greater than 1 in its other elements',
    jsc.integer(1, 50),
    n => generateFirstBlock(n).every(a => a.slice(1).every(e => e > 1))
  );

  jsc.property(
    'the numbers apart from 1 appear only once each',
    jsc.integer(1, 50),
    n => {
      const numbersApartFromOne = Array.prototype.concat.apply(
        [],
        generateFirstBlock(n).map(a => a.slice(1))
      );

      return numbersApartFromOne.length === (new Set(numbersApartFromOne)).size;
    }
  );

  jsc.property(
    'all numbers are identical to all the symbols',
    jsc.integer(1, 50),
    n => {
      const allNumbers: number[] = Array.prototype.concat.apply(
        [],
        generateFirstBlock(n)
      );

      const symbols = generateSymbols(n);

      return Array.from(new Set(allNumbers)).every((x, i) => x === symbols[i]);
    }
  );
});

describe('generateCards()', () => {
  it('should generate all cards with 3 places', () => {
    const result = generateCards(3);
    expect(result).to.include.deep.members([
      [1, 2, 3],
      [1, 4, 5],
      [1, 6, 7],
      [2, 4, 6],
      [2, 5, 7],
      [3, 4, 7],
      [3, 5, 6]
    ]);
  });

  it('should generate all cards with 4 places', () => {
    const result = generateCards(4);
    expect(result).to.include.deep.members([
      [1, 2, 3, 4],
      [1, 5, 6, 7],
      [1, 8, 9, 10],
      [1, 11, 12, 13],
      [2, 5, 8, 11],
      [2, 6, 9, 12],
      [2, 7, 10, 13],
      [3, 5, 9, 13],
      [3, 6, 10, 11],
      [3, 7, 8, 12],
      [4, 5, 10, 12],
      [4, 6, 8, 13],
      [4, 7, 9, 11]
    ]);
  });

  /*
  jsc.property(
    'every pair of cards has one and only one symbol in common',
    jsc.integer(1, 30),
    n => {
      const cards = generateCards(n);

      return cards.every(
        (card1, i) => cards.every(
          (card2, j) => {
            const result = i === j || (new Set([...card1, ...card2])).size === 2 * n - 1;

            if (result) {
              return true;
            }

            console.log(`n = ${n}`);
            console.log(`card1 = ${JSON.stringify(card1)}`);
            console.log(`card2 = ${JSON.stringify(card2)}`);
            console.log(`common symbols = ${2 * n - (new Set([...card1, ...card2])).size}`);
            console.log('\n');

            return false;

          }
        )
      );
    }
  )
  */
});
