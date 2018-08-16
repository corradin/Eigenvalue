# Eigenvalue
JavaScript Wrapper for eigenvalues and eigenvectors using LAPACK.

The left and right eigenvectors are normalize meaning that the largest components are made real.
This is done using the Lapack dgeev method.

## Install

```
npm install matrix-eig
```

## Example

```javascript
var matrixEig = require('matrix-eig');

var matrix = [[0, 1],[-2, -3]]
var result = matrixEig.eig(matrix);

console.log(result.eigenvalues.real);
// Float64Array [ -1, -2 ]

console.log(result.eigenvalues.imaginary);
// Float64Array [ 0, 0 ]

console.log(result.eigenvectors.left);
//  Float64Array [
//       0.8944271909999159,
//       0.4472135954999579,
//       0.7071067811865475,
//       0.7071067811865475 ]

console.log(result.eigenvectors.right);
// Float64Array [
//       0.7071067811865475,
//       -0.7071067811865475,
//       -0.4472135954999579,
//       0.8944271909999159 ]
```

## References

For more detail, see:

* http://www.netlib.org/lapack/
* http://matlab.izmiran.ru/help/techdoc/ref/eig.html

## License

&copy; 2018 Riccardo Corradin, ISC.