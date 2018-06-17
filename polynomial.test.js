var polynomial = require('./polynomial');

describe('Polynomial', () => {
    test('Should return empty real and imaginary part when input is zero', () => {
        expect(polynomial.getRoots([0])).toEqual([[],[]]);
    });

    test('Should return real number and zero as imaginary number for first degree ', () => {
        expect(polynomial.getRoots([1, 1])).toEqual([[-1],[0]]);
    });

    test('Should return real number and imaginary number for second degree ', () => {
        var result = polynomial.getRoots([6, -5, 1]);
        //floating point precision issues
        result[0][1] = Math.round([result[0][1]]);
        expect(result).toEqual([[3,2],[0,0]]);
    });
});