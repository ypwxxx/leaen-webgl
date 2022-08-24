// HelloWebgl.js

//顶点着色器
let VSHADER_SOURCE:String = 
    `attribute vec4 a_Position;\n` +
    `attribute float a_PointSize;\n` +
    `void main() {\n` +
    `   gl_Position = a_Position;\n` +
    `   gl_PointSize = a_PointSize;\n` +
    `}\n`;

//片元着色器
let FSHADER_SOURCE:String =
    `precision mediump float; \n` +
    `uniform vec4 u_FragColor;\n` +
    `void main() {\n` +
    `   gl_FragColor = u_FragColor;\n` +
    `}\n`;

function myMain(){
    //get canvas element
    let canvas = document.getElementById('webgl');

    //get WebGL context
    let gl = getWebGLContext(canvas, false);
    if(!gl){
        console.log('Failed to get the rnedering for WebGL');
        return;
    }

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Failed to initialize shader.');
        return;
    }

    // 获取变量的地址
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if(a_Position < 0){
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    //注册鼠标点击事件
    let mouseHasDown = false;
    let g_points = [];
    let click = function(ev, gl, canvas, a_Position, u_FragColor){
        if(!mouseHasDown) return;
        let x = ev.clientX;
        let y = ev.clientY;
        let rect = ev.target.getBoundingClientRect();
        x = ((x - rect.left) - canvas.width/2) / (canvas.width / 2);
        y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

        g_points.push([x, y]);

        gl.clear(gl.COLOR_BUFFER_BIT);

        let len = g_points.length;
        for(let i = 0; i < len; i+=2){
            gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0);
            gl.uniform4f(u_FragColor, g_points[i][0], g_points[i][1], Math.abs(g_points[i][0] - g_points[i][1]), 1.0);

            gl.drawArrays(gl.POINTS, 0, 1);
        }
    };
    canvas.onmousedown = function(ev) { mouseHasDown = true;};
    canvas.onmousemove = function(ev) {click(ev, gl, canvas, a_Position, u_FragColor);};
    canvas.onmouseup = function(ev) {mouseHasDown = false;gl.clear(gl.COLOR_BUFFER_BIT);g_points = [];};

    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 5.0);

    //clear canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(gl.POINTS, 0, 1);
}