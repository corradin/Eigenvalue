
var emlapack = require('emlapack');

exports.eig = (matrix) => {
    //See: http://www.netlib.org/lapack/explore-html/d3/dfb/group__real_g_eeigen_ga104525b749278774f7b7f57195aa6798.html#ga104525b749278774f7b7f57195aa6798
    var inputFormatErrorMessage = 'Input needs to be in a matrix form, for example: [ [ 3 ] ] or [ [3, 1], [1, 3] ]';
    if (!Array.isArray(matrix)) {
        throw new Error(inputFormatErrorMessage);
    }
    else {
        matrix.forEach(row => {
            if (!Array.isArray(row)) {
                throw new Error(inputFormatErrorMessage);
            }
        });
    }

    var n = matrix.length,
        dgeev = emlapack.cwrap('dgeev_', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']),
        pjobvl = emlapack._malloc(1),
        pjobvr = emlapack._malloc(1),
        pn = emlapack._malloc(4),
        pa = emlapack._malloc(n * n * 8),
        plda = emlapack._malloc(4),
        pwr = emlapack._malloc(n * 8),
        pwi = emlapack._malloc(n * 8),
        pvl = emlapack._malloc(n * n * 8),
        pldvl = emlapack._malloc(4),
        pvr = emlapack._malloc(n * n * 8),
        pldvr = emlapack._malloc(4),
        pworkopt = emlapack._malloc(n * n * 8),
        plwork = emlapack._malloc(4),
        pinfo = emlapack._malloc(4);

    //Calculate both left and right eigenvectors
    emlapack.setValue(pjobvl, 'V'.charCodeAt(0), 'i8');
    emlapack.setValue(pjobvr, 'V'.charCodeAt(0), 'i8');
    emlapack.setValue(pn, n, 'i32');
    emlapack.setValue(plda, n, 'i32');
    emlapack.setValue(pldvl, n, 'i32');
    emlapack.setValue(pldvr, n, 'i32');
    emlapack.setValue(plwork, -1, 'i32');

    var a = new Float64Array(emlapack.HEAPF64.buffer, pa, n * n);
    var w = new Float64Array(emlapack.HEAPF64.buffer, pwr, n);
    var i = new Float64Array(emlapack.HEAPF64.buffer, pwi, n);
    var rightEigenvectors = new Float64Array(emlapack.HEAPF64.buffer, pvr, n * n);
    var leftEigenvectors = new Float64Array(emlapack.HEAPF64.buffer, pvl, n * n);
    var flattenedMatrix = [];
    matrix.forEach(row => {
        row.forEach(element => {
            flattenedMatrix.push(element);
        });
    });
    a.set(flattenedMatrix);

    //Somehow pvl and pvr are switched in the Lapack implementation (bug?) 
    dgeev(pjobvl, pjobvr, pn, pa, plda, pwr, pwi, pvr, pldvl, pvl, pldvr, pworkopt, plwork, pinfo);

    var workopt = emlapack.getValue(pworkopt, 'double'),
        pwork = emlapack._malloc(workopt * 8);
    emlapack.setValue(plwork, workopt, 'i32');

    dgeev(pjobvl, pjobvr, pn, pa, plda, pwr, pwi, pvr, pldvl, pvl, pldvr, pwork, plwork, pinfo);
    return {
        eigenvalues: {
            real: w,
            imaginary: i
        },
        eigenvectors: {
            right: rightEigenvectors,
            left: leftEigenvectors
        }
    };
};