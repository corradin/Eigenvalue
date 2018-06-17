exports.determinant = (matrix) => {
  let topRow = matrix[0];
  if (Number.isInteger(topRow)) {
    return topRow;
  }
  else if (Array.isArray(topRow)) {
    if (matrix.length > 1) {
      let result = [];
      for (let column = 0; column < topRow.length; column++) {
        var product = topRow[column] * this.determinant(this.findMatrixNotInRowOrColumnOf(0, column, matrix));
        if (column % 2) {
          result.push(-product);
        }
        else {
          result.push(product);
        }
      }
      return result.reduce((num1, num2) => num1 + num2);
    }
    return topRow[0];
  }
};

exports.findMatrixNotInRowOrColumnOf = (rowIndex, columnIndex, matrix) => {
  let subMatrix = null;
  if (matrix.length > 1) {
    subMatrix = [];
    for (let row = 0; row < matrix.length; row++) {
      let rowLength = matrix[row].length;
      for (let column = 0, columnsArray = []; column < rowLength; column++) {
        if (row != rowIndex && column != columnIndex) {
          columnsArray.push(matrix[row][column]);
        }
        if (column == rowLength - 1 && columnsArray.length > 0) {
          subMatrix.push(columnsArray);
        }
      }
    }
  }
  return subMatrix;
}