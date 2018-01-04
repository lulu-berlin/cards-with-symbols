import {expect} from 'chai';

import {generateSymbols, generateFirstBlock} from './cards';

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

  it('should return a list of number starting with 1', () => {
    const result = generateSymbols(5);
    expect(result[0]).to.be.equal(1);
  });

  it('should return a list of numbers from 1 to number of symbols', () => {
    const result = generateSymbols(5);
    expect(result.every((x, i) => x === i + 1)).to.be.true;
  });

  it('should return a list of numbers from 1 to 7 for 3 places', () => {
    const result = generateSymbols(3);
    expect(result).to.eql([1, 2, 3, 4, 5, 6, 7]);
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
});
