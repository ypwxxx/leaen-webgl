"use strict";
// multi points
var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
    'attribute vec4 a_PointSize;\n' +
    'void main () {\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = a_PointSize;\n' +
    '}\n';
var FSHADER_SOURCE = 'precision mediump float;\n' +
    'uniform vec4 u_PointColor;\n' +
    'void main() {\n' +
    '   gl_FragColor = u_PointColor;\n' +
    '}\n';
function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas, true);
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to load shader');
        return;
    }
    if (!canvas) {
        console.log('Failed to load canvas');
        return;
    }
    if (!gl) {
        console.log('Failed to load gl');
    }
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set positions of vertices');
        return;
    }
    gl.clearColor(0.78, 0.68, 0.53, 1.0);
    gl.clear();
    gl.drawArrays(gl.POINTS, 0, n);
}
;
function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3;
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create buffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}
;
