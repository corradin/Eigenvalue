var lapack = require('./lapack');

describe('Eigenvalue', () => {
    test('Should return the eigenvalue', () => {
        let matrix = [[0, 1], [-2, -3]];
        expect(lapack.eigenValue(matrix)).toEqual([-1,-2]);
    });

})