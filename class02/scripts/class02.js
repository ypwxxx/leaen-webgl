"use strict";
// HelloWebgl.js
//顶点着色器
var VSHADER_SOURCE = "attribute vec4 a_Position;\n" +
    "attribute float a_PointSize;\n" +
    "void main() {\n" +
    "   gl_Position = a_Position;\n" +
    "   gl_PointSize = a_PointSize;\n" +
    "}\n";
//片元着色器
var FSHADER_SOURCE = "precision mediump float; \n" +
    "uniform vec4 u_FragColor;\n" +
    "void main() {\n" +
    "   gl_FragColor = u_FragColor;\n" +
    "}\n";
function myMain() {
    //get canvas element
    var canvas = document.getElementById('webgl');
    //get WebGL context
    var gl = getWebGLContext(canvas, false);
    if (!gl) {
        console.log('Failed to get the rnedering for WebGL');
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shader.');
        return;
    }
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set positions of the vertices');
        return;
    }
    //clear canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 1, 2);
}
function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3;
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.vertexAttrib1f(a_PointSize, 5.0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}
