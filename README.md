
Eigenvalue

Notice that the left and right eigenvectors are normalize meaning that the largest components are made real.
This is done using the Lapack dgeev method.

To use the package:

var lapack = require('eigenvalue');

var matrix = [[0, 1][-2, -3]]
var result = lapack.eig(matrix);
console.log(result.eigenvalues.real);

console.log(result.eigenvalues.imaginary);

console.log(result.eigenvectors.left);

console.log(result.eigenvectors.right);