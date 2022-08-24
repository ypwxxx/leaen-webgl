"use strict";
// Hello Points
// 顶点着色器程序
var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize; \n' +
    'void main() {\n' +
    ' gl_Position = a_Position; \n' +
    ' gl_PointSize = a_PointSize;\n' +
    '}\n';
// 片元着色器程序
var FSHADER_SOURCE = 'precision mediump float;\n' +
    'uniform vec4 u_PointColor;\n' +
    'void main() {\n' +
    ' gl_FragColor = u_PointColor;\n' +
    '}\n';
var g_points = []; // 存储已经获取到的点坐标
var g_colors = []; // 存储点的颜色
function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas, true);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }
    // 获取attribute变量存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    var u_PointColor = gl.getUniformLocation(gl.program, 'u_PointColor');
    if (a_Position < 0) {
        console.log('Failed to get the strorage location of a_Position');
    }
    if (canvas !== null) {
        var canDraw_1 = false;
        // 注册鼠标点击事件
        canvas.onmousedown = function (ev) {
            console.log('鼠标按下');
            canDraw_1 = true;
        };
        canvas.onmousemove = function (ev) {
            console.log('鼠标移动');
            if (!canDraw_1)
                return;
            drawing(ev, gl, canvas, a_Position, u_PointColor);
        };
        canvas.onmouseup = function (ev) {
            console.log('鼠标放开');
            canDraw_1 = false;
        };
        document.onkeydown = function (ev) {
            console.log("\u6309\u952E\u6309\u4E0B: code: " + ev.code + ", key: " + ev.key + ", keyCode: " + ev.keyCode);
            var code = ev.keyCode;
            if (code === 32) {
                console.log('清空屏幕');
                g_points = [];
                g_colors = [];
                gl.clear(gl.COLOR_BUFFER_BIT);
                canDraw_1 = false;
            }
        };
    }
    gl.vertexAttrib1f(a_PointSize, 5.0);
    gl.clearColor(0.78, 0.68, 0.53, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
;
function drawing(ev, gl, canvas, a_Position, u_PointColor) {
    if (canvas === null)
        return;
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    g_points.push({ x: x, y: y });
    var color = {
        r: Math.abs(x),
        g: Math.abs(y),
        b: Math.abs(x - y),
        a: Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))),
    };
    g_colors.push(color);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for (var i = 0; i < len; i++) {
        var pos = g_points[i];
        var rgba = g_colors[i];
        gl.vertexAttrib3f(a_Position, pos.x, pos.y, 0.0);
        gl.uniform4f(u_PointColor, rgba.r, rgba.g, rgba.b, rgba.a);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
;
