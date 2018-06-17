var f = require('./index');

describe('Determinant', () => {
    test('Should return single number when input is single number matrix', () => {
        expect(f.determinant([1])).toBe(1);
        expect(f.determinant([2])).toBe(2);
    });

    test('should return the determinant of a 2x2 matrix', () => {
        expect(f.determinant([[4,6],[3,8]])).toBe(14);
    });

    test('should return the determinant of a 3x3 matrix', () => {
        expect(f.determinant([[6,1,1],[4,-2,5],[2,8,7]])).toBe(-306);
    });
});

describe('Find matrix not in row or column of tests', () => {
    test('should return null when matrix length <= 1 ', () => {
        expect(f.findMatrixNotInRowOrColumnOf(0,0,[1])).toBe(null);
    });

    //TODO: Split up in 1, 2, many
    test('should return submatrix when length > 1 ', () => {
        expect(f.findMatrixNotInRowOrColumnOf(0,0,[[6,1],[4,-2]])).toEqual([[-2]]);
        expect(f.findMatrixNotInRowOrColumnOf(0,0,[[6,1,1],[4,-2,5],[2,8,7]])).toEqual([[-2,5],[8,7]]);
        expect(f.findMatrixNotInRowOrColumnOf(0,0,[[6,1,1],[4,-2,5],[2,8,7]])).toEqual([[-2,5],[8,7]]);
        expect(f.findMatrixNotInRowOrColumnOf(1,1,[[6,1,1],[4,-2,5],[2,8,7]])).toEqual([[6,1],[2,7]]);
        expect(f.findMatrixNotInRowOrColumnOf(1,1,[[6,1,1,4],[8,4,-2,5],[-6,2,8,7],[6,2,-3,-6]])).toEqual([[6,1,4],[-6,8,7],[6,-3,-6]]);
    });
});