var emlapack = require('emlapack');

exports.eigenValue = (matrix) => {
    //See: http://www.netlib.org/lapack/explore-html/d3/dfb/group__real_g_eeigen_ga104525b749278774f7b7f57195aa6798.html#ga104525b749278774f7b7f57195aa6798
    if (matrix.length === 1) {
        return {
            real: matrix[0]
        }
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

    emlapack.setValue(pjobvl, 'V'.charCodeAt(0), 'i8');
    emlapack.setValue(pjobvr, 'N'.charCodeAt(0), 'i8');
    emlapack.setValue(pn, n, 'i32');
    emlapack.setValue(plda, n, 'i32');
    emlapack.setValue(pldvl, n, 'i32');
    emlapack.setValue(pldvr, n, 'i32');
    emlapack.setValue(plwork, -1, 'i32');

    var a = new Float64Array(emlapack.HEAPF64.buffer, pa, n * n);
    var w = new Float64Array(emlapack.HEAPF64.buffer, pwr, n);
    var i = new Float64Array(emlapack.HEAPF64.buffer, pwi, n);
    // a.set([0.35, 0.45, -0.14, -0.17, 0.09, 0.07, -0.54, 0.35, -0.44, -0.33, -0.03, 0.17, 0.25, -0.32, -0.13, 0.11]);
    var flattenedMatrix = [];
    matrix.forEach(row => {
        row.forEach(element => {
            flattenedMatrix.push(element);
        })
    });
    a.set(flattenedMatrix);

    dgeev(pjobvl, pjobvr, pn, pa, plda, pwr, pwi, pvl, pldvl, pvr, pldvr, pworkopt, plwork, pinfo);
    // sgeev

    var workopt = emlapack.getValue(pworkopt, 'double'),
        pwork = emlapack._malloc(workopt * 8);
    emlapack.setValue(plwork, workopt, 'i32');

    dgeev(pjobvl, pjobvr, pn, pa, plda, pwr, pwi, pvl, pldvl, pvr, pldvr, pwork, plwork, pinfo);
    console.log(w);
    console.log(i);
    return {
        real: w,
        imaginary: i
    }
};

/*
let n = 2,
        dsyev = emlapack.cwrap('dsyev_', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']),
        sgeev = emlapack.cwrap('sgeev_', null, ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']),
        pjobz = emlapack._malloc(1),
        puplo = emlapack._malloc(1),
        pn = emlapack._malloc(4),
        pa = emlapack._malloc(n * n * 8),
        plda = emlapack._malloc(4),
        pw = emlapack._malloc(n * 8),
        plwork = emlapack._malloc(4),
        pinfo = emlapack._malloc(4),
        pworkopt = emlapack._malloc(4);

    emlapack.setValue(pjobz, 'V'.charCodeAt(0), 'i8');
    emlapack.setValue(puplo, 'U'.charCodeAt(0), 'i8');
    emlapack.setValue(pn, n, 'i32');
    emlapack.setValue(plda, n, 'i32');
    emlapack.setValue(plwork, -1, 'i32');

    var a = new Float64Array(emlapack.HEAPF64.buffer, pa, n * n);
    var w = new Float64Array(emlapack.HEAPF64.buffer, pw, n);
    a.set([0, 1, -2, -3]);

    dsyev(pjobz, puplo, pn, pa, plda, pw, pworkopt, plwork, pinfo);
    // sgeev

    var workopt = emlapack.getValue(pworkopt, 'double'),
        pwork = emlapack._malloc(workopt * 8);
    emlapack.setValue(plwork, workopt, 'i32');

    dsyev(pjobz, puplo, pn, pa, plda, pw, pwork, plwork, pinfo);

    return w;
*/
