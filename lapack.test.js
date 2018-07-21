var lapack = require('./lapack');

describe('Eigenvalue', () => {
    test('should return the eigenvalue of a 1 order square matrix', () => {
        //Arrange
        var matrix = [3];
        //Act
        var eigenValueReal = lapack.eigenValue(matrix).real;
        //Assert
        expect(eigenValueReal).toEqual(3);
    });
    test('Should return the eigenvalues of a simple matrix', () => {
        //Arrange
        var matrix = [[0, 1], [-2, -3]];
        var expected = new Float64Array(2);
        expected.set([-1, -2]); 
        //Act
        var eigenValueReal = lapack.eigenValue(matrix).real;
        //Assert
        expect(eigenValueReal).toEqual(expected);
    });

    test('should return the eigenvalues of a more complex matrix', () => {
        //Arrange
        var matrix = [
            [0.35, 0.45, -0.14, -0.17], 
            [0.09, 0.07, -0.54, 0.35], 
            [-0.44, -0.33, -0.03, 0.17], 
            [0.25, -0.32, -0.13, 0.11]
        ];
        var expectedReal = new Float64Array(4);
        expectedReal.set([
            0.7994821225862078,
            -0.09941245329507456,
            -0.09941245329507456,
            -0.10065721599605863
        ]); 
        var expectedImaginary = new Float64Array(4);
        expectedImaginary.set([
            0, 
            0.40079247198975504, 
            -0.40079247198975504, 
            0
        ]); 
        //Act
        var eigenValue = lapack.eigenValue(matrix);
        //Assert
        expect(eigenValue.real).toEqual(expectedReal);
        expect(eigenValue.imaginary).toEqual(expectedImaginary);
    });
});