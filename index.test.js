var lapack = require('./index');

var complexMatrix = [
    [0.35, 0.45, -0.14, -0.17],
    [0.09, 0.07, -0.54, 0.35],
    [-0.44, -0.33, -0.03, 0.17],
    [0.25, -0.32, -0.13, 0.11]
];

// These tests assertions have been created using Matlab's eig function: https://www.mathworks.com/help/matlab/ref/eig.html 
describe('Eigenvalues', () => {
    test('should throw an error if the input is not an array', function () {
        //Arrange 
        var input = 1;
        //Act 
        var eigFunction = lapack.eig;
        //Assert
        expect(function () {
            eigFunction(input);
        }).toThrow(new Error("Input needs to be in a matrix form, for example: [ [ 3 ] ] or [ [3, 1], [1, 3] ]"));
    });
    test('should throw an error if the input is not a matrix', function () {
        //Arrange 
        var input = [1];
        //Act 
        var eigFunction = lapack.eig;
        //Assert
        expect(function () {
            eigFunction(input);
        }).toThrow(new Error("Input needs to be in a matrix form, for example: [ [ 3 ] ] or [ [3, 1], [1, 3] ]"));
    });
    test('should return the eigenvalues of a 1 order square matrix', () => {
        //Arrange
        var matrix = [[3]];
        var expectedReal = new Float64Array(1);
        var expectedImaginary = new Float64Array(1);
        expectedReal.set([3]);
        expectedImaginary.set([0]);
        //Act
        var eigenvalues = lapack.eig(matrix).eigenvalues;
        //Assert
        expect(eigenvalues.real).toEqual(expectedReal);
        expect(eigenvalues.imaginary).toEqual(expectedImaginary);
    });
    test('Should return the eigenvalues of a simple matrix', () => {
        //Arrange
        var matrix = [[0, 1], [-2, -3]];
        var expectedReal = new Float64Array(2);
        var expectedImaginary = new Float64Array(2);
        expectedReal.set([-1, -2]);
        expectedImaginary.set([0, 0]);
        //Act
        var eigenvalues = lapack.eig(matrix).eigenvalues;
        //Assert
        expect(eigenvalues.real).toEqual(expectedReal);
        expect(eigenvalues.imaginary).toEqual(expectedImaginary);
    });
    test('should return the eigenvalues of a more complex matrix', () => {
        //Arrange
        var matrix = complexMatrix;
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
        var eigenvalues = lapack.eig(matrix).eigenvalues;
        //Assert
        expect(eigenvalues.real).toEqual(expectedReal);
        expect(eigenvalues.imaginary).toEqual(expectedImaginary);
    });
});

describe('Eigenvectors', () => {
    test('should return the eigenvectors of a simple matrix', () => {
        //Arrange
        var matrix = [[3]];
        var expected = new Float64Array(1);
        expected.set([1]);
        //Act
        var rightEigenvectors = lapack.eig(matrix).eigenvectors.right;
        var leftEigenvectors = lapack.eig(matrix).eigenvectors.left;
        //Assert
        expect(rightEigenvectors).toEqual(expected);
        expect(leftEigenvectors).toEqual(expected);
    });

    test('should return the eigenvectors of a 1 order square matrix', () => {
        //Arrange
        var matrix = [[0, 1], [-2, -3]];
        var expectedRightEigenvectors = new Float64Array(4);
        var expectedleftEigenvectors = new Float64Array(4);
        expectedRightEigenvectors.set([0.7071, -0.7071, -0.4472, 0.8944]);
        expectedleftEigenvectors.set([0.8944, 0.4472, 0.7071, 0.7071]);
        //Act
        var rightEigenvectors = lapack.eig(matrix).eigenvectors.right.map((rightEigenvector) => {
            return parseFloat(rightEigenvector.toFixed(4));
        });
        var leftEigenvectors = lapack.eig(matrix).eigenvectors.left.map((leftEigenvector) => {
            return parseFloat(leftEigenvector).toFixed(4);
        });
        //Assert
        expect(rightEigenvectors).toEqual(expectedRightEigenvectors);
        expect(leftEigenvectors).toEqual(expectedleftEigenvectors);
    });

    test('should return the real (normalized and largest number is real) eigenvectors of a more complex matrix', () => {
        //Arrange
        var matrix = complexMatrix;
        var expectedRightEigenvectors = new Float64Array(16);
        var expectedleftEigenvectors = new Float64Array(16);
        expectedRightEigenvectors.set([-0.6551, -0.5236, 0.5362, -0.0956, -0.1933, 0.2519, 0.0972, 0.6760, -0.2546, 0.5224, 0.3084, 0, 0.1253, 0.3320, 0.5938, 0.7221]);
        expectedleftEigenvectors.set([-0.6245, -0.5995, 0.4999, -0.0271, 0.5330, -0.2666, 0.3455, -0.2541, 0, -0.4041, -0.3153, 0.4451, 0.6641, -0.1068, 0.7293, 0.1249]);
        //Act
        var rightEigenvectors = lapack.eig(matrix).eigenvectors.right.map((rightEigenvector) => {
            return parseFloat(rightEigenvector.toFixed(4));
        });
        var leftEigenvectors = lapack.eig(matrix).eigenvectors.left.map((leftEigenvector) => {
            return parseFloat(leftEigenvector).toFixed(4);
        });
        //Assert
        expect(rightEigenvectors).toEqual(expectedRightEigenvectors);
        expect(leftEigenvectors).toEqual(expectedleftEigenvectors);
    });
});