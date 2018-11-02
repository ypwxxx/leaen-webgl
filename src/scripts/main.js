"use strict";

//创建着色器方法, 参数: 渲染上下文, 着色器类型, 数据源
let createShader = function(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success){
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};

//创建着色器程序
let createProgram = function(gl, vertexShader, fragmentShader){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success){
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
};

function main(){

    //获取canvas标签
    // let canvas = document.getElementById("myCanvas");
    const glCanvas = document.querySelector('#glCanvas');
    // glCanvas.width = window.outerWidth;
    // glCanvas.height = window.outerHeight;

    const gl = glCanvas.getContext('webgl');
    if(!gl){
        console.log('Failed to retrieve the gl element');
        return;
    }

    let vertexShaderSource = document.getElementById("2d-vertex-shader").text;
    let fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    let positions = [
        0, 0,
        0, 0.5,
        0.7, 0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    //设置尺寸
    let resize = function(canvas){
        let realToCSSPixels = window.devicePixelRatio;

        let displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
        let displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

        if(canvas.width !== displayWidth ||
            canvas.height !== displayHeight){
            
                canvas.width = displayWidth;
                canvas.height = displayHeight;
        }
    };

    let drawScene = function(){
        resize(glCanvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);

        gl.enableVertexAttribArray(positionAttributeLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        let size = 2;
        let type = gl.FLOAT;
        let normalize = false;
        let stride = 0;
        let offset = 0;
        gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset
        );
        let primitiveType = gl.TRIANGLES;
        offset = 0;
        let count = 3;
        gl.drawArrays(primitiveType, offset, count);
    };

    drawScene();

    //绘制图像前,获取绘图的上下文
    // let ctx = canvas.getContext("2d");

    // ctx.fillStyle = "red";
    /**
        使用填充颜色填充矩形
        fillRect(x, y, width, height)
        x   左上角x坐标
        y   左上角y坐标
        width   宽度
        height  高度
     */
    // ctx.fillRect(120, 10, 200, 200);
};

// main();

window.onload = function(e) {
    let body = document.body;
    body.onload = main();
};
// let body = document.body;
// body.onload = main();

